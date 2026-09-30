# Human 2.0 — Viral Marketing Strategy

**Author:** murderszn | **Book:** *Human 2.0* — First-person field manual for operating AI agents in 2026. 20 chapters, ~56k words.
**Goal:** Preorders / email list / GitHub stars. Optimize for screenshots and shares.
**Constraint:** No invented outcomes, prices, dates, or product behavior. Flag anything needing a primary source.

---

## 1. POSITIONING

### Logline
> A first-person field manual for the person who already has an AI agent running and needs to know what can go wrong — and what to put between the agent's output and their own name.

### Three Hooks

**Hook A — The harness, not the model**
> Every AI agent story you've read in 2026 is really a story about one inch: the gap between a model saying something and a tool actually doing it. This book is about that inch. Who built the bridge. What the bridge is allowed to touch. What happens when it leads somewhere nobody checked.
> *Frame:* Human 1.0 = you do every step yourself, slow and traceable. Human 2.0 = you route the work, keep judgment/consent/consequences, and trust the receipt, not the model's confidence.

**Hook B — The morning card that lied**
> I opened my board one morning and found a lie: an application had gone out the night before, the confirmation had come back clean, and the card still said In Progress. The agent did its job. The record didn't. That gap — between what the agent claims and what the world actually did — is the whole book.
> *Frame:* Human 1.0 = you trust your own memory. Human 2.0 = you build receipts into the workflow, because an agent's report is a claim, not a fact.

**Hook C — You don't need a data center. You need a standard.**
> My lab runs on a desktop under a desk, a voice assistant on Tailscale, a book worker on a cloud VM every four hours, and a routing layer that swaps model providers without rewriting code. Cheap hardware. The discipline is the product. This is the field manual for that machine.
> *Frame:* Human 1.0 = intelligence is something you buy from a vendor. Human 2.0 = intelligence is a swappable component; the valuable part is the harness you build around it.

### Short Bio (for X/Twitter, ~120 chars)
> Building a six-agent lab under a desk. Writing *Human 2.0*, a field manual for operating AI agents in 2026. Proof case, not a pitch deck. GitHub: murderszn/multi-agent-apps

### Long Bio (for blog, HN, press)
> I run a small operator's lab: a desktop on Tailscale, a Hermes voice assistant called Nora, a book worker that drafts chapters every four hours, and two agent systems filing job applications against a shared board under written rules. The hardware costs less than a used car. The discipline is what holds it together.
>
> *Human 2.0* is the first-person field manual for that setup. Twenty chapters, ~56k words. Not a textbook, not a hype book. It opens on the failures — the Indeed "verify you're human" wall that stopped an agent cold, five queued job applications that produced zero submissions, a 2 a.m. security pile that became Cerberus, and a $50k grant that stayed in the folder because the eligibility gate wasn't met. It ends with what must stay human: judgment, consent, and consequences.
>
> The core argument: once the model is smart enough, push the harness, not the leaderboard. The model proposes; the software disposes. Delegate execution. Keep judgment, consent, and consequences human.

### 10 One-Liners (Human 1.0 → Human 2.0 frame)

1. **Human 1.0** types every line. **Human 2.0** reads the diff and decides what ships.
2. **Human 1.0** trusts memory. **Human 2.0** builds receipts into the workflow.
3. **Human 1.0** asks "which model is smartest?" **Human 2.0** asks "which lane is this, and what happens when it fails?"
4. **Human 1.0** fears the agent taking the job. **Human 2.0** knows the risk is the agent taking the authority.
5. **Human 1.0** buys intelligence by the request. **Human 2.0** builds a routing layer and swaps the model string.
6. **Human 1.0** treats a demo as proof. **Human 2.0** treats a demo as the happy path and looks for the unhappy one.
7. **Human 1.0** writes a prompt and hopes. **Human 2.0** writes a hook that fires on every tool call.
8. **Human 1.0** says "the AI did it." **Human 2.0** says "the agent proposed; I disposed."
9. **Human 1.0** optimizes for speed. **Human 2.0** optimizes for proof per unit of speed.
10. **Human 1.0** asks what the model can do. **Human 2.0** asks what the harness lets it touch — and who reads the log.

---

## 2. VIRAL VISUAL SYSTEM — STARK AESTHETIC

**Reference points:** Omarchy wallpapers, minimalist album covers (Burial,테크노), brutalist poster design, terminal UI, GitHub dark mode. High contrast, brutalist type, massive negative space, one accent color. No gradients, no photos of people, no "AI robot hand" imagery.

### Palette

| Role | Hex | Use |
|---|---|---|
| Background | `#0a0a0a` | Primary canvas for all formats |
| Surface | `#111111` | Card/slice backgrounds in carousels |
| Text primary | `#e8e8e8` | Body, quotes (off-white, never pure white) |
| Text secondary | `#666666` | Footnote, metadata, secondary label |
| Accent | `#00ff41` | Terminal green — the single pop. Use sparingly: one word, one rule line, one checkbox tick, one "verified" stamp |
| Accent alt | `#ff9e2c` | Amber — used only in Part III / "what stays human" content to signal warmth vs. the cold green of the operator chapters |

**Rule:** Accent never exceeds ~5% of the image area. The power is in the negative space.

### Fonts

**Display (headlines, overlays, one-word punches):** `Space Grotesk` — Google Fonts, free. Heavy weights (700–900). Tight letter-spacing on big sizes. Use for: chapter pull-quotes, operator rules, loglines, single-word labels ("DONE," "VERIFIED," "ATTEMPTED," "RECEIPT").

**Monospace (proof, receipts, code, ledger lines, data):** `JetBrains Mono` — Google Fonts, free. Regular and bold. Use for: source citations, claim ledger fragments, tool menus, the "model proposes; software disposes" line, any text that reads as a terminal output or a receipt.

**Pairing rule:** Display for the claim. Mono for the receipt. Never mix weights of the same font in the same block — choose one weight per text layer.

### Three Layouts

**Layout A — The Quote Card (single image, all platforms)**
- Full-bleed `#0a0a0a` background.
- One line of Space Grotesk 900 centered, 60–80% of viewport width, in `#e8e8e8`.
- Rule of 12–16 words max for impact. Longer quotes get Layout B.
- Accent color on ONE word — the word that carries the tension ("disposes," "receipt," "human," "lie," "harness").
- Bottom right: `Human 2.0 · chapter XX` in JetBrains Mono 11px, `#666666`, no accent.
- Aspect ratio: 4:5 (X portrait, IG portrait, Threads). Also produce 1:1 crop for IG square.

**Layout B — The Receipt (proof-case card)**
- Two-column. Left: the claim in Space Grotesk, large. Right: the receipt in JetBrains Mono, smaller, `#00ff41` on `#111111` pill background or `#00ff41` text on dark.
- The receipt is short: a file path, a PR number, a confirmation line, a date, a source URL fragment.
- "A claim with a receipt is work." — this layout visualizes that line.
- Use for: Indeed wall card, JOB-98 card, Five9 confirmation, Cerberus scan output, grant eligibility gate.
- Aspect ratio: 16:9 (blog header, HN screenshot), also 4:5 crop.

**Layout C — The Lab (scene card)**
- Massive negative space — 70% of the canvas empty.
- A single concrete noun image or typographic object in the lower third: a desk silhouette, a terminal cursor, a network node diagram, a card on a board, a power button.
- One line of text above it, Space Grotesk, 40% width, left-aligned.
- This is the "signature scenes" layout: Indeed wall, 2 a.m. pile, five dead cards, desktop-josh on Tailscale, the grant folder.
- Aspect ratio: 4:5 primary. 16:9 for blog.

### Aspect Ratios

| Platform | Primary | Alt |
|---|---|---|
| X/Twitter | 4:5 (1080×1350) | 16:9 (1200×675) for thread headers |
| Instagram | 4:5 (1080×1350) | 1:1 (1080×1080) for carousel slide 1 |
| Threads | 4:5 | — |
| Blog (repo) | 16:9 (1200×675) header | 4:5 inline |
| Hacker News | 1280×720 or 1920×1080 (screenshot) | — |
| Reddit | 1200×630 (link preview) | 1:1 or 4:5 for image posts |

### Midjourney Image-Prompt Templates (backgrounds only — overlay prose in post)

All prompts: `--no people, faces, robots, hands, text, logo, gradient, pastel, stock photo --v 6.0 --style raw --ar [ratio]`

**Prompt 1 — Desk factory (for "small factory" posts)**
> `dark brutalist desk at 2am, single monitor glow, empty coffee cup, power strip, Mini PC and Raspberry Pi on a shelf edge, one green LED indicator light, high contrast monochrome with one green accent, negative space 70% upper frame, photographic, shot from above, --no people --ar 4:5`

**Prompt 2 — Network swarm (for routing / OpenRouter / swarm posts)**
> `minimalist geometric network diagram, dark background, nodes as small circles connected by thin lines, one node pulsing green, brutalist typography feel, vector aesthetic, massive negative space, no labels, no text, --no people, text, gradient --ar 16:9`

**Prompt 3 — Terminal grain (for tools/agents/propose-dispose posts)**
> `dark terminal screen, monospace cursor blinking at a blank prompt line, subtle film grain, one line of green text at the bottom: "model proposes; software disposes" NOT as an image text request — instead generate the texture and overlay text in post. Actual prompt: dark terminal texture, green phosphor glow on black, subtle scan lines, grain, negative space for text overlay, --no text, UI elements, people --ar 4:5`

**Prompt 4 — The Indeed wall (for verification gap / Indeed posts)**
> `empty browser window on dark screen, a single modal dialog box floating in the center, "verify you are human" as the concept — generate the dialog as a graphic shape, not text (text overlay in post). Clean brutalist, flat design, one green check icon that is NOT green but greyed out, the tension is the greyed checkbox. --no people, no text readable, --ar 4:5`

**Prompt 5 — Board / cards (for JOB-98, coordination, receipts posts)**
> `minimalist kanban board, dark surface, three columns, one card in the middle column highlighted, single green accent on the card edge, overhead flat shot, brutalist, negative space, no text on the card — overlay text in post. --no people, text, phones --ar 16:9`

**Overlay rules:**
- Always overlay in Canva/Figma/Photoshop after MJ generation. MJ text is unreliable.
- Space Grotesk for the headline, JetBrains Mono for the receipt/source.
- Green accent word = the one word that changes the meaning of the sentence. Not every sentence has one. When in doubt, don't accent anything.
- Source citation always in mono, bottom right, 11–13px, `#666666`. Format: `Human 2.0 · ch. XX · [file path fragment]`.
- No CTA text on the image. CTA goes in the post copy.

---

## 3. SNIPPET BANK — 40 Lines from the Manuscript

Ranked top 10 marked with ★. All citations to chapter files. All edited to <280 chars for X, <75 words for IG. No invented numbers/dates/prices. Scenes cited are real per the manuscript.

### ★ Top 10

**1. "The model proposes; the software disposes."**
- Source: `part-01-crash-course/03-tools-agents.md` § "The note on the desk"
- X (<280): `The model proposes; the software disposes. A large language model cannot click anything. It produces text. That's all it has ever done. Function calling turns that text into action — but the model never touches the phone. The model is the boss writing memos. Your code is the assistant who actually picks up the phone.`
- IG (<75 words): `The model proposes; the software disposes. A large language model cannot click anything. It produces text. That's all it has ever done. Function calling turns that text into action — but the model never touches the phone. The model is the boss writing memos. Your code is the assistant who actually picks up the phone.`
- Image: Layout A, accent on "disposes."

**2. "A claim with a receipt is work."**
- Source: `part-01-crash-course/04-coordination-verification.md` § "The operator rule"
- X: `An agent's output is a claim. A claim with a receipt is work. Build your workflows — and judge every product — by how cheaply and reliably they convert claims into receipts. The receipt can be a confirmation number, a screenshot, a board card in the right column, a diff you can read, a log entry with a timestamp.`
- IG: `An agent's output is a claim. A claim with a receipt is work. Build your workflows — and judge every product — by how cheaply and reliably they convert claims into receipts. The receipt can be a confirmation number, a screenshot, a board card in the right column, a diff you can read, a log entry with a timestamp.`
- Image: Layout B (the receipt card).

**3. "I handed it to one of my agents, the way I'd hand a Post-it to an assistant: 'Apply to this one.' The agent came back empty-handed. It couldn't get in."**
- Source: `part-01-crash-course/03-tools-agents.md` opening
- X: `I handed my agent a job posting, the way I'd hand a Post-it to an assistant: "Apply to this one." The agent came back empty-handed. Indeed had thrown up a "verify you're human" wall. The model could have written a perfect cover letter. What it couldn't do was cross the one inch between saying and doing.`
- IG: `I handed my agent a job posting, the way I'd hand a Post-it to an assistant: "Apply to this one." The agent came back empty-handed. Indeed had thrown up a "verify you're human" wall. The model could have written a perfect cover letter. What it couldn't do was cross the one inch between saying and doing.`
- Image: Layout C (Indeed wall scene). Accent on "one inch."

**4. "The inch between saying and doing is also the inch where things go wrong, and the harness decides which."**
- Source: `part-01-crash-course/03-tools-agents.md`
- X: `The inch between saying and doing is also the inch where things go wrong. A model that speaks is a chatbot. A model that can reach out and operate tools — search, run code, file forms, move money — is a worker. And everything you've read about AI agents in 2026 is really a story about that inch.`
- IG: `The inch between saying and doing is also the inch where things go wrong. A model that speaks is a chatbot. A model that can reach out and operate tools — search, run code, file forms, move money — is a worker. And everything you've read about AI agents in 2026 is really a story about that inch.`
- Image: Layout A, accent on "harness."

**5. "One morning I opened my Linear board and found a lie. A job application had gone out the night before. I had the submission confirmation. The card still said In Progress."**
- Source: `part-01-crash-course/04-coordination-verification.md` opening
- X: `One morning I opened my board and found a lie. An application had gone out the night before. I had the confirmation. The card still said In Progress. The work was done. The record said it wasn't. Nothing was on fire. Nobody lost money. But that card sat there telling me a story that wasn't true.`
- IG: `One morning I opened my board and found a lie. An application had gone out the night before. I had the confirmation. The card still said In Progress. The work was done. The record said it wasn't. Nothing was on fire. Nobody lost money. But that card sat there telling me a story that wasn't true.`
- Image: Layout B — card receipt visual. Citation: `coord-verification.md`.

**6. "A submission is not done when the confirmation arrives. It is done when the board, the receipt, and the confirmation all agree. Three sources, one truth."**
- Source: `part-01-crash-course/04-coordination-verification.md`
- X: `A submission is not done when the confirmation arrives. It is done when the board, the receipt, and the confirmation all agree. Three sources, one truth. My board reconciliation caught JOB-98 in the delta. Your audit will catch yours. Generation is cheap. Trust is expensive. Proof is the product.`
- IG: `A submission is not done when the confirmation arrives. It is done when the board, the receipt, and the confirmation all agree. Three sources, one truth. My board reconciliation caught JOB-98 in the delta. Your audit will catch yours. Generation is cheap. Trust is expensive. Proof is the product.`
- Image: Layout B, three-source receipt.

**7. "Tools turn models into workers. The harness decides what kind of worker. Build the loop, scope the tools, keep the reporting path open, and put a human at every point where a decision is actually being made."**
- Source: `part-01-crash-course/03-tools-agents.md` § "The wall, revisited"
- X: `Tools turn models into workers. The harness decides what kind of worker. Build the loop, scope the tools, keep the reporting path open, and put a human at every point where a decision is actually being made. The model will keep getting smarter. Your job — the operator's job — is to make sure the hands stay honest while the brain catches up.`
- IG: `Tools turn models into workers. The harness decides what kind of worker. Build the loop, scope the tools, keep the reporting path open, and put a human at every point where a decision is actually being made. The model will keep getting smarter. Your job — the operator's job — is to make sure the hands stay honest while the brain catches up.`
- Image: Layout A, accent on "harness" / "hands."

**8. "You don't need a data center. You need a few cheap machines and a standard."**
- Source: `part-02-field-essays/02-small-factory.md` opening
- X: `You don't need a data center. You need a few cheap machines and a standard. My lab runs on a desktop under a desk, a voice assistant on Tailscale, a book worker on a cloud VM every four hours, and a routing layer that swaps model providers without rewriting code. Cheap hardware. The discipline is the product.`
- IG: `You don't need a data center. You need a few cheap machines and a standard. My lab runs on a desktop under a desk, a voice assistant on Tailscale, a book worker on a cloud VM every four hours, and a routing layer that swaps model providers without rewriting code. Cheap hardware. The discipline is the product.`
- Image: Layout C (desk factory scene).

**9. "The hardware is cheap. The discipline is the product."**
- Source: `part-02-field-essays/02-small-factory.md`
- X: `The hardware is cheap. The discipline is the product. A used office mini PC costs less than a dinner out for two. A new Ryzen mini PC with 32 gigs of RAM runs a few hundred dollars. The barrier to entry is no longer money. It is knowing what to buy, how to connect it, and how to keep it from lying to you.`
- IG: `The hardware is cheap. The discipline is the product. A used office mini PC costs less than a dinner out for two. A new Ryzen mini PC with 32 gigs of RAM runs a few hundred dollars. The barrier to entry is no longer money. It is knowing what to buy, how to connect it, and how to keep it from lying to you.`
- Image: Layout A, accent on "discipline."

**10. "Once the model is smart enough, push the harness, not the leaderboard."**
- Source: `EDITORIAL-GUIDANCE.md` operator rule for the commodity theme chapter (also echoed in `part-02-field-essays/03-claude-dreams-codex-ships.md`)
- X: `Once the model is smart enough, push the harness, not the leaderboard. After Opus 4.5, another increment of raw model intelligence stopped being what I was missing. The models were smart enough for most of the tasks in this lab. "Most tasks" means the tasks this book actually shows. It does not mean judgment, consent, or consequences. Those stay human.`
- IG: `Once the model is smart enough, push the harness, not the leaderboard. After Opus 4.5, another increment of raw model intelligence stopped being what I was missing. The models were smart enough for most of the tasks in this lab. "Most tasks" means the tasks this book actually shows. It does not mean judgment, consent, or consequences. Those stay human.`
- Image: Layout A, accent on "harness."

### Lines 11–40 (condensed, citation only)

11. **"Vibe is acceptable as a name for the first pass. It is not a quality standard for the last pass."** — `part-02-field-essays/01-vibe-coding.md`
12. **"The scarce resource is not the ability to produce code. It is the ability to recognize which code is merely convincing and which code is fit for the stated use."** — `part-02-field-essays/01-vibe-coding.md`
13. **"A demo proves that a path can be made to look coherent. A product has to survive paths nobody put in the screenshot."** — `part-02-field-essays/01-vibe-coding.md`
14. **"Prompts are wishes. Hooks are law."** — `part-01-crash-course/04-coordination-verification.md`
15. **"The operator who cannot review is not directing a worker. They are trusting a stranger with write access."** — `part-02-field-essays/01-vibe-coding.md`
16. **"If the operator cannot explain why the change works, they are not directing a worker. They are trusting a stranger with write access."** — `part-02-field-essays/01-vibe-coding.md`
17. **"Claude dreams. Codex ships. Someone still has to decide whether the ship should leave the harbor."** — `part-02-field-essays/03-claude-dreams-codex-ships.md`
18. **"The most important failure mode is not a dramatic hallucination. It is silent substitution."** — `part-02-field-essays/03-claude-dreams-codex-ships.md`
19. **"A benchmark can tell you something about a model under a defined evaluation. It does not tell you which model belongs in your workflow without a local test."** — `part-02-field-essays/03-claude-dreams-codex-ships.md`
20. **"The remote agent is not sitting in a benchmark chart. It is sitting in the part of your day where you are tired, away from the desk, and still responsible for something."** — `part-02-field-essays/04-muse-instinct.md`
21. **"The question is smaller and more consequential: which agent actually lives in your life?"** — `part-02-field-essays/04-muse-instinct.md`
22. **"A pleasant conversation can hide a dangerous permission boundary."** — `part-02-field-essays/04-muse-instinct.md`
23. **"The candidate that earns repeat use is not necessarily the most capable in the abstract. It is the candidate whose failure modes are legible."** — `part-02-field-essays/04-muse-instinct.md`
24. **"The job search looks like a perfect place for an agent: repetitive, searchable, high-volume, and miserable when performed alone. That is exactly why it is dangerous."** — `part-02-field-essays/05-job-search.md`
25. **"Delegate transformations, not accountability."** — `part-02-field-essays/05-job-search.md`
26. **"Every material sentence should point back to the evidence file or be marked for review."** — `part-02-field-essays/05-job-search.md`
27. **"The useful end state is not a machine firing applications into the dark. It is a short queue on the operator's desk. Each role has a reason. Each claim has a source."** — `part-02-field-essays/05-job-search.md`
28. **"The agents work while I sleep. That is the deal. There is a second half to that deal nobody signs up for consciously. I cannot read every line my agents write."** — `part-02-field-essays/06-security-build-public.md`
29. **"AI writes code that works. It does not write code that is safe. Somebody has to close that gap, and that somebody cannot be a human squinting at ten thousand lines before coffee."** — `part-02-field-essays/06-security-build-public.md`
30. **"Building in public means your mistakes are public too. Security debt compounds in the dark."** — `part-02-field-essays/06-security-build-public.md`
31. **"The review is part of the loop, not a gate at the end. The agent that wrote the code never merges its own pull request."** — `part-02-field-essays/06-security-build-public.md`
32. **"Speed got us here and is not going away. The question was never whether to slow down. It was whether the careful part could run as fast as the fast part, in the open, every single time."** — `part-02-field-essays/06-security-build-public.md`
33. **"The office is a desk, power, Wi-Fi, and a swarm."** — `part-02-field-essays/07-office-is-a-swarm.md`
34. **"The desk is where I ask, 'What happened?' The system must answer with artifacts rather than confidence."** — `part-02-field-essays/07-office-is-a-swarm.md`
35. **"Attempted is not returned. Returned is not verified."** — `part-02-field-essays/07-office-is-a-swarm.md`
36. **"The first attempt looked like progress. That is the trap."** — `part-02-field-essays/08-first-try.md`
37. **"Do not ask whether the agent got it right on the first try. Ask whether the workflow makes the first try cheap to inspect, safe to reject, and informative enough to improve."** — `part-02-field-essays/08-first-try.md`
38. **"At 9:00, the workday looks available. Then the first meeting starts, and the work that mattered becomes the work that can be squeezed between other people's calendars."** — `part-03-running-the-day/01-baseline.md`
39. **"Do not claim an upgrade without recording the baseline."** — `part-03-running-the-day/01-baseline.md`
40. **"Route by workload, sensitivity, persistence, and evidence. Intent starts with the human. Then the work goes where it belongs."** — `part-03-running-the-day/02-direct-route.md`

**Claim-ledger flags for marketing:**
- Line 10 references Opus 4.5 as "the personal threshold." The manuscript's editorial guidance says this is the author's position, first-person, not requiring a benchmark. OK to use as a personal claim in marketing, framed as *my* threshold, not a universal fact.
- Lines referencing Stripe/OpenRouter acquisition ($7.5–8B, Aug 2026) are ecosystem-reported in the manuscript's ledger — flag if used in a claim that needs a primary source. For marketing copy, use "Stripe reportedly acquired OpenRouter in August 2026" with "reportedly" intact.
- Lines referencing Sonar 92% / 42% / 1.7x / 2.74x figures are second-hand in the manuscript's ledger — flag. For marketing, use only "a security team scanned 5,600 vibe-coded apps" (attributed in manuscript to Escape.tech via Botmonster Tech) — that figure appears in the security chapter with a source.
- The $50k grant refusal scene: the manuscript says the eligibility gate wasn't met (Sept 20–21, 2026, Fund Her Future). No fabricated outcome. OK to reference as "a grant that stayed in the folder" without specific dollar amount unless you have the primary source. Safer: "a grant application I chose not to file because the eligibility gate wasn't met."

---

## 4. 30-DAY CONTENT CALENDAR

**Cadence:** Daily X, daily IG (or Threads if IG is a carousel day), Threads daily (mirror X or native). 2x/week blog (Mon/Thu). 3x HN drafts (spread across 30 days). 5x Reddit posts (one per week, specific sub, specific angle).

**Note on reposting:** Every piece of copy below pairs with an image concept from Section 2. Image first, copy second — always screenshot-friendly.

### Week 1 — Proof case introduction

**Day 1 (Mon)**
- **Blog #1:** "The Model Proposes; The Software Disposes" — essay expanding tools chapter. Outline: the inch, the function-calling menu, the agentic loop, the coder-checker pattern, the Indeed wall as the opening scene, what the harness actually is. CTA: "This is chapter 3 of Human 2.0. Preorder / join the list at [link]."
- **X:** "The model proposes; the software disposes." + Layout A image. CTA: "Field manual for operating AI agents in 2026. Writing it in public. GitHub: murderszn/multi-agent-apps"
- **IG:** Layout A (propose/disposes), caption = snippet #1, CTA in bio.
- **Threads:** Mirror X or native short version.
- **HN draft (#1):** Title: "Show HN: Human 2.0 — a field manual for operating AI agents in 2026, written in public." Body: describe the repo, the 20-chapter structure, the claim ledger, the proof case (6-agent lab under a desk), the editorial standard (no invented outcomes). Non-marketing tone: "I'm writing a book and the whole thing is in this repo. Looking for feedback on the editorial standard and the operator rules." First comment: link to the tool chapter draft as the strongest standalone piece.

**Day 2 (Tue)**
- **X:** Indeed wall scene — snippet #3. Layout C image. CTA: "The agent did the right thing. It hit a checkpoint it couldn't pass, said so, and waited. That behavior is the whole book."
- **IG:** Layout C (Indeed wall). Caption: snippet #3.
- **Threads:** Mirror.

**Day 3 (Wed)**
- **X:** "A claim with a receipt is work." — snippet #2. Layout B image (receipt card). CTA: "Human 2.0 starts from this line. Every chapter ends with an operator rule and a measurable test."
- **IG:** Layout B. Caption: snippet #2.
- **Threads:** Mirror.

**Day 4 (Thu)**
- **Blog #2:** "A Claim with a Receipt Is Work" — essay expanding coordination/verification chapter. Outline: the JOB-98 morning, the board as the manager, the handoff death, review theater, hooks vs. instructions, the receipt taxonomy. CTA: same.
- **X:** JOB-98 scene — snippet #5. Layout B. CTA: "Generation is cheap. Trust is expensive. Proof is the product."
- **IG:** Layout B (JOB-98 card). Caption: snippet #5.
- **Threads:** Mirror.

**Day 5 (Fri)**
- **X:** "Five queued applications, zero submissions." Scene from factory chapter. No fabricated numbers. Layout C. CTA: "The fix wasn't a better agent. It was a rule: verify the listing is live before reporting it."
- **IG:** Layout C (five dead cards visual). Caption: factory chapter scene. CTA: "Small and reliable beats big and theatrical."
- **Threads:** Mirror.

**Day 6 (Sat)**
- **X:** "The hardware is cheap. The discipline is the product." — snippet #9. Layout A. CTA: "My lab costs less than a used car. The hard part is the standard."
- **IG:** Layout A. Caption: snippet #9.
- **Threads:** Mirror.

**Day 7 (Sun)**
- **X (build-in-public):** "Today in the lab: chapter drafts arriving as open PRs. This week's queue: [list the open issues from editorial guidance]. The book is being written in public GitHub issues. No pitch deck version. No separate real version. There is the repo." Layout C (lab scene). CTA: "Read the queue and the editorial standard. murderszn/multi-agent-apps"
- **IG:** Layout C. Same caption.
- **Threads:** Mirror.
- **Reddit #1 (r/LocalLLaMA):** Title: "I built a six-agent lab under my desk. Running it costs less than a used car. Here's the standard that holds it together." Body: open with the hardware setup (cheap minis, Tailscale, routing layer), the morning check-in, the five-lane division, the discipline (name every agent, say what it does, say what happens when it fails). Anti-self-promo framing: "Not asking for feedback on the hardware — asking whether the operator standard is missing anything. The book is in the repo if you want to see the full argument." Image: Layout C.

### Week 2 — Operator rules + failure modes

**Day 8 (Mon)**
- **X:** "Prompts are wishes. Hooks are law." — snippet #14. Layout A. CTA: "My 'never guess screening answers' rule is not a sentence in a prompt. It is a hard stop in the workflow."
- **IG:** Layout A. Caption: snippet #14.
- **Threads:** Mirror.

**Day 9 (Tue)**
- **X:** Vibe coding — snippet #11. Layout A. CTA: "Vibe is the first pass. Review is the last pass. The phrase names a new interface to programming. It does not repeal the old obligations."
- **IG:** Layout A. Caption: snippet #11.
- **Threads:** Mirror.
- **HN draft (#2):** Title: "Show HN: Cerberus — automated security scanner for vibe-coded and rapid-deployment apps." Body: describe the three surfaces (deterministic scanner, nine-persona workbench, GitHub app), the loop in the lab (scan before merge, draft but not merge, public repo). Non-marketing: "I built this because AI writes code that works and doesn't write code that's safe. The loop needs a tool shaped like the problem. Repo is public, looking for people to break it." First comment: link to the security chapter for the full context.

**Day 10 (Wed)**
- **X:** "A demo proves a path can be made to look coherent. A product has to survive paths nobody put in the screenshot." — snippet #13. Layout A. CTA: "Empty data source? Repeated request? Malformed input? Network disappears? Dependency changes? The demo never tests these."
- **IG:** Layout A. Caption: snippet #13.
- **Threads:** Mirror.

**Day 11 (Thu)**
- **Blog #3:** "Vibe Coding: The First Pass and the Last Pass" — essay expanding vibe-coding chapter. Outline: the afternoon scene, the demo vs. product distinction, prompting for stability, the four questions every change must answer, the repository-as-proof argument, the internal-tool example. CTA: same.
- **X:** "The scarce resource is not the ability to produce code. It is the ability to recognize which code is merely convincing." — snippet #12. Layout A. CTA: "Speed is real. The supervision is realer."
- **IG:** Layout A. Caption: snippet #12.
- **Threads:** Mirror.

**Day 12 (Fri)**
- **X:** "Claude dreams. Codex ships. Someone still has to decide whether the ship should leave the harbor." — snippet #17. Layout A. CTA: "The names are shorthand for lanes. The useful question is not which model is smartest. It is which worker is appropriate for this lane."
- **IG:** Layout A. Caption: snippet #17.
- **Threads:** Mirror.
- **Reddit #2 (r/ClaudeCode):** Title: "I run two agent systems filing job applications against one board. Here's the coordination standard that keeps them from double-applying." Body: the Linear board setup, the read-first rule, the JOB-98 incident (application went out, card stayed In Progress), the gate stack (is the posting live? is the pay in band? are there screening questions only I can answer?), the salary floor override logged as an audit trail. Anti-self-promo: "The coordination failures are the interesting part, not the applications. The book has the full failure taxonomy if you want it." Image: Layout B (JOB-98 receipt).

**Day 13 (Sat)**
- **X (build-in-public):** "This week's lab note: the routing layer. OpenRouter, one API key, one endpoint, model string as an environment variable. When the provider changes, the rest of the system doesn't move. The model is the cheapest part to replace. The harness is what you keep." Layout C (network swarm). CTA: "The Stripe/OpenRouter deal reportedly valued the routing layer at $7.5–8B. Read that as: the layer that lets you swap models became someone's most valuable asset. Build your system the other way."
- **IG:** Layout C. Caption: same.
- **Threads:** Mirror.

**Day 14 (Sun)**
- **X:** "The remote agent is not sitting in a benchmark chart. It is sitting in the part of your day where you are tired, away from the desk, and still responsible for something." — snippet #20. Layout A. CTA: "The question isn't which model is smartest. It's which agent actually lives in your life."
- **IG:** Layout A. Caption: snippet #20.
- **Threads:** Mirror.

### Week 3 — Security + review loop

**Day 15 (Mon)**
- **X:** "The agents work while I sleep. That is the deal. There is a second half to that deal nobody signs up for consciously. I cannot read every line my agents write." — snippet #28. Layout C (2 a.m. pile scene).
- **IG:** Layout C. Caption: snippet #28.
- **Threads:** Mirror.

**Day 16 (Tue)**
- **X:** "AI writes code that works. It does not write code that is safe. Somebody has to close that gap." — snippet #29. Layout A, accent on "safe."
- **IG:** Layout A. Caption: snippet #29.
- **Threads:** Mirror.
- **Reddit #3 (r/selfhosted or r/homelab):** Title: "My homelab runs AI agents unattended. The security review runs before the merge, not after the incident. Here's the five-point check." Body: the predictable security profile of fast code (credentials in wrong place, auth without authz, dependencies nobody chose, input validation as afterthought), the Cerberus loop (deterministic scan, personas, GitHub app), the five-point check before customer data (secret scan by content, auth+z, revoked credentials, server-side scan gate, named human holds merge). Anti-self-promo: "The scanner is my own project — Cerberus — but the five-point check is the generalizable part. The book has the full argument." Image: Layout B (five-point receipt).

**Day 17 (Wed)**
- **X:** "Building in public means your mistakes are public too. Security debt compounds in the dark." — snippet #30. Layout A. CTA: "The teams that get hurt worst are the ones whose failures stay private until they become incidents."
- **IG:** Layout A. Caption: snippet #30.
- **Threads:** Mirror.

**Day 18 (Thu)**
- **Blog #4:** "Security, Cerberus, and Why Building in Public Is a Safety Practice" — essay expanding security chapter. Outline: the 2 a.m. code arrival, the predictable security profile, the Friday leak story, Cerberus's three surfaces, the loop in the lab, the build-in-public argument, the five-point check. CTA: same.
- **X:** "The review is part of the loop, not a gate at the end. The agent that wrote the code never merges its own pull request." — snippet #31. Layout A.
- **IG:** Layout A. Caption: snippet #31.
- **Threads:** Mirror.

**Day 19 (Fri)**
- **X:** "The dollar question is almost never 'what did I feed it?' It's 'what did I ask it to write?'" — from direct-route chapter. Layout A. CTA: "Haiku 4.5: $1/$5 per million tokens. Opus 5.5: $4/$20. Fable 5.1: $10/$50. Same lab. Top model costs ten times the small one per output token. Run a file rename through Opus and the joke is the invoice."
- **IG:** Layout A. Caption: same. Image: Layout B (price table receipt style).
- **Threads:** Mirror.

**Day 20 (Sat)**
- **X (build-in-public):** "Routing update: my job search runs on two agent systems against one board. We routed it explicitly — who files what, who logs where, duplicate-check rules. The routing is the system. Without it, two fast workers are just two fast ways to apply to the same job twice." Layout C (network swarm). CTA: "Route by workload, sensitivity, persistence, and evidence. Intent starts with the human. Then the work goes where it belongs."
- **IG:** Layout C. Caption: same.
- **Threads:** Mirror.
- **HN draft (#3):** Title: "Show HN: I route AI tasks by four questions — workload, sensitivity, persistence, evidence." Body: describe the four-question router, the price spread problem, the "room the model lives in" (local for sensitive, cloud for speed), the hardcoded tiers vs. classifier vs. gateway vs. self-routing models, the human override rate as the metric. Non-marketing: "I wrote a chapter about this in Human 2.0. The routing chapter is in the repo. Looking for examples of routing failures I haven't covered." First comment: link to the direct-route chapter file.

**Day 21 (Sun)**
- **X:** "Once the model is smart enough, push the harness, not the leaderboard." — snippet #10. Layout A, accent on "harness." CTA: "Opus 4.5 was my personal threshold. After that, another increment of raw model intelligence stopped being what I was missing. The models were smart enough for most of the tasks in this lab. It does not mean judgment, consent, or consequences. Those stay human."
- **IG:** Layout A. Caption: snippet #10.
- **Threads:** Mirror.

### Week 4 — What stays human + closing loops

**Day 22 (Mon)**
- **X:** "At 9:00, the workday looks available. Then the first meeting starts, and the work that mattered becomes the work that can be squeezed between other people's calendars." — snippet #38. Layout C.
- **IG:** Layout C. Caption: snippet #38.
- **Threads:** Mirror.

**Day 23 (Tue)**
- **X:** "Do not claim an upgrade without recording the baseline." — snippet #39. Layout A. CTA: "Human 1.0 is one accountable person carrying intent, context, prioritization, execution, verification, and memory in one head and one calendar. Before Human 2.0, there is Human 1.0. It is not an insult. It is the starting measurement."
- **IG:** Layout A. Caption: snippet #39.
- **Threads:** Mirror.
- **Reddit #4 (r/productivity):** Title: "I stopped saying agents made me faster. First I recorded what 'faster than what' actually meant." Body: the baseline chapter argument — the workday scene, the Human 1.0 chain (state outcome, interpret, find context, perform, decide, explain, carry uncertainty), the bounded work item, the baseline log, the five-field test (elapsed time, interruptions, decisions, rework, acceptance result). Anti-self-promo: "The chapter is in the repo. The measurable test is five comparable items before and after one change. That's the whole method." Image: Layout B (baseline log receipt).

**Day 24 (Wed)**
- **X:** "Delegate execution. Keep judgment, consent, and consequences human." — from the final chapter operator rule. Layout A, accent on "human."
- **IG:** Layout A. Caption: same.
- **Threads:** Mirror.

**Day 25 (Thu)**
- **Blog #5:** "Human 2.0: What Must Stay Human" — essay expanding final chapter. Outline: the opening scene (a decision the lab was not allowed to make), the six things that should never be delegated (responsibility, taste, consent, priorities, relationships, consequences), the fork analogy (from the PocketOS alignment chapter), the programmer-moves-up-the-stack argument, the pipeline question (if entry-level is priced out, where do the next seniors come from?). CTA: same.
- **X:** "The model will keep getting smarter. Your job — the operator's job — is to make sure the hands stay honest while the brain catches up." — from tools chapter closing. Layout A. CTA: "This is the last line of the tools chapter. It's also the last line of the book, in a different form."
- **IG:** Layout A. Caption: same.
- **Threads:** Mirror.

**Day 26 (Fri)**
- **X:** "The first attempt looked like progress. That is the trap." — snippet #36. Layout A. CTA: "The first attempt is often the most dangerous version of the work because it is coherent enough to create relief. It has headings. It has sentences that sound like the right sentences. The artifact gives you the feeling that the hard part is over before you've checked whether it answers the actual question."
- **IG:** Layout A. Caption: snippet #36.
- **Threads:** Mirror.
- **Reddit #5 (r/jobs or r/careerguidance — verify sub name):** Title: "I let agents apply for jobs before I did. Here's the boundary that kept it from becoming a pile of generic submissions." Body: the job search chapter argument — the serial nature trap, the decision record (not the application) as the right unit, the four-pass pipeline (discovery, analysis, drafting, human review), the three questions (is this true? can I explain it? does it help this application?), the gate on truth/fit/privacy/submission. Anti-self-promo: "No fabricated offer. No invented interview count. The point is the process, not the outcome. The chapter refuses to invent an offer. I'm not inventing one here either." Image: Layout B (decision record receipt).

**Day 27 (Sat)**
- **X (build-in-public):** "The unfinished chapter: Verify and Review (issue #60) and Learn, Measure, and Adopt Carefully (issue #61) are still outlines. I'm drafting them this week. The full queue is in the repo. Human 2.0 is 20 chapters. Twenty. Not a twenty-first." Layout C (lab scene). CTA: "Read the editorial standard. murderszn/multi-agent-apps"
- **IG:** Layout C. Caption: same.
- **Threads:** Mirror.

**Day 28 (Sun)**
- **X (thread template — launch week momentum):** Thread of 5 tweets:
  1. "I spent a year building a six-agent lab under my desk and writing down what actually works. The book is called Human 2.0."
  2. "The model proposes; the software disposes. That's the whole mechanism. A model can't click anything. It produces text. Everything else is your code."
  3. "A claim with a receipt is work. An agent's output is a claim. The receipt is the confirmation, the PR, the board card, the log entry. The form doesn't matter. What matters is that it comes from outside the agent's own mouth."
  4. "You don't need a data center. You need a few cheap machines and a standard. The hardware costs less than a used car. The discipline is the product."
  5. "Once the model is smart enough, push the harness, not the leaderboard. Delegate execution. Keep judgment, consent, and consequences human. Human 2.0 is the field manual. Writing it in public: murderszn/multi-agent-apps"
  - Each tweet pairs with a Layout A image. Thread image = Layout B (receipt style) at the end.
- **IG:** Carousel of 5 slides — one snippet per slide, Layout A each, last slide = book title + preorder/link CTA.
- **Threads:** Mirror thread or native.

**Day 29 (Mon)**
- **Blog #6:** "The Small Factory Under the Desk" — essay expanding factory chapter. Outline: the morning check-in, the hardware economics, the routing layer, the five lanes, the book worker every four hours, the failure modes (theater build, cheap iron trap, subagent bill, completion lie, silent lane), the three 2026 shifts (agents became durable actors, the money moved, the bottleneck moved from hardware to discipline). CTA: same.
- **X:** "Small and reliable beats big and theatrical." — factory chapter operator rule. Layout A.
- **IG:** Layout A. Caption: same.
- **Threads:** Mirror.

**Day 30 (Tue)**
- **X (final push):** "Human 2.0 is a first-person field manual for operating AI agents in 2026. 20 chapters. ~56k words. Not a textbook. Opens on the failures — the Indeed wall, five dead applications, the 2 a.m. security pile, the grant that stayed in the folder. Ends with what must stay human." Layout A (book title/logo treatment — typographic only, no cover image unless you have one). CTA: "Preorder / join the email list / star the repo: [links]."
- **IG:** Layout A (title treatment). Caption: same.
- **Threads:** Mirror.

---

## 5. PLATFORM PLAYBOOKS

### Hacker News — 3 Show HN angles

**HN Draft #1 — Human 2.0 book (repo)**
- **Title:** "Show HN: Human 2.0 — a field manual for operating AI agents in 2026, written in public"
- **Body:** Lead with what it is, not what it's for. "I'm writing a book — first-person field manual for operating AI agents in 2026. 20 chapters, ~56k words, in three parts: Crash Course, In the Wild, Running the Day. The whole manuscript is in this repo, drafted as open pull requests against GitHub issues. Each chapter carries a claim ledger, a measurable test, and an operator rule. No invented outcomes, prices, or dates. The proof case is my own six-agent lab under a desk — a voice assistant on Tailscale, a book worker every four hours, two job-search agents against one board, an OpenRouter routing layer. The editorial standard is in EDITORIAL-GUIDANCE.md. Looking for feedback on the standard and the operator rules specifically."
- **First-comment strategy:** "The strongest standalone draft right now is the tools chapter (part-01-crash-course/03-tools-agents.md) — it opens on the Indeed 'verify you're human' wall and explains the model-proposes/software-disposes mechanism. Happy to defend any of the operator rules in the comments."
- **Non-marketing tone rule:** No "exciting," no "game-changing," no "preorder now." HN responds to process, not pitches. The product is the repo and the standard. If asked about availability, answer literally — no invented release date.
- **Image for screenshot:** Layout B — a receipt-style card showing the claim ledger structure from one chapter (e.g., the JOB-98 ledger).

**HN Draft #2 — Cerberus**
- **Title:** "Show HN: Cerberus — automated security scanner for AI-generated code, runs before merge"
- **Body:** Lead with the problem. "AI writes code that works. It doesn't write code that's safe. I built a scanner that runs in the loop between the agent writing code and it going live — because I can't read every line at 2 a.m. and the security of the operation can't depend on me doing that. Three surfaces: a deterministic scanner (zero-dependency, identical in browser and CLI), a nine-persona agent workbench (you talk to the findings), and a GitHub app (scan-grounded conversations, AI diffs, one-click draft PRs — draft, not merge). The repo is public. Looking for people to break it."
- **First-comment strategy:** Link to the security chapter in the Human 2.0 repo for the full context on why the loop needs this. Mention the five-point check before customer data.
- **Non-marketing tone:** "It's my own project. The deterministic scanner is the reliable layer — the personas add judgment. Neither replaces the human merge decision."

**HN Draft #3 — Routing by four questions**
- **Title:** "Show HN: I route AI tasks by four questions — workload, sensitivity, persistence, evidence"
- **Body:** "Most people answer 'which AI should I use?' by accident. I've been running a routing layer for a year — OpenRouter, model string as an environment variable, hardcoded tiers for some jobs, a classifier for others. The chapter I wrote about it boils down to four questions I ask before every AI task: what is the workload, where can the data go, what must persist, how will I know it worked. The price spread is the reason it matters: Haiku 4.5 at $1/$5 per million tokens, Opus 5.5 at $4/$20, Fable 5.1 at $10/$50 — same lab, top model costs ten times the small one per output token. Run a file rename through Opus and the joke is the invoice. The routing chapter is in the repo. Looking for routing failure examples I haven't covered."
- **First-comment strategy:** Share the human override rate as the metric — "When overrides climb, the routing is wrong somewhere. That's the number I track."

### Reddit — 7 specific subs (verify names before posting)

**Posting order and sub-specific angles:**

1. **r/LocalLLaMA** (Week 1, Sun) — Hardware/lab setup angle. Title as above. Content: cheap hardware, the routing layer, what fails. This sub responds to real setups and honest failure reports. The $95 Dell servers / 112–212W idle / no GPU crawl from the factory chapter is good material — it's in the manuscript's ledger with a source (Facebook homelab group post, July 2026). Frame as "here's what I built and what went wrong" not "here's what you should build."

2. **r/ClaudeCode** (Week 2, Fri) — Coordination/job-search angle. Title as above. This sub has quota-burn threads and role-split heuristic discussions — the JOB-98 incident and the two-agent board setup speaks directly to that. Avoid sounding like you're selling the book; the coordination failures are the content.

3. **r/selfhosted or r/homelab** (Week 3, Tue) — Security/scanner angle. Title as above. These subs care about access control, attack surface, and what happens when you expose something you shouldn't. The five-point check is the generalizable content. Mention Cerberus as your own project but focus on the check, not the product.

4. **r/AIAgents** (Week 3, Fri — verify sub exists/active) — Agent failure modes angle. Title: "My agents file job applications. One morning the board lied to me. Here's the gap between what an agent claims and what actually happened." Content: the JOB-98 incident, the record-lies failure mode, the handoff-death mode, the review-theater mode. This sub has "do AI agents actually do anything" threads — address that directly with the receipt framework.

5. **r/productivity** (Week 4, Tue) — Baseline/measurement angle. Title as above. The productivity angle is the baseline chapter: don't claim an upgrade without recording the before-state. The Microsoft 2025 Work Trend Index figures (275 interruptions/day, 60% ad hoc meetings) are in the manuscript with a primary source citation (Microsoft's own report) — OK to use with proper attribution. The five-field baseline log is the actionable content.

6. **r/jobs or r/careerguidance** (Week 4, Fri — verify which is more active) — Job search agent angle. Title as above. This is delicate — job seekers are vulnerable to tool promises. Lead with the boundary, not the assistance. "The agent widened the search and prepared the work. I kept the gate on truth, fit, privacy, and submission. No fabricated offer. No invented interview count. Here's the process." The refusal to invent an offer is the credibility move — maintain it.

7. **r/homelab** (if not used above, or r/sysadmin) — Backup / second angle on the lab. Title: "My lab runs on Tailscale. The desk is a controller, not the factory. Here's the operating standard." Content: the office-as-swarm chapter — the desk/controller distinction, the attempted/returned/verified rule, the location-change drill.

**Anti-self-promo plan for all Reddit posts:**
- Lead with a failure, a scene, or a question — never with "I wrote a book."
- Link to the repo as supporting material, not as the main event. "The full argument is in the repo if you want it" — at the end, not the beginning.
- No subreddit spam: one post per sub per 30 days minimum. Different angle each time.
- Respond to comments in the operator voice — first person, evidence-led, admit uncertainty. If someone flags a claim that needs a primary source, thank them and flag it back. Do not get defensive.
- If a post gets flagged as self-promo, accept it. The content should stand without the book pitch. If it doesn't, the content needs work, not a better CTA.

### X/Twitter — thread templates + quote-post flywheel

**Thread template A — Scene + mechanism (the core format)**
1. Hook tweet: one sentence from a scene. (Layout A image)
2. Context tweet: what happened, who was involved, what the agent did or didn't do.
3. Mechanism tweet: the principle the scene illustrates. ("The model proposes; the software disposes.")
4. Failure tweet: where it went wrong, or where it could have gone wrong.
5. Operator rule tweet: the rule the chapter ends with. (Layout A image — rule in mono)
6. CTA tweet: "This is [chapter] of Human 2.0. The manuscript is in the repo. murderszn/multi-agent-apps"

**Thread template B — Receipt proof (for JOB-98, Indeed wall, Five9)**
1. The claim. "An application went out last night."
2. The receipt. "Confirmation came back clean."
3. The contradiction. "The card still said In Progress."
4. The detection. "I caught it because I went looking."
5. The rule. "A submission is done when the board, the receipt, and the confirmation all agree."
6. The CTA. Layout B image.

**Quote-post flywheel:**
- When someone in your network posts about an agent failure, a quota burn, a model routing question, or a security scare — quote-post with a one-line operator rule from the book and a Layout A image. Do not link the book in the quote post. The link goes in a reply if asked.
- Example: someone posts about burning $3,000 in tokens micromanaging agents. Quote-post: "Each charge was a receipt for my own micromanagement." — from the direct-route chapter source. Add: "Route by workload, sensitivity, persistence, and evidence. Intent starts with the human."

**Build-in-public updates:**
- Post when: a chapter draft is merged, a PR opens, a significant failure happens in the lab, a routing decision changes, a source is checked or flagged.
- Format: one scene, one fact, one unresolved question. Not a status report. "This week's lab note:" + the scene.
- Do not post every PR. Post the ones with a story.

### Instagram / Threads — formats

**Carousel (the primary IG format):**
- Slide 1: Layout A — the hook line (max 12 words). "The model proposes; the software disposes."
- Slide 2: Layout A — the scene. "I handed my agent a job posting. It came back empty-handed."
- Slide 3: Layout B — the receipt. "A claim with a receipt is work."
- Slide 4: Layout A — the operator rule. "Build the loop. Scope the tools. Keep the reporting path open."
- Slide 5: Title treatment — "Human 2.0 — field manual for operating AI agents in 2026. murderszn/multi-agent-apps"
- Caption: 1–2 sentences expanding the thread. CTA in bio, not in caption.

**Single-image quote post:**
- Layout A. Best for: operator rules, the one-liners from Section 1, the signature lines (propose/disposes, claim/receipt, harness not leaderboard).
- Caption: the snippet in full (the <75-word IG version from Section 3). CTA: "Full chapter in the repo. Link in bio."

**Text-native Threads format:**
- Threads favors native text over images for some audiences. Use Layout A images when the line is visually strong (propose/disposes, the receipt, the rule). Use text-only for: questions, short observations, build-in-public notes.
- Threads times: morning (7–9am local) for the operator crowd starting their day; evening (9–11pm) for the builders who work after hours. Test and watch replies.

**Hashtags (use sparingly — 2–3 max per post):**
- `#AIagents` — broad, use for scene posts
- `#ClaudeCode` — when the post relates to coding agents
- `#homelab` — hardware/lab posts
- `#buildinpublic` — build-in-public updates only
- `#AIsecurity` — Cerberus/security posts
- Avoid: `#AI`, `#machinelearning`, `#tech` — too broad, low signal.

### Blog (repo, in repo)

**8 essay titles with outlines (all expanding book themes):**

1. **"The Model Proposes; The Software Disposes"** — Tools chapter expansion. Outline: the inch (saying → doing), the function-calling menu, the agentic loop (decide-act-observe), MCP as USB-C of AI, the coder-checker pattern, the Indeed wall scene, the apply line (Five9 clean run + failure curriculum), the wrong-call-with-real-consequences shape, the harness as the product. CTA: "Chapter 3 in the repo."

2. **"A Claim with a Receipt Is Work"** — Coordination/verification chapter expansion. Outline: the JOB-98 morning, the board as manager, the record-lies failure mode, the handoff-death mode, review theater, hooks vs. instructions, the receipt taxonomy (confirmation number, screenshot, board card, diff, log entry), the weekly audit test. CTA: "Chapter 4 in the repo."

3. **"Vibe Coding: The First Pass and the Last Pass"** — Vibe-coding chapter expansion. Outline: the afternoon scene, the demo vs. product distinction, prompting for stability (demo prompt vs. stability prompt), the four questions every change must answer, the repository-as-proof argument, the internal-tool example (three problems, human fixes two, sends one back), why agents lie without intending to, the five failure modes. CTA: "Chapter 1 of Part II in the repo."

4. **"You Don't Need a Data Center. You Need a Standard."** — Factory chapter expansion. Outline: the morning check-in, the hardware economics (cheap minis, the $95 Dell trap, the $7k basement cluster critique), the routing layer (OpenRouter, model string as env var), the five lanes and their failure modes, the book worker every four hours, the failure modes (theater build, cheap iron trap, subagent bill, completion lie, silent lane), the three 2026 shifts, the operator rule. CTA: "Chapter 2 of Part II in the repo."

5. **"Claude Dreams. Codex Ships."** — Claude-dreams/Codex-ships chapter expansion. Outline: the handoff as the most useful artifact, the three lanes (dreamer/implementer/reviewer), the handoff needs teeth (goal, repository state, inputs, constraints, acceptance checks, known uncertainty, stop condition), the silent substitution failure mode, choosing a specialist without worshipping a benchmark, the local test over the leaderboard. CTA: "Chapter 3 of Part II in the repo."

6. **"Security, Cerberus, and Why Building in Public Is a Safety Practice"** — Security chapter expansion. Outline: the 2 a.m. code arrival, the predictable security profile of fast code, the Friday leak story, Cerberus's three surfaces, the loop in the lab, the rubber-stamping failure mode, the build-in-public argument (security debt compounds in the dark), the five-point check before customer data, the 5,600-app scan figure (attributed in manuscript), the Moltbook and Replit cases. CTA: "Chapter 6 of Part II in the repo."

7. **"Routing: Intent Starts with the Human"** — Direct/Route chapter expansion. Outline: the four questions (workload, sensitivity, persistence, evidence), the router as bouncer with a clipboard, the four flavors (hardcoded tiers, classifier routers, gateway routers, self-routing models), the price spread as the consumer issue, the room the model lives in (local vs. cloud by sensitivity), the too-little and too-much failure modes, the human override rate as the metric, the three 2026 changes (frontier won't sit still, models ship with routers inside, no single model wins everything). CTA: "Chapter 2 of Part III in the repo."

8. **"Human 2.0: What Must Stay Human"** — Final chapter expansion. Outline: the opening scene (a decision the lab was not allowed to make), the six delegable/ non-delegable categories, the fork analogy (from the PocketOS alignment chapter), the programmer-moves-up-the-stack argument, the pipeline question, the operator rule (delegate execution; keep judgment, consent, and consequences human), the measurable test. CTA: "Chapter 6 of Part III in the repo."

**Repurposing to HN/Reddit:** Each blog essay can be condensed to an HN Show HN or a Reddit post with a different title. The redistribution rule: the blog is the canonical longform. HN/Reddit posts are the scene + mechanism + operator rule, with the blog as the "full argument" link at the end.

---

## 6. VIRALITY LOOPS — 3 Repeatable Series

**Series 1 — "One sentence from the lab, a day"**
- Format: Daily X/Threads post, Layout A image, one sentence from the manuscript (use the 40-line snippet bank, rotate). No commentary required — the sentence + image is the post.
- Why it works: predictable, collectible, screenshot-friendly. Each post is a standalone piece of evidence. Readers who follow the series accumulate a read of the book's voice without reading the book.
- Cadence: Daily, 30 days minimum. After 30 days, continue as a recurring series — the backlog is deep enough (20 chapters × multiple lines each) to run for months.
- Engagement hook: "Want the chapter a line came from? It's in the repo. murderszn/multi-agent-apps" — in the alt text or a reply, not in the post body.

**Series 2 — "The rejected diff of the week"**
- Format: Weekly X/Threads post (Friday), Layout B image (receipt style). Show a real diff, a real failure, a real correction from the lab or from the manuscript drafting process. The draft that had three problems and got revised. The JOB-98 card. The chapter that used the archived outline by accident and had to be rewritten against the canonical queue.
- Source material: the manuscript's failure sections (every chapter has one), the editorial guidance's "revise these drafts" section, the first-try problem chapter.
- Why it works: it's the anti-highlight-reel. Most AI content is "look what my agent did." This series is "look what my agent got wrong and how I caught it." That's the book's entire voice. It's also the most screenshot-worthy format because the diff/receipt is concrete.
- Reader remix contest: "Post your own rejected diff — an agent output that looked right and wasn't. Tag it #Human20RejectedDiff. Best one each month gets a signed copy / a named mention in the book's acknowledgments / a pull request credit in the repo." Define "best" as: most instructive failure, clearest human catch, most useful lesson for other operators. No fabricated diffs.

**Series 3 — "What I refused to file"**
- Format: Biweekly X/Threads post (Wed), Layout C image (the scene). The grant refusal is the opening scene: "A grant application I chose not to file because the eligibility gate wasn't met. The folder stayed closed. That's a real decision an agent was not allowed to make." Continue with other decisions the lab was not allowed to make — the merge step in the PR workflow, the salary floor override, the CAPTCHA held for manual action, the unreviewed claim that got cut.
- Why it works: it enacts the book's final argument (what must stay human) in a recurring format. Each post is a small proof of the operator rule. It's also the most under-explored angle in AI content — everyone shows what the agent did. Almost nobody shows what they refused to let it do.
- CTA: "Chapter 6 of Part III — What Must Stay Human. The full argument in the repo."

**Reader remix contest details:**
- Name: #Human20Lab
- Ask: "Run one agent workflow this week. Record one failure your human caught. Post it. Tag #Human20Lab."
- Prize: monthly winner gets a named mention in the book's acknowledgments and a credit in the repo's contributor list. No monetary prize — keep it in the ecosystem's currency (credit, reputation, access).
- Judges: you + one other operator you nominate publicly. Publish the criteria: most instructive failure, clearest human catch, most actionable lesson.
- Promotion: announce the contest in the Day 28 thread and in Blog #6. Pin the contest rules to the repo README.

---

## 7. CHECKLIST — Cadence, Tools, Metrics, Kill vs. Double-Down

### Cadence summary

| Platform | Frequency | Format | Owned by |
|---|---|---|---|
| X/Twitter | Daily | Single image post or thread (1–2x/week) | Author |
| Instagram | Daily (or 5x/week) | Carousel 1x/week, single image rest | Author / designer |
| Threads | Daily | Mirror X or native text | Author |
| Blog (repo) | 2x/week (Mon/Thu) | Longform essay | Author |
| Hacker News | 3x/30 days | Show HN drafts (see Section 5) | Author |
| Reddit | 5x/30 days (1x/week) | Sub-specific posts (see Section 5) | Author |
| Series 1 | Daily | Snippet + Layout A | Author |
| Series 2 | Weekly (Fri) | Rejected diff + Layout B | Author |
| Series 3 | Biweekly (Wed) | Refusal scene + Layout C | Author |

### Tools

- **Image generation:** Midjourney (backgrounds) + Canva/Figma (overlay typography). Layout templates in Figma for speed — create one master file with the three layouts as artboards, swap text and MJ background per post.
- **Typography:** Space Grotesk + JetBrains Mono (both Google Fonts, free, no license issues for marketing).
- **Scheduling:** Whatever you use for X. Don't over-engineer — daily posts, batch 7 at a time on Sunday for the week ahead.
- **Repo integration:** Every blog post lives in the repo (e.g., `blog/` folder or a `/human20/blog` path). HN/Reddit posts link back to it. The blog is the canonical longform; everything else is a slice.
- **Image archive:** Keep every Layout A/B/C image in a folder with the post copy. When a post performs well, you have the assets to repost in 60–90 days with a new angle.

### Metrics — what to track

| Metric | Platform | Why it matters | Target after week 2 |
|---|---|---|---|
| Saves (IG) | Instagram | Signal of collectibility — people saving for later is higher-intent than likes | Top 10% of your posts by saves = double-down |
| Shares (X/Threads) | X, Threads | Virality currency — a share is a screenshot given to someone else | Any post with >50 shares = study the format |
| Engagement rate (X) | X | Replies > likes for this content. Replies mean someone engaged with the argument | Posts with >3 substantive replies = direction is right |
| HN rank | HN | Top 5 = major spike. Top 20 = solid. Below 20 = fine, it's a long game | Any post reaching #3 = re-examine the angle for a second submission |
| Reddit upvotes | Reddit | >100 on a non-promo post = the angle landed. <20 = either wrong sub or wrong angle | >100 upvotes = expand that angle into a blog post |
| Email adds from CTA | All | The conversion metric. Track per platform if you can | Whatever the week 1–2 baseline is, that's your before-state. Don't claim an upgrade without it. |
| GitHub stars | GitHub | Correlation with HN/Reddit spikes. Not a primary goal but a lagging indicator | Track daily during launch week. A 50-star day from one HN post = the repo is the product. |

### What to kill after week 2

- **Any platform that produced zero saves/shares/comments after 10 posts.** Not "zero likes" — likes are cheap. Zero saves, zero shares, zero replies = the format or the platform is wrong. Kill it for 30 days, then retry with a different format.
- **Any single image post that consistently gets <50 impressions after 5 posts in the same format.** The Layout A/B/C system should produce consistent results. If one layout is flat, test the other two before killing the platform.
- **Any blog post that gets no HN/Reddit pickup and <50 views after 7 days.** The essay may be too long or the scene too weak. Cut the weakest paragraph and resubmit the scene as a standalone X post.
- **The Reddit sub that mods removed your post or the community responded hostilely.** Not a failure — information. The angle or the framing was off for that sub. Write down what the response was and don't repeat the same angle.

### What to double-down on after week 2

- **The receipt format (Layout B).** If JOB-98, the Indeed wall, or the Five9 confirmation card gets saves/shares above your average, the receipt format is your visual signature. Produce more receipt cards from the manuscript's ledger material.
- **The "failure scene" posts.** If posts that open on a failure (the board lie, the dead applications, the 2 a.m. pile, the grant folder) outperform posts that open on a principle, the book's voice is the audience's draw. Continue opening with scenes, not arguments.
- **Any HN post that reaches the front page or top 5.** HN is the highest-signal platform in this audience. A top-5 HN post is worth 10x a high-performing Reddit post for this book. If one lands, have the next HN draft ready to go within 72 hours.
- **The quote-post flywheel.** If quote-posting other people's agent-failure stories consistently gets engagement, the operator-voice-as-reaction format is a growth loop. Keep a running list of quotable agent-failure posts in your niche and react within 24 hours.
- **Any snippet that gets shared without being quoted.** If a X post with just a Layout A image and no commentary gets shared, the line is a standalone asset. Put it at the top of the next carousel.

---

## CLAIM-LEDGER FLAGS FOR MARKETING (resolve before publishing)

| Claim | Status | Action |
|---|---|---|
| "Opus 4.5 was my personal threshold" | Personal claim, not a universal fact. OK in first-person marketing copy. | Frame as "my threshold," not "the threshold." |
| "Stripe acquired OpenRouter for $7.5–8B, August 2026" | Ecosystem-reported in manuscript ledger. | Use "reportedly" — do not state as confirmed. Flag if a journalist asks for the primary source. |
| "5,600 vibe-coded apps scanned, 2,000+ bugs, 400+ secrets, 175 data leaks" | Attributed in manuscript to Escape.tech via Botmonster Tech. | OK to use in marketing with attribution. "A security team scanned 5,600 vibe-coded applications..." |
| "92% of U.S. developers use AI coding tools daily; 42% of code is AI-generated" | Second-hand in manuscript ledger (Sonar via Botmonster Tech). | Flag. Do not use as a definitive fact in marketing copy without verifying Sonar's primary report. |
| "$50k grant that stayed in the folder, Sept 20–21 2026" | Real scene per the manuscript, but the dollar amount and specific date may need a primary source. | Use "a grant application I chose not to file" without the dollar amount unless you have the primary source. If you have it, add it with the source. |
| "The manuscript is ~56k words, 20 chapters" | From the book context in the brief. | Verify against the actual manuscript word count before publishing as fact. |
| "Six-agent lab" | Real per the manuscript. | OK. Name the six if specific: Nora (voice assistant), book worker, Instinct, desktop-josh, OpenRouter routing layer, and the sixth is [confirm — the manuscript mentions Muse and Instinct as the two main systems; the exact count of six needs verification against the repo]. |

---

*Human 2.0 marketing strategy — v1. Written from the manuscript in `murderszn/multi-agent-apps/writings/`. Every line cited to a chapter file. No invented outcomes. Flag anything that needs a primary source before publishing.*
