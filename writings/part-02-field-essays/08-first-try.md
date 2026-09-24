# The First-Try Problem

> **Status:** Draft for publisher review
> **Part:** part-02-field-essays
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/56
> **Target length:** 2,500–4,000 words

## Opening scene

The first attempt looked like progress.

An issue said what the chapter needed. The repository had a place for it. The branch existed. The agent had enough context to begin. The obvious move was to generate the chapter, scan it for obvious mistakes, and call the work done.

That is the trap.

The first attempt is often the most dangerous version of the work because it is coherent enough to create relief. It has headings. It has sentences that sound like the right sentences. It may even contain a conclusion. The artifact gives the operator the feeling that the hard part is over before the operator has checked whether the artifact answers the actual question.

This chapter began with a small proof of that problem. The repository's canonical issue for this chapter did not point to a blank page. It pointed to an archived outline. The current queue had moved on from the old 41-chapter structure, but the matching file named in the new issue did not yet exist in the canonical directory. The issue was current; the template was historical. The first response to that mismatch could have been to draft into the old file and preserve the old shape by accident.

Instead, the mismatch became the work. Inspect the issue. Inspect the architecture. Pull the current branch. Compare the archive with the new book rules. Find the gap. Only then write.

That sequence is less dramatic than “the agent wrote a chapter.” It is also closer to what reliable work looks like. The first try is not the deliverable. It is a probe. It tells us what the system understood, what it missed, and what the human must decide before another attempt.

## Chapter promise

By the end of this chapter, you should understand why a fluent first attempt is not evidence of a correct attempt; how to turn retries from vague regeneration into controlled learning; how to inspect the inputs, output, and failure boundary of an agent workflow; and how to decide when another attempt is useful rather than merely comforting.

The core argument is simple: **do not ask whether the agent got it right on the first try. Ask whether the workflow makes the first try cheap to inspect, safe to reject, and informative enough to improve.**

## Core argument

### Fluency hides the first failure

A language model is optimized to produce a plausible continuation. An agent wrapped around a language model can also read files, call tools, edit a branch, and report completion. None of that changes the basic operational fact: a polished output can be wrong in ways that are difficult to notice from the output alone.

The failure is not always a hallucinated fact. It can be a wrong target, a missing constraint, a stale template, an untested assumption, or an answer that satisfies the words of the request while missing its purpose.

In this book repository, the relevant constraints were not all in one place. The issue specified the canonical chapter, its location, and a target length. The architecture document said the book had been tightened into three parts and that every chapter should end with an operator rule and measurable test. The guide required current research, a claim ledger, failure reporting, and no invented personal experience. The archived outline supplied useful editorial prompts but belonged to the old structure.

A first try that read only the archived outline could be fluent and still be wrong. A first try that read only the issue could satisfy the local checklist while missing the manuscript arc. A first try that searched the web could cite current material while writing in a voice or structure the book had rejected.

The first failure, then, is often an information-architecture failure. The agent does not know which instruction outranks which other instruction. It does not know which file is canonical. It cannot infer lived evidence that was never supplied. It may not know whether a number is a measured result, a vendor claim, or an illustrative example.

The human's first job is not to praise or punish the prose. It is to make the target legible.

### A retry is not a method

Many workflows treat regeneration as quality control. The operator reads an answer, dislikes a paragraph, and asks for a better version. The model produces another answer. The operator compares the two by feel. If the second sounds more confident, it wins.

That is not iteration. It is aesthetic drift.

A useful retry changes one of four things:

1. **The input:** add the missing file, source, example, or definition.
2. **The constraint:** state the required structure, boundary, audience, or acceptance test.
3. **The procedure:** change the order of research, drafting, execution, and review.
4. **The evaluator:** introduce a check that can reject the output for a reason other than “I do not like it.”

If none of those changes, the second attempt is mostly another sample from the same uncertainty. It may be better. It may be worse. The operator has learned little either way.

This is why “try again” is a weak instruction. “Try again, using the canonical architecture rather than the archived outline; cite each technical claim; label repository evidence separately from personal evidence; and end with a measurable test” is a method. It changes the conditions under which the output is made and the standard by which it will be judged.

### The first attempt should be designed to fail visibly

A good workflow does not try to eliminate every early failure. It makes failures small and observable.

For writing, that means drafting on a branch, preserving the source files, keeping an evidence ledger, and using headings that expose missing sections. For code, it means a failing test, a small diff, and a command that can be rerun. For research, it means recording the source, claim, date checked, and the distinction between a primary result and public discussion.

Visibility matters because an agent's own completion statement is not an independent verifier. “Done” means the agent reached the end of its procedure. It does not mean the artifact meets the human's purpose.

The repository made that visible in a mundane way. The expected file was absent from the current canonical tree. The archive contained the older outline and several older drafts. GitHub contained the current issue queue. Those facts were not interchangeable. The missing file was a signal to inspect, not permission to invent a history for the chapter.

The operator should want the first try to answer questions such as:

- Did the agent use the current target or a stale one?
- Which sources shaped the claim?
- Which requirements are satisfied by an artifact, and which are only asserted?
- Where did the agent fail, stop, or substitute a generic example?
- What human decision remains open?

If the workflow cannot answer those questions, a longer output only increases the cost of review.

## Concepts and terms

### First try

The first try is the first complete attempt produced by a workflow under a stated set of inputs and constraints. It is not necessarily the first sentence or first tool call. The useful boundary is the point at which the system presents an artifact for human judgment.

### Verification

Verification asks whether the artifact matches an external requirement. Does the file exist at the required path? Does the test pass? Does the cited source support the sentence? Is the number traceable? Verification is narrower than approval and often more mechanical.

### Review

Review asks whether the artifact is worth accepting. A chapter can satisfy its headings and still be repetitive, timid, misleading, or badly placed in the book. Review requires judgment because the acceptance standard includes purpose, audience, taste, and consequences.

### Evaluation

An evaluation is a repeatable check against examples or criteria. It can be a test suite, a checklist, a word-count range, a claim ledger, a rubric, or a comparison against a known-good artifact. An evaluation is useful only if it can expose a meaningful difference between acceptable and unacceptable work.

### Grounding

Grounding is the discipline of tying a claim to an available source or artifact. A repository file, issue, command result, official documentation page, paper, or clearly attributed public discussion can ground a statement. Grounding does not make a claim automatically true. It makes the path to checking the claim visible.

## Working example: one chapter, four passes

The first pass was not “write 3,000 words.” It was reconnaissance.

**Pass one: establish the target.** The issue identified “The First-Try Problem” as the lowest-numbered open canonical chapter issue. Its definition of done required a lived scene or proof case, a 2,500–4,000-word draft, plain-language mechanics, a working example, failure analysis, a section titled “Why this matters in 2026,” a claim/evidence ledger, an operator rule, a measurable test, and QA. The architecture document added the larger manuscript rules: use the lab and lived result as the spine, distinguish the current 20-chapter queue from the archived 41-chapter outline, and do not invent experiences or outcomes.

**Pass two: locate the evidence.** The current canonical directory did not contain the named file. The archive did contain the older outline. That outline was useful for the editorial hook—“We have agents that apply to jobs and review repos. We still sit there regenerating answers”—but it was not the current template. The difference mattered. The current chapter needed to include the new manuscript's operator rule, measurable test, and evidence discipline. The archive could inform the subject; it could not silently define the book.

**Pass three: research the mechanism.** The public technical record supports a cautious version of the argument. Anthropic's “Building effective agents” material describes patterns for building reliable agents and distinguishes simpler workflows from more autonomous arrangements. OpenAI's evaluation documentation frames evals as a way to test and improve model outputs. The SWE-bench paper introduced a benchmark of 2,294 real-world software engineering problems drawn from 12 Python repositories. These sources support the need for evaluation and the difficulty of judging agentic work; they do not prove that one particular agent, model, or retry strategy will succeed in this repository.

That distinction is the whole point. A source can establish what a benchmark measured. It cannot establish what happened in our run unless our run produced the artifact and measurement.

**Pass four: draft and inspect.** The chapter was written on a branch. It names the repository discovery as repository evidence, not as Josh's personal memory. It does not claim that an agent completed a job application, fixed a bug, or improved a metric unless an artifact demonstrates that outcome. It makes the failure boundary explicit: an agent can follow a stale template with confidence; a human must resolve the conflict between local instructions and current architecture.

This is not a glamorous workflow. It is reproducible. Another operator can inspect the issue, the architecture file, the archive, the branch, and the sources. They can disagree with the argument without having to guess what happened.

## What can go wrong

- **Failure mode: the agent uses the nearest file rather than the canonical file.**
  - **Why it happens:** filenames are suggestive, archives look authoritative, and context windows reward whatever was included.
  - **How to detect it:** compare the path named by the issue with the tracked tree; check status markers, issue numbers, and architecture documents.
  - **How the human responds:** stop drafting, establish precedence, and record the mismatch as part of the evidence.

- **Failure mode: regeneration changes tone but not truth.**
  - **Why it happens:** the operator gives a stylistic instruction—“make it sharper”—when the real problem is missing evidence or a wrong target.
  - **How to detect it:** compare claims and sources, not adjectives. If the unsupported claim remains, the retry did not solve the problem.
  - **How the human responds:** change the input, constraint, procedure, or evaluator.

- **Failure mode: a benchmark becomes a promise.**
  - **Why it happens:** a published number is memorable, while its task definition and limitations are easy to omit.
  - **How to detect it:** ask what was measured, on which tasks, under what setup, and whether the claim is about the benchmark or the present workflow.
  - **How the human responds:** narrow the sentence and link the primary source.

- **Failure mode: the agent invents the missing lived scene.**
  - **Why it happens:** the requested voice implies a personal history, but the source material does not contain one.
  - **How to detect it:** flag first-person claims that have no supplied note, log, artifact, or clearly attributed source.
  - **How the human responds:** write from repository evidence, use a labeled proof case, or leave the personal claim out. A convincing fiction is still a false record.

- **Failure mode: completion is confused with acceptance.**
  - **Why it happens:** tool calls return success, a file appears, or a pull request opens.
  - **How to detect it:** run the checks and inspect the diff. Confirm the artifact is in the right place, the links work, and the issue checklist is actually satisfied.
  - **How the human responds:** reject the artifact without treating rejection as failure of the whole system. The rejection is the system doing its job.

## Why this matters in 2026

In 2026, generating a plausible first draft is ordinary. The scarce capability is deciding what deserves another attempt.

That changes the economics of work. If generation is cheap but review is expensive, the system should not maximize output volume. It should reduce the cost of discovering that an output is wrong. A ten-page artifact with no traceable claims can be more expensive than a one-page failed attempt that identifies the missing input.

It also changes the meaning of speed. Speed is not the time until the model stops typing. Speed is the time from request to a trustworthy decision. Sometimes the fastest path is to reject the first result immediately because it used the wrong source. Sometimes the fastest path is to let a small agent workflow produce a rough artifact and use that artifact to expose the missing requirements. The correct choice depends on the cost of inspection and the consequences of being wrong.

The pressure to regenerate will increase because the interface makes retrying frictionless. That convenience is useful for low-stakes drafting. It is dangerous for decisions, code, research, security, hiring, finance, and any work where a plausible error can travel farther than its correction.

The answer is not to stop using agents. It is to give every attempt a boundary: what it may change, what it must show, and what causes a human rejection.

## Counterargument / skeptical reader

A technically informed critic may say that this is over-process. If the model is improving quickly, perhaps the right answer is simply to use a stronger model and let it try again. Better models do matter. A system with better retrieval, tool use, and reasoning can reduce some classes of error.

But stronger generation does not remove the need to define the target. It may make wrong work more persuasive. It may also move the failure from obvious nonsense to a subtle unsupported claim, a security boundary nobody tested, or a requirement that was omitted because it was not in the prompt.

The critic may also say that not every task needs a ledger and a branch. Correct. The discipline should scale with consequence. A disposable paragraph does not need the same controls as a production migration or a manuscript claim. The principle is not “turn every thought into bureaucracy.” The principle is “make the cost of being wrong proportional to the harm.”

There is uncertainty here. We do not have a universal retry formula. We should not pretend that four passes always beat one. The measurable question is whether a stated workflow improves the rate at which the operator detects and corrects important errors before acceptance. That is an empirical question, not a slogan.

## Operator rule

**Treat the first try as a probe, not a verdict. Do not regenerate until you can name what changed.**

## Measurable test

For the next ten comparable tasks, record four things: the first-pass acceptance decision, the highest-severity defect found, the intervention that changed the next attempt, and the final acceptance decision. Count how many first attempts were rejected for a defect that the workflow could have exposed earlier, and how many retries changed the identified defect rather than only the style.

A useful workflow should make the defect visible sooner. If retries keep producing different prose with the same unsupported claim, the workflow is not learning. If the first pass is cheap to inspect and the second pass addresses a named failure, the workflow is improving even when the first pass is rejected.

## Evidence ledger

- **Claim:** The current canonical queue is distinct from the archived 41-chapter outline.
  - **Source / artifact:** `writings/MANUSCRIPT-ARCHITECTURE.md`; GitHub issue #56.
  - **Last checked:** 2026-09-24.

- **Claim:** Issue #56 requires a 2,500–4,000-word chapter and specifies a lived scene/proof case, failure mode, 2026 section, claim/evidence ledger, operator rule, measurable test, and QA.
  - **Source / artifact:** GitHub issue #56, “The First-Try Problem.”
  - **Last checked:** 2026-09-24.

- **Claim:** The archived outline contains the editorial hook about agents applying to jobs and reviewing repositories while humans regenerate answers.
  - **Source / artifact:** `writings/archive/41-chapter-outline/part-02-field-essays/10-first-try-problem.md`.
  - **Last checked:** 2026-09-24.

- **Claim:** Anthropic publishes guidance on building effective agents and reliable agent patterns.
  - **Source / artifact:** Anthropic, “Building effective agents,” https://www.anthropic.com/engineering/building-effective-agents.
  - **Last checked:** 2026-09-24.

- **Claim:** OpenAI documents evaluations as a method for testing and improving model outputs.
  - **Source / artifact:** OpenAI, “Working with evals,” https://developers.openai.com/api/docs/guides/evals.
  - **Last checked:** 2026-09-24.

- **Claim:** SWE-bench introduced an evaluation framework of 2,294 software-engineering problems from real GitHub issues across 12 Python repositories.
  - **Source / artifact:** Jimenez et al., “SWE-bench: Can Language Models Resolve Real-World GitHub Issues?” arXiv:2310.06770, https://arxiv.org/abs/2310.06770.
  - **Last checked:** 2026-09-24.

- **Number/date/product behavior boundary:** No claim in this chapter that an agent achieved a particular success rate, saved a particular amount of time, or behaved in a particular way in a private run. Repository facts are identified as repository evidence; published benchmark facts are identified as published measurements.
  - **Source / artifact:** This chapter's branch, issue, tracked files, and cited sources.
  - **Last checked:** 2026-09-24.

## Closing image

The first attempt is still on the branch. It is not a failure waiting to be hidden. It is a map of the uncertainty that remains.

The operator reads the issue again. The operator checks the path. The operator opens the archive, then the architecture. One instruction is current; another is historical. The difference is small on the screen and decisive in the work.

Only now is another attempt worth making.

The machine can produce the next draft. The human decides what the next draft must learn.

## QA checklist

- [x] Plain-language explanation
- [x] Working example included
- [x] Failure mode included
- [x] “Why this matters in 2026” included
- [x] Claims separated from measurements
- [x] Sources/evidence captured
- [x] Human responsibility and limits are clear
- [x] Operator rule stated
- [x] Measurable test stated
- [x] Copy edited for clarity and rhythm
- [x] Technical QA completed
- [ ] Publisher review pass
