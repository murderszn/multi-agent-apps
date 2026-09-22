# Human 2.0 — Agent Systems Book

This repository now serves the Human 2.0 book and editorial site. The current book draft lives at the repository root so GitHub Pages and a direct static preview can serve it without a nested path.

## Current book site

- `index.html` — current editorial/book draft
- `styles.css` — notebook-paper visual system
- `network-map-sketch.jpeg` — supplied hand-drawn network map
- `network-map-clean.jpeg` — clean-view copy of the map

## Archive

`archive/original-multi-agent-apps/` contains the original repository files preserved before the book became the current project.

`archive/human-2.0-book/` contains the earlier archived copy of the book draft and its asset bundle.

## Editorial direction

The book combines practical AI systems writing with personal field essays. It treats the six-agent lab as a working proof case, not a claim that six hosts are optimal. Each future chapter should include a plain-language explanation, a working example, a failure mode, and a section titled **Why this matters in 2026**.

## Local preview

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.
