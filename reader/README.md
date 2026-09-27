# Human 2.0 Reader

A standalone, silent, one-word-at-a-time reader for the canonical *Human 2.0* manuscript. It lives alongside the existing book website.

Each displayed word is centered as a whole. Two middle letters share one focus block for medium words, three for longer words, and one for short words. A single-letter word remains unmarked. The focus block preserves the exact type size and baseline of the rest of the word. It is a visual guide, not a model tokenizer.

## Preview

From the repository root:

```bash
python3 reader/build.py
python3 -m http.server 8080
```

Open `http://localhost:8080/reader/`. The reader is static and can be hosted under `/reader/` on the same site as the current homepage.

## Reading

- Start at 240 WPM; change pace from 120 to 900 WPM. Longer words and punctuation get extra time, so actual reading time can be slower than the slider's nominal pace.
- Click the word or use the play button to play or pause. Space works when focus is outside the controls.
- Use the arrow keys or transport buttons to move one word at a time.
- Open **Chapters** to switch chapters. Reading position and speed save in this browser.
- A link such as `reader/?chapter=01-vibe-coding` opens a specific chapter at its first word. The homepage uses these links for its three parts.
- The player pauses when the tab becomes hidden and at the end of a chapter.
- It makes no sound and uses no audio APIs.

## Updating the book

The reader uses the twenty canonical paths listed in `build.py`, following `writings/EDITORIAL-GUIDANCE.md`. Edit a chapter in `writings/`, then run `python3 reader/build.py` and commit the updated `book.json`. The build skips source ledgers, QA checklists, status metadata, Markdown syntax, and chapters under 350 words. Short outlines appear as **Coming soon** in the chapter list.

## Directory

- `index.html` — reader screen and chapter dialog.
- `styles.css` — responsive matte-black reader with stark white type and neon-green focus blocks.
- `../theme.css` — colors and typography shared with the homepage.
- `app.js` — silent playback, pace, chapters, and saved progress.
- `build.py` — canonical manuscript to reader data conversion.
- `book.json` — generated book data used by the static site.
- `README.md` — preview and update instructions.
