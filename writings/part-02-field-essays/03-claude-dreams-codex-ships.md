# Claude Dreams. Codex Ships.

> **Status:** Draft
> **Part:** part-02-field-essays
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/51
> **Target length:** 2,500–4,000 words

## The handoff is the product

The most useful artifact in this repository is not a clever prompt. It is the handoff.

The book has a queue of canonical chapter issues, a prescribed Markdown template, a branch, a review step, and a pull request that must exist before the work is considered complete. That is not administrative decoration. It is the smallest visible version of a multi-agent system: intent enters through an issue, work is routed to a file, a worker changes the file, a reviewer checks the result, and a human decides whether the change belongs on `main`.

The model can help with each stage. It does not own the stage.

That distinction is easy to miss when the work happens in a chat window. A model writes a convincing paragraph, then another model writes code, then a third model reports that the code is good. The prose is smooth. The filenames are plausible. The confidence is high. Yet nothing has been proved until a person can trace the result back to the request, inspect the artifact, run the relevant checks, and decide what happens next.

This is why I prefer the blunt title: Claude dreams. Codex ships. The names are shorthand, not a universal product ranking. They describe lanes. One system may be better for framing a problem, challenging assumptions, or turning a vague intention into a plan. Another may be better at making a constrained change in a real repository. A third may be useful as a hostile reviewer. The useful question is not which model is smartest. It is which worker is appropriate for this lane, under this review standard, at this cost and risk.

The human is the routing layer and the accountable owner.

## The chapter promise

By the end of this chapter, you should be able to:

- split a job into framing, implementation, and review lanes;
- choose models by demonstrated task fit rather than reputation;
- create handoffs that preserve intent, constraints, evidence, and stopping conditions;
- recognize when specialization is adding ceremony instead of capability; and
- measure whether a specialist workflow actually improves the outcome.

The core argument is simple: models are workers with uneven strengths, not interchangeable minds. Specialization can improve a workflow, but only when the boundaries are explicit and a human verifies the transfer between them.

## Dreaming is not shipping

“Dreamer” is not a claim that a model has imagination in the human sense. It is a job description. In this lane, the system expands the problem before anyone commits to implementation. It asks what the user actually needs, identifies missing inputs, proposes a shape for the work, and turns loose intention into a specification someone else can execute.

A useful dreamer output might contain:

- the desired outcome, stated in observable terms;
- inputs and outputs;
- constraints and non-goals;
- edge cases;
- assumptions that require confirmation;
- a proposed sequence of work; and
- a definition of “done.”

That is not a finished product. It is a decision aid and a contract for the next lane.

The implementer has a different job. It must take the contract seriously. It must inspect the actual environment, make the change, preserve what should not change, and leave an artifact that can be run or reviewed. It is not rewarded for adding five elegant possibilities when the request called for one working path. It is rewarded for bounded, testable progress.

The reviewer has a third job. A reviewer does not merely ask whether the output looks good. It asks whether the output answers the request, whether it changed anything it was not allowed to change, whether the evidence supports the claims, and whether the result survives contact with the environment. A reviewer should be willing to reject a polished answer.

Those lanes overlap, but they are not identical. Asking one worker to brainstorm, implement, and approve its own work creates a conflict even when the model is capable. The system that generated the answer is also the system most likely to inherit its assumptions. A separate pass does not guarantee correctness, but it creates a deliberate opportunity to break the story.

## The handoff needs teeth

A weak handoff says: “Build the thing we discussed.”

A strong handoff says what “the thing” is, where it belongs, what must remain unchanged, how to test it, what is unknown, and when to stop.

For a repository task, my minimum handoff looks like this:

```text
Goal: change one behavior in one named area.

Repository state: branch and base commit.

Inputs: issue, files, examples, and authoritative references.

Constraints: files or interfaces not to change; security and privacy boundaries.

Acceptance checks: commands, expected artifacts, and human review questions.

Known uncertainty: claims, dependencies, or behavior not verified.

Stop condition: pause and report if the requested change requires a new assumption.
```

The point is not the formatting. The point is to move context from memory into an inspectable object. In this book repository, the canonical issue names the chapter, points to the template, lists the definition of done, and says not to use the archived outline. Those details constrain the worker. They prevent a plausible but wrong chapter from being drafted against a historical structure.

The receiving worker should be able to repeat the assignment in its own words before it acts. If it cannot, the handoff is not ready. If the implementer discovers that the specification and the repository disagree, it should stop at that boundary rather than silently choosing the interpretation it likes.

A handoff also needs provenance. If the dreamer says a product behaves in a particular way, the implementer should know whether that statement came from first-party documentation, a local experiment, a public discussion, or the model’s own inference. Those are not equivalent forms of evidence. A confident sentence without a source is not a requirement.

## A working example from the lab

Consider the chapter task represented by issue #51 in this repository. The request is not “write something about models.” It names a canonical chapter, gives a target range, specifies the location, and requires a working example, failure modes, a 2026 section, a skeptical-reader response, an evidence ledger, an operator rule, and a measurable test. The repository also contains an architecture document that says the old 41-chapter outline is preserved for reference and is not the current queue.

That is the input lane.

A framing worker can turn those materials into an editorial plan: open with the lab and a real artifact, explain specialization without claiming a universal winner, show a handoff, name where agents fail, and finish with a test. The human then checks whether the plan has quietly invented a personal story or an outcome. In this case, the safe proof case is the repository workflow itself: issue to template, template to branch, branch to draft, draft to checks, branch to review. It is real and inspectable. It does not require pretending that a particular model saved a measured number of hours.

An implementation worker then writes the chapter into the named file. It should not redesign the manuscript architecture, draft against the archived template, or turn a general argument into a product advertisement. It should preserve the issue link and the checklist because those are part of the artifact’s traceability.

The human review is not a ceremonial final read. It is a comparison across boundaries:

1. **Issue to outline:** Does the outline answer the canonical request?
2. **Outline to manuscript:** Did the draft keep the promised argument and evidence standard?
3. **Manuscript to repository:** Is the file at the right path, with the expected headings and no accidental changes?
4. **Claim to source:** Can each number, date, price, or product behavior be checked?
5. **Draft to outcome:** Did the required checks run, and did GitHub return a pull request URL?

The failure in a workflow like this is rarely that the model cannot write a paragraph. It is that a paragraph crosses a boundary carrying an assumption no one recorded.

## Where agents failed

The most important failure mode is not a dramatic hallucination. It is silent substitution.

A worker sees a canonical chapter issue but drafts against an archived outline because the old file has more detail. The prose may be competent. The work is still wrong.

A worker sees “opening scene” and invents a vivid personal anecdote. The scene may read better than a repository artifact. It is still false if nobody supplied that experience.

A worker sees a requirement for current research and fills the evidence ledger with generic links or memory. The claims may be directionally right. The ledger is still incomplete.

A worker implements a request without inspecting the current branch. It reports success because the patch looks reasonable, even though the target file was renamed or the test command does not exist.

A reviewer asks the same model to evaluate its own output using the same assumptions. The second answer sounds independent because the prompt says “be critical.” It may not be independent at all.

These failures happen because language is cheap. A model can make an unresolved decision look resolved. The human response is to force the decision back into the workflow:

- mark an assertion as **verified**, **inferred**, **proposed**, or **unknown**;
- require a source or artifact for every concrete claim;
- compare the changed files with the requested scope;
- run checks rather than accept a report that checks were run; and
- reject work that cannot show its path from intent to result.

This is also where a multi-model workflow can fail. Specialization increases the number of handoffs. Every handoff can lose context, distort a constraint, or introduce a new interpretation. More workers do not automatically produce more intelligence. They can produce more places for responsibility to disappear.

## Choosing a specialist without worshipping a benchmark

A benchmark can tell you something about a model under a defined evaluation. It does not tell you which model belongs in your workflow without a local test.

For each lane, define a small evaluation set from the work you actually do. For a dreamer, score whether it identifies missing requirements, preserves non-goals, and produces a plan a human can inspect. For an implementer, score whether it makes the requested change, avoids scope creep, and passes the repository’s checks. For a reviewer, score whether it finds seeded defects and distinguishes a failing test from a stylistic preference.

Keep the scoring boring. A five-point scale is enough if the criteria are stable. Record:

- time to a reviewable artifact;
- number of human corrections;
- number of defects found after the worker said “done”;
- rework caused by a bad handoff; and
- cost, if cost is material to the task.

Do not turn those numbers into a universal leaderboard. They are local operating evidence. A worker can be excellent at drafting a plan and poor at editing a live codebase. Another can be terse and reliable in implementation but unhelpful when the problem is still undefined. The correct choice can change as the repository, model, tools, or review standard changes.

The comparison must include the baseline: one worker doing the whole job, or the current human-only process. If the specialized system takes three handoffs and produces the same quality with more management, it is not an upgrade. If it reduces rework while keeping the human’s review burden within an acceptable limit, it may be one.

## Why this matters in 2026

In 2026, the practical problem is no longer whether a model can produce a plausible draft, code patch, summary, or plan. Many systems can. The problem is deciding where to put autonomy and how to prove that the result remained inside the boundary.

Public governance work is moving in the same direction. NIST’s AI Risk Management Framework describes risk management as a continuous process organized around governing, mapping, measuring, and managing risk. The European Union’s AI Act includes human-oversight requirements for high-risk systems, including the ability for people to understand limitations, monitor operation, and intervene when appropriate. Anthropic’s Responsible Scaling Policy describes technical and organizational protocols for managing risk as model capabilities increase. These sources do not prove that a particular two-model workflow is safe. They do support a narrower point: capability is not the whole operating question. Governance, monitoring, intervention, and accountability are part of the system.

The timing matters because the cost of a wrong handoff is falling into ordinary work. An incorrect implementation can become a pull request. An invented research claim can become a published page. A model can route itself through tools, files, and external systems faster than a person can reconstruct what happened from a chat transcript. The human needs artifacts that make the path visible.

The answer is not to refuse every delegation. It is to delegate bounded execution while keeping the decisions that carry authority, consent, taste, and consequence with a person who can be named.

## The skeptical reader is right about switching costs

A technically informed critic will say that multi-model workflows are theater. Pick the best available model, give it enough context, and stop building a miniature bureaucracy around a simple task.

For a small, low-risk task, that criticism is correct. If the work is reversible and easy to inspect, the overhead of a separate dreamer and reviewer can exceed the benefit. Specialization is not a moral virtue. It is an operating choice that must pay rent.

The critic is also right that model boundaries are unstable. A model that is strong at implementation today may be replaced by a better generalist tomorrow. Product interfaces, tool permissions, context limits, and pricing change. A workflow built around brand identity instead of observable behavior will age badly.

The response is not to defend “Claude” or “Codex” as permanent roles. Replace the names with lane A and lane B. Keep the handoff, the acceptance checks, and the measurement. If one model becomes good enough to handle all three lanes at the required standard, use it. If the switching cost is larger than the reduction in errors or rework, collapse the workflow.

What remains uncertain is the long-run economics of these systems. A local test can measure this repository’s work. It cannot establish a general law about every team, model, or domain. High-consequence work needs a stronger review standard than an editorial chapter or a small internal tool. “The model passed my test” is not a security guarantee, and “another model reviewed it” is not proof of independence.

## Operator rule

Use the right model for the lane, not the same model for everything. More importantly: make the lane boundary visible, make the handoff inspectable, and keep the human responsible for acceptance.

## Measurable test

For the next ten comparable tasks, record the baseline workflow and the specialized workflow. For each, record:

- time from request to reviewable artifact;
- number of human corrections before acceptance;
- defects found after the worker’s “done” report;
- rework caused by a missing or distorted requirement; and
- the cost of the extra handoff, if measurable.

The specialized workflow earns its place only if it reduces defects or rework without making review weaker or slower beyond the project’s tolerance. Also require one artifact per handoff: the request, the plan or specification, the implementation diff, the test result, and the human acceptance decision. If any link is missing, the workflow is not yet measurable.

## Evidence ledger

- **Claim:** The canonical manuscript uses a queue, templates, branches, review, and a pull request as its operating path.
  - **Source / artifact:** Repository `writings/MANUSCRIPT-ARCHITECTURE.md`, issue #51, and the chapter template.
  - **Last checked:** September 23, 2026.

- **Claim:** The current manuscript queue is a three-part, 20-chapter structure, and the 41-chapter outline is archival.
  - **Source / artifact:** Repository `writings/MANUSCRIPT-ARCHITECTURE.md`.
  - **Last checked:** September 23, 2026.

- **Claim:** NIST presents AI RMF as a process involving governing, mapping, measuring, and managing risk.
  - **Source / artifact:** National Institute of Standards and Technology, “AI Risk Management Framework,” https://www.nist.gov/itl/ai-risk-management-framework.
  - **Last checked:** September 23, 2026. The official page was fetched during drafting; no numerical performance claim is inferred from it.

- **Claim:** The EU AI Act includes human-oversight requirements for high-risk AI systems.
  - **Source / artifact:** Regulation (EU) 2024/1689, Article 14, EUR-Lex, https://eur-lex.europa.eu/eli/reg/2024/1689/oj.
  - **Last checked:** September 23, 2026. This chapter does not provide legal advice or claim that every workflow falls under those provisions.

- **Claim:** Anthropic’s Responsible Scaling Policy describes technical and organizational protocols for managing risks from increasingly capable systems.
  - **Source / artifact:** Anthropic, “Introducing Anthropic’s Responsible Scaling Policy,” September 19, 2023, https://www.anthropic.com/news/anthropics-responsible-scaling-policy.
  - **Last checked:** September 23, 2026.

- **Number, date, price, or product behavior:** No model price, benchmark score, latency, or product capability is asserted in this chapter. “Claude” and “Codex” are used as lane shorthand, not as a measured ranking.
  - **First-party source:** Not applicable.
  - **Last checked:** September 23, 2026.

## Closing image

The useful picture is not a room full of autonomous geniuses. It is a desk with a request, a specification, a diff, a test result, and a person who has read the result closely enough to accept or reject it.

One worker helps name the work. Another makes the change. A reviewer tries to break the story. The human keeps the keys.

That is the swarm when it is working: not a replacement for judgment, but a set of bounded workers moving through a visible chain of responsibility. Claude dreams. Codex ships. Someone still has to decide whether the ship should leave the harbor.

## QA checklist

- [x] Opens with a lived scene or proof case
- [x] Plain-language mechanics only
- [x] Working example includes human decision points
- [x] Failure mode and response included
- [x] “Why this matters in 2026” included
- [x] Counterargument addressed
- [x] Operator rule stated
- [x] Measurable test stated
- [x] Claim/evidence ledger completed
- [x] No invented experience, number, date, price, or product behavior
- [x] Copy edit completed
- [x] Technical QA completed
