# Human 2.0 — Full Manuscript Review

Review date: 2026-09-25. Scope: all 20 canonical chapter drafts — 16 merged on
`main`, 4 read on their newest open-PR branches (I-01 via PR #95, III-04 via
PR #92, III-05 via PR #93, III-06 via PR #94). Nothing was changed; this is
findings and a fix list.

## The verdict in one page

The manuscript is a complete 20-chapter draft set and each of the three parts
reads as a designed arc. It is **not yet one book**. Right now it reads as two
books interleaved — a first-person field manual (the chapters that work) and a
third-person operator's manual (the chapters that need a voice pass) — with
production scaffolding still printed inside several chapters, one assigned theme
with no home on the page, and a claim ledger that still has secondary sources
holding up load-bearing numbers.

Total prose: **~56,000 words across 20 chapters** (average ~2,800 per chapter).
*Sapiens* is roughly 100,000. At the current length this is a tight field
manual, not a Sapiens-scale book. Either more chapters, longer chapters, or an
explicit decision that the shorter book is the product.

### What is genuinely working

- **Each part's arc earns itself.** Part I moves guess → evidence → action →
  coordination → cost → the human keeps consequences. Part III runs a usable
  operating loop (baseline → direct/route → execute → verify → learn →
  what-stays-human) with later chapters genuinely assuming earlier ones. Part
  II's order (tool → system → model choice → remote use → applied case →
  safety → where work lives → meta lesson) is sound in outline.
- **Part III chapter 6 is the book's best landing.** It names all six
  non-delegables (judgment, consent, taste, priorities, relationships,
  consequences — responsibility handled head-on in the preceding section),
  recaps the loop in five sentences before drawing the stop line, and closes by
  returning to its opening image (the unfiled grant draft).
- **Part I chapter 4 ("claims into receipts")** is the book's central mechanic
  at its most developed — JOB-98, the gate stack, the Slalom override, the
  weekly delta audit. This is the vocabulary the whole book should converge on.
- **Part I chapter 3's voice** ("Keep this voice," per the guidance) and
  **Part II chapters 02 and 06** (small factory, security) are the
  first-person, lived, concrete standard the rest should be revised toward.
- The commodity theme is handled *exactly right* in Part I chapter 1 (named,
  pointed at, not retold) — the pattern to protect everywhere else.

## Cross-cutting findings

### 1. Two authors, one manuscript (voice)

The guidance's first rule is "Write 'I.'" Large stretches of the manuscript
don't:

- Part I: ch2 is third-person throughout ("the worker," "the chapter worker")
  and opens on its own drafting process; ch5 drifts into second-person
  how-to imperatives ("Start with a workload, not a model name").
- Part II: 01 ("the operator" ×29), 03 (I=1), 05 ("the operator" ×36),
  08-first-try (I=1) are third-person; 04 and 08-office drift between the two.
  Only 02 and 06 are consistently first person.
- Part III: ch1, ch3, ch4 are formal operating-manual voice ("The operator
  remembers…", "Parallelism reduces waiting") while ch2, ch5, ch6 are
  first-person "I" with dry humor.

Fix: one voice-normalization pass toward first person "I," using "the operator"
only inside rules the reader applies to themselves. Rewrite, don't discard —
the technical content underneath is strong everywhere.

### 2. Production scaffolding is printed in the reading body

Template headings the guidance says are "how a chapter is produced, not the
chapter" appear as live headings: "Editorial hook," "Chapter promise," "Core
argument" in II-03, II-05, II-08, II-08-first-try; "Editorial hook" / "Chapter
promise" / "What this chapter is for" in III-01, III-03, III-04. Status
blockquotes (Status / Part / Issue / Target length) sit atop several chapters.
QA checklists trail I-02, I-05, I-06, III-01, III-03, III-04, III-05 — while
I-01, I-03, I-04, III-02, III-06 ship without them. "Notes" vs "Evidence ledger"
naming differs file to file. II-08-first-try carries a full "Concepts and
terms" glossary block in the printed chapter.

Fix: pick one print-path standard (title, dek, prose, Notes at the back) and
apply it to all 20 files. Scaffolding moves to the back of the file or the
GitHub issue.

### 3. The commodity theme has no home (#90)

"Commodity" appears in **zero** of Part II's eight chapters. "Opus" and
"harness" also appear zero times. The assigned home — Part II ch03
(`03-claude-dreams-codex-ships.md`) — is currently a handoff/specialization
essay with no Opus 4.5 threshold scene, no two races, no open weights, and no
"push the harness, not the leaderboard" operator rule. This is the single
largest content gap in the manuscript. When ch03 gets the theme, coordinate
with Part I ch05's assigned short two-races section so the two tellings don't
duplicate (ch03 owns the author's position and the operator rule; Part I owns
the short hardware-angle section).

### 4. One verification concept, four names

Ch04's "claims into receipts" ("a claim with a receipt is work… the receipt
comes from outside the agent's own mouth") is the most developed phrasing.
Part I ch1 says "show me the artifact"; Part I ch5 and ch6 say "external
receipt(s)". Converge on one shared vocabulary across the book. Related: I-04's
"Prompts are wishes. Hooks are law." and I-06's "instructions are not walls"
are the same lesson stated twice — keep ch4's operational framing, make ch6's
a one-line pointer.

### 5. Contradictions to resolve

1. **Autonomous filing vs. the human gate.** II-02's "Why this matters in 2026"
   lists "a job-search agent that files applications overnight"; II-06's ledger
   says "agents file job applications in his name." II-05's operator rule is
   "Keep the human gate on truth, fit, privacy, **and submission**." The
   accurate statement (human-approved batches) must replace the loose one in
   02 and 06, or the book contradicts its own core rule.
2. **II-06's operator rule vs. its own example.** "Production data is never
   touched by an agent" — but the same chapter says his agents file job
   applications in his name, "which means they hold my resume, my contact
   details, and logins to my accounts." Scope the rule to production customer
   data / databases (the Cerberus context) or the example breaks it.
3. **The cast is never introduced.** II-04 is titled "Muse, Instinct, and the
   Remote Agent Wars" but never says what Muse is — no line stating it is the
   author's personal agent, where it runs, or what it can do. "Instinct"
   appears in the title and then nowhere in the body. II-06's ledger asserts "a
   six-agent lab (Muse and Instinct as the two main systems)" with no
   establishing scene. Agent-count drift across the part (Nora + book worker +
   Instinct in 02 vs. six-agent lab in 06) is never reconciled. Fix: establish
   the roster once (II-02 is the natural home), point back thereafter.
4. **Model-timeline check.** I-06 names "Claude Opus 4.6" (PocketOS incident);
   the commodity-theme guidance establishes "Anthropic's Opus 4.5 was the
   personal threshold." Different claims, but they must read as one timeline
   side by side.

### 6. Claim ledger — promote or quiet (issue #85 territory)

A number the reader will remember needs a primary source the drafter actually
opened. Outstanding:

- **Most urgent: III-06's UK AISI incident report.** The prose says the UK AI
  Safety Institute published an incident report; the Notes link is a LinkedIn
  Pulse post, not the AISI publication. The fake-identities detail needs the
  primary or it doesn't ship.
- **III-05's "MIT NANDA 95%."** Honestly flagged in-text as unopened — either
  open the primary PDF and confirm, or drop the precision.
- **I-04's five statistics** all rest on secondary note-pages: MAST / 1,600+
  traces (awesome-evals notes, not the paper), the 37%/21% splits (a GitHub
  research-notes page, not Cemri et al.), the 95% pilot failure (a Towards AI
  blog, not the MIT report), the 15× token-cost claim (a mentorship-notes
  page), the off-script-agents catalog (LinkedIn Pulse). I-05's ledger (Nvidia,
  AWS, Google Cloud docs, all dated) shows the achievable standard.
- **I-03's MCP ecosystem numbers** (97M downloads, 9,400+ servers, ~75% of
  enterprise AI teams, Gartner 40%) are presented flat in prose while the
  chapter's own Notes flag them as ecosystem/vendor-reported. The caveats must
  move into the body.
- **II-06's statistics paragraph** (5,600-app scan, Sonar density figures,
  Moltbook, "Additionally" bypass) is all second-hand via Botmonster; "three
  major labs escaped test environments" has **no ledger entry at all**.
- **II-02's Stripe/OpenRouter $7.5–8B** is sourced to a Medium post and the
  Aethir blog — "reportedly" is doing heavy lifting.
- **I-06's Stanford AI Index 2026 employment figures** — the ledger admits the
  primary wasn't verified this run; these are exactly the kind of numbers a
  reader will remember, so they need the re-verification pass or quieter
  phrasing.

### 7. Missing per guidance (not reviewer inventions)

- I-05 still needs its two assigned sections: the short LoRA / "change the
  model last" decision section and the short two-races section.
- II-01 still has no real diff and a hypothetical working example (#84
  unaddressed — the ledger admits the example is "a proposed proof case").
- II-05 still has no real week on the page (#83 unaddressed — "Consider a
  search built from a one-page brief" instead of the recorded week). Keep the
  "refuses to invent an offer" stance; add the real material.
- II-08 still re-tours the lab (#86 unaddressed — the four-hour book worker
  walkthrough, the five lanes, and the same two failures already told in
  II-02).
- III-02's "one place the agents failed and how the human caught it" is a
  design (the duplicate-check rule), not a lived failure; its failure modes
  lack the detect/respond structure the other chapters use.

### 8. Duplicated explanations to consolidate into pointers

- The four-hour book worker is explained in full in II-02 and re-told in
  II-08 (same walkthrough, same two failures). Cut II-08's version to a
  pointer; keep only II-08's new consequence (the desk-as-controller boundary).
- The handoff argument is the core of II-03 ("The handoff is the product")
  and II-08-first-try ("make the target legible"). One is the home; the other
  points.
- The manuscript-pipeline working example appears five-plus times across
  Part II (02, 03, 04, 06, 08, 08-first-try). III-03 and III-04 also open on
  the same device (drafting their own chapter) in adjacent chapters — III-04's
  "finished-looking branch" is the stronger scene; give III-03 a different
  proof case.
- Intervention rate is defined three times with no cross-references (III-02,
  III-05, III-06). Make III-05's five-instruments section canonical; the
  others point.
- Rubber-stamping is fully explained in III-04 and re-explained in III-05;
  Anthropic's "simplest solution" maxim is quoted in III-02 and re-quoted in
  III-05; "the machine proposes, the human disposes" appears 3+ times in
  III-05/06. Convert to cross-references.
- I-05 re-derives I-01's next-token loop (~90 redundant words); II-05 should
  point to I-03's Indeed wall rather than staying hypothetical; I-01's closing
  forward pointer aims at the wrong chapter (the Novartis board-check is a
  tool/verification action — point to I-03, not I-02).

### 9. Filing / structure

- The Part II folder holds ten files for eight canonical chapters:
  `07-vibe-coded-security.md` and `09-build-in-public.md` are early drafts
  slated for the archive, and two files share the `08-` prefix
  (`08-office-is-a-swarm.md`, `08-first-try.md`). Housekeeping (#87) goes
  first so later edits hit the right files.
- I-01's branch draft (via #82, PR #95) is pass-grade — the editorial
  guidance's Part I table still calling it "Outline. Still needs a draft" is
  stale.
- III-04's branch name in its own opening scene (`chapter/60-verify-review`)
  doesn't match the repo's `book/<part>/<issue>-<slug>` convention — align it
  in print.
- I-01/I-03 use decaying relative dates ("Earlier this week," "a few weeks
  ago" for events ~3 days before drafting). Use absolute dates (I-06's pattern).
- III-01 (2,380) and III-03 (2,466) sit just under the 2,500-word floor;
  II-03 (2,468) too — all fixable by one paragraph each, or by floor
  exceptions. Also check I-06's "Claude Opus 4.6" naming against II-03's
  Opus-4.5 timeline (finding 5.4).
- **Verify JOB-98** (I-04's opening incident) against the actual Linear board
  before print — it doesn't appear in the recorded memory; the Slalom, Five9,
  and Pfizer episodes in the same chapter are all verifiable.
- AI-tell check: no "delve," "tapestry," "leverage," "seamless" anywhere.
  The contrastive-negation construction ("It is not X. It is Y.") is a tic in
  II-01/03/04/05 (9–12 instances each) and should be thinned; II-02/06 absorb
  it with concrete scene. I-08-first-try's "invented lived scene" failure mode
  is uncomfortably self-referential given II-01's and II-05's hypothetical
  scenes — worth a wry acknowledgment or a cut.

## Ranked fix list

1. **Voice pass** — first-person "I" across I-02, I-05, II-01, II-03, II-04,
   II-05, II-08-first-try, III-01, III-03, III-04; thin the contrastive-negation
   tic in II-01/03/04/05. (Biggest single read-ability lever.)
2. **Scaffolding out of the print path** — one file-anatomy standard, applied
   to all 20: strip template headings, status blockquotes, QA checklists from
   the reading body; Notes/ledgers at the back.
3. **Write the commodity theme into its home** — revise II-03 per #90 (Opus 4.5
   scene, two races, open weights, "push the harness, not the leaderboard"),
   and add I-05's two missing short sections (LoRA / two races) without
   double-telling. Related housekeeping: #87 first.
4. **Claim-ledger pass** — the promote-or-quiet list in finding 6, with the
   III-06 AISI primary first and the "three major labs" claim sourced or cut.
5. **Resolve the contradictions** — finding 5: the submission gate (02/06
   vs 05), the production-data rule (II-06), the cast introduction (Muse,
   Instinct, six-agent lab, roster in II-02), the model timeline (I-06 vs
   II-03).
6. **Real material for the placeholders** — II-01's diff (#84), II-05's week
   (#83), III-02's lived failure, II-04's return-visit proof case.
7. **Consolidate duplicates into pointers** — finding 8: book-worker ×2,
   handoff ×2, pipeline-as-example ×5, intervention rate ×3, rubber-stamping
   ×2, Anthropic maxim ×2, propose/dispose refrain, next-token re-derivation.
8. **Housekeeping** — archive the two stale Part II files, renumber the
   shared `08-` prefix, fix III-04's branch name, absolute dates everywhere,
   the three sub-floor chapters over 2,500 words, and update the editorial
   guidance's Part I table (I-01 is drafted).
9. **Pre-print verification** — JOB-98 against the Linear board; the Stanford
   AI Index numbers against the primary; AISI report against the primary.
10. **Length decision** — ~56k words vs. the ~100k Sapiens target. The fixes
    above add some words but not 40k. Decide: a tighter book, or an expansion
    plan.

## Notes on method

Three reviewer passes (one per part) read every chapter in full against
`EDITORIAL-GUIDANCE.md`. Detailed per-chapter notes — word counts, DoD tables,
claim-by-claim ledger notes, and exact pointer edits — are in the goal's
working state
(`~/workspace/goals/human-2-0-book-41-chapter-draft-cycle/hidden_files/manuscript-review/part-0{1,2,3}-review.md`).
Open editorial issues already on the board: #83 (job-search week), #84 (vibe
coding diff), #85 (primary sources), #86 (office assumes factory), #87 (Part II
housekeeping), #88 (LoRA section), #90 (commodity theme). All of them survived
this review — none is addressed yet.
