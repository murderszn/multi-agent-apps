# Human 2.0 — Book Archive

This folder is the source archive for the Human 2.0 book project. It contains the current notebook-paper editorial site, the network-map reference image, the technical table of contents, and the field-essay concepts that will become the first draft chapters.

## Contents

- `index.html` — editorial/book working draft
- `styles.css` — paperwhite notebook visual system
- `assets/network-map-sketch.jpeg` — supplied hand-drawn network map
- `assets/network-map-clean.jpeg` — current clean-view copy of the supplied map

## Editorial direction

The book combines practical AI systems writing with personal field essays. It treats the six-agent lab as a working proof case, not a claim that six hosts are optimal. Each future chapter should include:

1. a plain-language explanation
2. a working example
3. a failure mode
4. a section titled **Why this matters in 2026**
5. measurable limitations and open questions

The current field-essay deck covers vibe coding, the small factory under the desk, model specialization, Muse and Instinct, job-search agents, human accountability, vibe-coded security, remote work, build in public, and the first-try problem.

## Local preview

From this folder:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.
