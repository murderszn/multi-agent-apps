# Human 2.0 — Agent Systems Book

This repository serves the Human 2.0 book site. The root is a landing page; `reader/` contains the full canonical manuscript in a one-word-at-a-time reader.

## Website

- `index.html` — book landing page, overview, and entry points into the reader.
- `theme.css` — shared matte-black, white, and neon-green design tokens.
- `styles.css` — responsive landing-page layout and typography.
- `line-field.svg` — original fine-line artwork inspired by the grayscale reference.
- GitHub Pages: https://murderszn.github.io/multi-agent-apps/

## One-word reader

`reader/` is a static website for reading the canonical manuscript one word at a time at an adjustable pace, with optional AI narration and browser-voice fallback. The homepage links to each part by chapter ID. See `reader/README.md` for preview and update instructions.

## Directory

- `index.html` — book landing page.
- `theme.css` — shared color and type foundation for both pages.
- `styles.css` — landing page styles.
- `line-field.svg` — fine-line artwork for the homepage hero.
- `hero-field.svg` — spare black-on-black line field, kept in assets.
- `network-diagram-map.png` — preserved network illustration from the earlier root page.
- `reader/` — one-word reader website and manuscript build script.
- `.github/workflows/reader-audio.yml` — secure GitHub Actions generation of Gemini narration.
- `writings/` — canonical manuscript and editorial guidance.
- `archive/` — preserved earlier versions of the project.

## Archive

`archive/original-multi-agent-apps/` contains the original repository files preserved before the book became the current project.

`archive/human-2.0-book/` contains the earlier archived copy of the book draft and its asset bundle.

## Editorial source

The canonical chapters live in `writings/`. Run `python3 reader/build.py` after manuscript changes to update `reader/book.json`.

## Local preview

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.
