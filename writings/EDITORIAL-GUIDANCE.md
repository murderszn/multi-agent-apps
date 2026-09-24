# Editorial guidance

This is the current review of the Human 2.0 manuscript. Writing agents should follow it. The 41-chapter outline under `writings/archive/41-chapter-outline/` is source material, not a drafting queue. The empty `book/` folder on any local machine is not part of this repository's book.

The book is a field manual for someone meeting AI and the tools around it. The lab is the proof. Mechanism shows up when it explains a failure the reader has already felt.

## Canonical book

Twenty chapters. Do not add a twenty-first. Do not revive an archived chapter as its own file.

### Part I — Crash course

Only the mechanics needed to operate agents. Six chapters.

| File | State | Home issue |
| --- | --- | --- |
| `part-01-crash-course/01-models.md` | Outline. Still needs a draft. | #43 was closed while the file was still a template. Draft from the new issue, not from #43. |
| `part-01-crash-course/02-context-retrieval-memory.md` | Draft | #44 |
| `part-01-crash-course/03-tools-agents.md` | Draft. Keep this voice. | #45 |
| `part-01-crash-course/04-coordination-verification.md` | Draft | #46 |
| `part-01-crash-course/05-hardware-economics.md` | Draft. Ledger pass, then a short LoRA section. | #47 |
| `part-01-crash-course/06-alignment-programmers.md` | Draft | #48 |

### Part II — Human 2.0 in the wild

Eight chapters. The folder currently has ten files. These two are not canonical and should move into the archive:

- `part-02-field-essays/07-vibe-coded-security.md` is an early short draft. The chapter is `06-security-build-public.md`.
- `part-02-field-essays/09-build-in-public.md` is an early short draft. Build-in-public is already inside `06-security-build-public.md`.

The eight that stay:

| File | State | Home issue |
| --- | --- | --- |
| `part-02-field-essays/01-vibe-coding.md` | Draft. Needs a real diff and first person. | #49 |
| `part-02-field-essays/02-small-factory.md` | Draft. Strong. Ledger pass. | #50 |
| `part-02-field-essays/03-claude-dreams-codex-ships.md` | Draft | #51 |
| `part-02-field-essays/04-muse-instinct.md` | Draft | #52 |
| `part-02-field-essays/05-job-search.md` | Draft. Ethics are right. The week is missing. | #53 |
| `part-02-field-essays/06-security-build-public.md` | Draft. Strong. Ledger pass. | #54 |
| `part-02-field-essays/08-office-is-a-swarm.md` | Draft. Stop re-introducing the lab. Renumber after the stale files move. | #55 |
| `part-02-field-essays/08-first-try.md` | Draft. Renumber so it does not share `08` with the office chapter. | #56 |

### Part III — Running the day

Six chapters. Direct, route, execute, verify, learn, then what stays human.

| File | State | Home issue |
| --- | --- | --- |
| `part-03-running-the-day/01-baseline.md` | Draft | #57. This file is the only canonical owner of #57. |
| `part-03-running-the-day/02-direct-route.md` | Draft. Keep this voice. | #58 |
| `part-03-running-the-day/03-execute.md` | Draft | #59 |
| `part-03-running-the-day/04-verify-review.md` | Outline | #60 |
| `part-03-running-the-day/05-learn-measure-adopt.md` | Outline | #61 |
| `part-03-running-the-day/06-human-2-0.md` | Outline | #62 |

`writings/README.md` still says 18 chapters. The architecture file says 20. Twenty is right.

## What is already working

Do not flatten these back into a survey or a white paper.

- The tools chapter opens on the Indeed wall and then explains the mechanism: the model proposes, the software disposes.
- The factory chapter has a morning, named machines, and a real miss: five queued applications, zero submissions.
- The security chapter has the 2 a.m. pile, Cerberus as a conversation, and a five-point test before customer data.
- The job-search chapter refuses to invent an offer. Keep that refusal.
- The baseline chapter makes "faster" mean faster than a recorded Human 1.0 chain.
- Direct and Route is in the first person and starts from the chores, not from a definition.

## Rules for every chapter

- Write "I." Use "the operator" only inside a rule the reader is supposed to apply to themselves.
- Open on a scene that happened. If the repo does not contain the artifact, say so. Do not invent a personal outcome, a price, a date, or a product behavior.
- Reader-facing headings are sentences a person would follow. "Editorial hook," "Chapter promise," "The skeptical reader," the QA checklist, and the evidence ledger stay at the back of the file. They are how a chapter is produced. They are not the chapter.
- One operator rule. One measurable test. One place the agents failed and how the human caught it.
- Six hosts are a proof case, not a shopping list.
- Do not teach the lab again. The factory chapter introduces the machines. Later chapters assume that introduction and add one new consequence.
- A number the reader will remember needs a primary source the drafter actually opened. A secondary blog, a search-result summary, or a note that the PDF was not re-read is not enough for that number. Quiet the sentence or replace the source.
- Do not draft `writings/archive/` or a root `book/` folder.

## Draft these next

In this order.

1. **Models Represent and Predict.** `01-models.md` is the hole in Part I. Chapters 2 through 6 assume the reader already knows what a model is. Cluster tokens, embeddings, attention, next-token prediction, temperature, and hallucination into this one chapter. Do not restore the five archived chapters those topics used to have. Open on a confident wrong answer from the lab, then the mechanism. The smallest complete explanation that lets the reader make a better decision is already the operator rule in the template. Fill the scene. Target 2,500–4,000 words.

2. **Verify and Review.** `#60`. Open on a real rejected diff or a week of rubber-stamping. The security chapter already names rubber-stamping. Point at that loop. Show the human decision. Do not retell Cerberus. The rule is already in the file: a finished-looking answer is not a finished outcome.

3. **Learn, Measure, and Adopt Carefully.** `#61`. The chapter is the adoption path: one agent, one recurring workflow, one verifier, and scale only on evidence. Use the baseline chapter as the before. Do not claim a speedup without a recorded before. The rule is already in the file.

4. **What Must Stay Human.** `#62`. Responsibility, taste, consent, priorities, relationships, consequences. This is where "someone has to own the outcome" lives. Open with a decision the lab was not allowed to make. The rule is already in the file: delegate execution, and keep judgment, consent, and consequences human.

## Revise these drafts

- **Job search.** Keep the gate: the agent may widen the search and prepare the work, and the human owns truth, fit, privacy, and submission. Replace "the operator" and "consider a search" with the week already recorded elsewhere. The Indeed wall is in `03-tools-agents.md`. The five dead cards are in `02-small-factory.md`. Do not invent an offer, an interview count, or a conversion rate. The ledger already says the offer is not evidence we are allowed to fabricate.
- **Vibe coding.** The title is a provocation. The chapter's own argument is that vibe is the first pass and review is the last pass. Keep that tension. The afternoon in the opening is right, and the internal-tool example is hypothetical. Put a real diff on the page. Write it as "I."
- **Security and the factory.** The scenes can stay. Promote load-bearing numbers to primary sources, or say them more quietly. That includes the scan of 5,600 apps, the Sonar density figures, the Moltbook leak, and the Stripe/OpenRouter valuation. The ledger already admits several of these were not re-read at the source.
- **Office chapter.** Its job is the boundary: a desk, power, wi-fi, a private network, and what going to work means when the team is software. Cut the second tour of Nora, the four-hour book worker, and the machine list.

## One section, not a new chapter

Prompting, retrieval, and changing the model are a decision the book never quite makes. Fine-tuning, LoRA, and QLoRA appear only in the archived outline. Add a short plain-language section to the hardware chapter, or to the models chapter after that draft exists. The order is prompt, then examples, then retrieval, then a change to the model. The failure mode is fine-tuning to fix a problem that was actually missing context. The rule is: change the model last. Do not open a new chapter file for this.

## Explicitly out of the book

These were chapters. They are now a sentence inside a chapter that already exists. Do not draft them again.

- Big O, graphs, trees, and hash maps. The operator version is "more workers is not more progress," in Execute and in Coordination.
- A standalone concurrency, testing, and evals chapter. Execute, Coordination, and The First-Try Problem hold that material.
- A standalone git and technical-debt chapter. The repository-as-proof argument is in the vibe-coding chapter. Reviewing the change is Verify.
- KV cache as its own chapter. The price of fitting a model on a real machine is in the hardware chapter.
- A separate "build in public" chapter and a separate "vibe-coded apps get hacked" chapter. Both are inside Security, Cerberus, and Build in Public.
- A separate "someone has to own the outcome" chapter. That argument is Verify and What Must Stay Human.

## Definition of done for a writing agent

- The target file is one of the twenty canonical paths above, or a section inside one of them.
- The prose is first person, opens on a lived scene, and does not invent experience.
- Failure, 2026, the skeptical reader, the operator rule, the measurable test, and the evidence ledger are present. The first three of those can use reader-facing titles. The ledger and the QA checklist sit at the end.
- Load-bearing claims name a primary source and the date it was checked.
- Word count lands between 2,500 and 4,000 for a full chapter. A section inside an existing chapter stays short enough that the host chapter does not bloat past the top of that range without a reason recorded in the pull request.
- The pull request names the issue, the file, and which rule in this document it is carrying out.
