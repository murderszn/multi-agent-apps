"""Build the standalone reader's book data from the canonical manuscript."""

from __future__ import annotations

import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = Path(__file__).with_name("book.json")

# The twenty canonical chapters in writings/EDITORIAL-GUIDANCE.md.
PARTS = [
    ("Part I", "Crash course", [
        "part-01-crash-course/01-models.md",
        "part-01-crash-course/02-context-retrieval-memory.md",
        "part-01-crash-course/03-tools-agents.md",
        "part-01-crash-course/04-coordination-verification.md",
        "part-01-crash-course/05-hardware-economics.md",
        "part-01-crash-course/06-alignment-programmers.md",
    ]),
    ("Part II", "Human 2.0 in the wild", [
        "part-02-field-essays/01-vibe-coding.md",
        "part-02-field-essays/02-small-factory.md",
        "part-02-field-essays/03-claude-dreams-codex-ships.md",
        "part-02-field-essays/04-muse-instinct.md",
        "part-02-field-essays/05-job-search.md",
        "part-02-field-essays/06-security-build-public.md",
        "part-02-field-essays/07-office-is-a-swarm.md",
        "part-02-field-essays/08-first-try.md",
    ]),
    ("Part III", "Running the day", [
        "part-03-running-the-day/01-baseline.md",
        "part-03-running-the-day/02-direct-route.md",
        "part-03-running-the-day/03-execute.md",
        "part-03-running-the-day/04-verify-review.md",
        "part-03-running-the-day/05-learn-measure-adopt.md",
        "part-03-running-the-day/06-human-2-0.md",
    ]),
]

END_HEADINGS = {
    "notes", "sources", "references", "evidence ledger", "qa checklist",
    "editorial notes", "editorial checklist", "claim ledger", "research notes",
}


def clean_inline(value: str) -> str:
    value = re.sub(r"!\[([^]]*)\]\([^)]+\)", r"\1", value)
    value = re.sub(r"\[([^]]+)\]\([^)]+\)", r"\1", value)
    value = re.sub(r"<https?://[^>]+>", "", value)
    value = re.sub(r"<[^>]+>", "", value)
    value = re.sub(r"\[\^[^]]+\]", "", value)
    value = re.sub(r"(?<!\w)(?:\*\*|__|\*|_|`|~~)(?=\S)|(?<=\S)(?:\*\*|__|\*|_|`|~~)(?!\w)", "", value)
    value = value.replace("\\|", "|")
    return html.unescape(value).strip()


def parse_chapter(path: Path) -> tuple[str, str, int]:
    lines = path.read_text(encoding="utf-8").splitlines()
    title = clean_inline(next(line[2:] for line in lines if line.startswith("# ")))
    blocks: list[str] = []
    paragraph: list[str] = []
    in_code = False

    def flush() -> None:
        if paragraph:
            text = clean_inline(" ".join(paragraph))
            if text:
                blocks.append(text)
            paragraph.clear()

    for line in lines[1:]:
        stripped = line.strip()
        if stripped.startswith("```"):
            flush()
            in_code = not in_code
            continue
        if in_code:
            continue
        match = re.match(r"^#{2,6}\s+(.+)$", stripped)
        if match:
            flush()
            heading = clean_inline(match.group(1)).lower().rstrip(":")
            if heading in END_HEADINGS:
                break
            # Section headings are spoken as short pauses, not as editorial markup.
            if not re.search(r"^(editorial|chapter promise|status|template)", heading):
                blocks.append(clean_inline(match.group(1)))
            continue
        if not stripped:
            flush()
            continue
        if stripped == "---" or stripped.startswith("<!--"):
            flush()
            continue
        if stripped.startswith(">"):
            quoted = stripped.lstrip("> ")
            if re.match(r"(?:\*\*)?(Status|Part|Issue|Target length):", quoted, re.I):
                flush()
                continue
            stripped = quoted
        if stripped.startswith("|"):
            flush()
            continue
        if re.match(r"^[-*]\s+\[[ xX]\]", stripped):
            flush()
            continue
        stripped = re.sub(r"^\s*(?:[-*+] |\d+[.)] )", "", stripped)
        paragraph.append(stripped)
    flush()
    text = "\n\n".join(blocks)
    return title, text, len(text.split())


def display_words(content: str) -> list[list]:
    """Keep one visible word per frame and preserve paragraph pauses."""
    matches = list(re.finditer(r"\S+", content))
    words: list[list] = []
    for index, match in enumerate(matches):
        next_start = matches[index + 1].start() if index + 1 < len(matches) else len(content)
        paragraph_end = "\n\n" in content[match.end():next_start] or index == len(matches) - 1
        if re.fullmatch(r"[—–-]+", match.group()) and words:
            words[-1][0] += match.group()
            if paragraph_end:
                words[-1] = [words[-1][0], 1]
        else:
            words.append([match.group(), 1] if paragraph_end else [match.group()])
    return words


def main() -> None:
    chapters = []
    for part, part_name, files in PARTS:
        for number, relative in enumerate(files, 1):
            path = ROOT / "writings" / relative
            title, content, words = parse_chapter(path)
            available = words >= 350
            words_for_reader = display_words(content) if available else []
            chapters.append({
                "id": Path(relative).stem,
                "part": part,
                "partName": part_name,
                "number": number,
                "title": title,
                "source": "writings/" + relative,
                "available": available,
                "wordCount": words,
                "words": words_for_reader,
            })
    OUT.write_text(json.dumps({"title": "Human 2.0", "chapters": chapters}, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(f"Wrote {OUT.relative_to(ROOT)}: {sum(c['available'] for c in chapters)}/{len(chapters)} chapters available")
    for chapter in chapters:
        if not chapter["available"]:
            print(f"  Coming soon: {chapter['title']} ({chapter['wordCount']} words)")


if __name__ == "__main__":
    main()
