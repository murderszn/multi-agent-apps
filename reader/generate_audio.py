"""Build public Grok narration assets from book.json using a private Actions secret.

Only run this in a trusted environment. The API key never enters generated files.
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
import time
import unicodedata
from difflib import SequenceMatcher
from pathlib import Path

HERE = Path(__file__).resolve().parent
BOOK = HERE / "book.json"
OUT = HERE / "audio"
API = "https://gen.pollinations.ai/v1/audio"
MODEL = "x-ai/grok-tts"
VOICE = "eve"
MAX_WORDS = 220
MIN_WORDS = 145


def normalize(text: str) -> str:
    text = unicodedata.normalize("NFKC", text).casefold().replace("’", "'")
    return "".join(character for character in text if character.isalnum())


def split_words(words: list[list]) -> list[tuple[int, int]]:
    result = []
    start = 0
    while start < len(words):
        end = min(start + MAX_WORDS, len(words))
        for candidate in range(end - 1, start + MIN_WORDS - 1, -1):
            if len(words[candidate]) > 1 and words[candidate][1] == 1:
                end = candidate + 1
                break
        result.append((start, end))
        start = end
    return result


def mp3_duration(content: bytes) -> float:
    from mutagen.mp3 import MP3

    return float(MP3(io.BytesIO(content)).info.length)


def align_times(source: list[str], recognized: list[dict], duration: float) -> tuple[list[float], float]:
    source_tokens = [normalize(word) for word in source]
    heard_tokens = [normalize(str(word.get("word", ""))) for word in recognized]
    matches = SequenceMatcher(None, source_tokens, heard_tokens, autojunk=False).get_matching_blocks()
    times: list[float | None] = [None] * len(source)
    for block in matches:
        for offset in range(block.size):
            start = recognized[block.b + offset].get("start")
            if isinstance(start, (int, float)):
                times[block.a + offset] = max(0.0, min(float(start), duration))
    confidence = sum(time is not None for time in times) / max(1, len(times))
    anchors = [(-1, 0.0)] + [(i, time) for i, time in enumerate(times) if time is not None] + [(len(times), duration)]
    for (left_index, left_time), (right_index, right_time) in zip(anchors, anchors[1:]):
        for i in range(left_index + 1, right_index):
            times[i] = left_time + (right_time - left_time) * (i - left_index) / (right_index - left_index)
    if times:
        times[0] = 0.0
    return [round(float(time), 3) for time in times], confidence


def synthesize(session: requests.Session, key: str, text: str) -> bytes:
    response = post_with_retries(session,
        API + "/speech",
        headers={"Authorization": f"Bearer {key}"},
        json={"model": MODEL, "input": text, "voice": VOICE, "response_format": "mp3"},
        timeout=180,
    )
    response.raise_for_status()
    if not response.headers.get("Content-Type", "").startswith("audio/") or len(response.content) < 1000:
        raise ValueError("Pollinations did not return usable audio")
    return response.content


def transcribe(session: requests.Session, key: str, content: bytes) -> list[dict]:
    response = post_with_retries(session,
        API + "/transcriptions",
        headers={"Authorization": f"Bearer {key}"},
        files={"file": ("narration.mp3", io.BytesIO(content), "audio/mpeg")},
        data={"model": "x-ai/grok-transcribe", "response_format": "verbose_json", "language": "en"},
        timeout=180,
    )
    response.raise_for_status()
    words = response.json().get("words")
    if not isinstance(words, list) or not words:
        raise ValueError("Pollinations did not return word timestamps")
    return words


def post_with_retries(session: requests.Session, url: str, **kwargs):
    import requests

    for attempt in range(4):
        for file_item in kwargs.get("files", {}).values():
            file_item[1].seek(0)
        try:
            response = session.post(url, **kwargs)
            if response.status_code not in {429, 500, 502, 503, 504} or attempt == 3:
                return response
        except requests.RequestException:
            if attempt == 3:
                raise
        time.sleep(2 ** attempt)
    raise RuntimeError("Pollinations request did not complete")


def generate_chapter(session: requests.Session, key: str, chapter: dict, limit_segments: int | None) -> None:
    words = chapter["words"]
    folder = OUT / chapter["id"]
    folder.mkdir(parents=True, exist_ok=True)
    spans = split_words(words)
    source_hash = hashlib.sha256(json.dumps(words, ensure_ascii=False).encode()).hexdigest()
    old_path = folder / "manifest.json"
    old = json.loads(old_path.read_text()) if old_path.exists() else {}
    if old.get("sourceHash") != source_hash or old.get("model") != MODEL or old.get("voice") != VOICE:
        old = {}
    old_segments = {segment["start"]: segment for segment in old.get("segments", [])}
    segments = []
    for number, (start, end) in enumerate(spans):
        if limit_segments is not None and number >= limit_segments:
            break
        name = f"{number:03d}.mp3"
        path = folder / name
        cached = old_segments.get(start)
        if cached and cached.get("end") == end and path.exists():
            segments.append(cached)
            continue
        source = [word[0] for word in words[start:end]]
        content = synthesize(session, key, " ".join(source))
        duration = mp3_duration(content)
        recognized = transcribe(session, key, content)
        times, confidence = align_times(source, recognized, duration)
        if confidence < 0.65:
            raise ValueError(f"Word alignment was too weak in {chapter['id']} segment {number}: {confidence:.0%}")
        path.write_bytes(content)
        segments.append({"file": name, "start": start, "end": end, "duration": round(duration, 3), "times": times})
        print(f"{chapter['id']} {number + 1}/{len(spans)}: {end - start} words, {duration:.1f}s, {confidence:.0%} aligned")
        old_path.write_text(json.dumps({"sourceHash": source_hash, "model": MODEL, "voice": VOICE, "wordCount": len(words), "complete": False, "segments": segments}, separators=(",", ":")))
    complete = len(segments) == len(spans)
    old_path.write_text(json.dumps({"sourceHash": source_hash, "model": MODEL, "voice": VOICE, "wordCount": len(words), "complete": complete, "segments": segments}, separators=(",", ":")))
    print(f"{chapter['id']}: {'complete' if complete else 'partial'} ({len(segments)}/{len(spans)} clips)")


def main() -> None:
    import requests

    parser = argparse.ArgumentParser()
    parser.add_argument("--chapter", default="all", help="Chapter ID or all")
    parser.add_argument("--limit-segments", type=int, default=None)
    args = parser.parse_args()
    key = os.environ.get("POLLINATIONS_API_KEY")
    if not key:
        raise SystemExit("POLLINATIONS_API_KEY is missing")
    chapters = json.loads(BOOK.read_text())["chapters"]
    selected = [chapter for chapter in chapters if chapter.get("available") and (args.chapter == "all" or chapter["id"] == args.chapter)]
    if not selected:
        raise SystemExit(f"No available chapter matched {args.chapter}")
    with requests.Session() as session:
        for chapter in selected:
            generate_chapter(session, key, chapter, args.limit_segments)


if __name__ == "__main__":
    main()
