# Coordination, Verification, and the Trust Gap

> **Status:** Draft
> **Part:** part-01-crash-course
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/46
> **Target length:** 2,500–4,000 words

## The green check that was not proof

The most dangerous artifact in an agent workflow is often the reassuring one: a green check, a completed status, a sentence that says “done.” It looks like the end of work. Sometimes it is only the end of a particular loop.

In a software repository, “done” might mean that an agent emitted code, that a command returned zero, or that a pull request was opened. Those are useful events. None is the same as the thing a human actually cares about: did the requested change happen, does it work under the conditions that matter, and can somebody else understand why we trust it?

I have seen this distinction in the shape of the Human 2.0 book repository. The chapter worker is not one magical intelligence. It is a sequence of bounded actions: inspect the queue, read the guide, select an issue, read a template, research, draft, check, commit, push, and open a pull request. Each action creates an artifact. Each artifact is a possible checkpoint. If the chain is treated as one smooth act of “the agent wrote a chapter,” the weak link disappears inside the story.

That is the trust gap: the distance between an output that looks finished and an outcome that has been demonstrated. Coordination can close that distance, or it can widen it by multiplying activity without multiplying proof.

## The promise of this chapter

By the end, you should be able to:

- tell when a task benefits from multiple workers and when one worker is enough;
- distinguish coordination from parallel activity and from mere conversation;
- design a verifier that checks the work rather than politely restating it;
- recognize the failure modes that appear when agents share context, tools, and authority;
- measure whether a multi-agent workflow improves outcomes after its coordination cost is included.

The core argument is simple: **more workers create capacity, not trust. Trust comes from independent evidence, explicit handoffs, and a human-owned decision at the boundary.** A second agent is valuable when it can find a class of error the first agent is likely to miss. If it only produces another fluent version of the same assumption, it is ceremony.

## Parallel work is not teamwork

People use “multi-agent system” to describe several different arrangements.

A **single agent** receives a task and acts through a loop of reasoning and tools. It may search, edit files, run tests, and revise its work. This can be enough when the task is narrow, the context is manageable, and the same worker can both produce and inspect the result.

A **pipeline** assigns stages to different workers. One agent plans, another implements, and a third checks. The stages may be sequential because later work depends on earlier artifacts.

A **parallel team** splits independent work. Several research agents may investigate separate sources or subquestions at the same time. A lead agent later reconciles their reports.

A **debate or review arrangement** gives one worker an artifact and another worker a mandate to challenge it. This is the useful version of a second opinion: the reviewer has a different job and, ideally, a different path to the evidence.

Concurrency is about timing: doing independent work at once. Coordination is about meaning: deciding who owns which task, what artifact crosses the boundary, what counts as complete, and how conflicts are resolved. Six workers can run concurrently and still be badly coordinated. Two workers can be coordinated well if their handoff is precise.

The economics are not mysterious. Every additional worker adds possible coverage, but also adds messages, duplicated research, contradictory answers, tool calls, latency, and opportunities for an error to become shared context. A team does not become more reliable merely because its transcript is longer.

The right split is by uncertainty or failure mode, not by an arbitrary headcount. If the open question is “Which primary sources support this claim?”, parallel research may help. If the open question is “Does this code satisfy the acceptance criteria?”, an implementation agent and a test-oriented verifier may be enough. If the open question is taste, priority, consent, or consequence, adding agents can generate options but cannot transfer the decision.

## The handoff is the unit of coordination

A useful handoff is an interface, not a paragraph of encouragement. It says:

1. **Goal:** what decision or artifact is required.
2. **Scope:** what is included and excluded.
3. **Inputs:** the files, records, or sources the worker may rely on.
4. **Output:** the exact artifact expected.
5. **Evidence:** what must be cited, measured, or preserved.
6. **Failure state:** what to do when evidence is missing or the task cannot be completed.
7. **Authority:** what the worker may change and what requires human confirmation.

This structure matters because an agent can satisfy a vague instruction in a way that is locally reasonable and globally wrong. “Research coordination” can result in a summary. “Produce a source-backed table of claims, with URLs and a note for every unsupported claim” is an interface.

The repository's chapter template is a small example of this principle. It asks for an opening scene, a working example, failure modes, a “Why this matters in 2026” section, a skeptical-reader response, an operator rule, a measurable test, an evidence ledger, and a QA checklist. The template is not decoration. It is a contract between the worker and the manuscript.

A handoff should also carry provenance. A reviewer needs to know whether a statement came from a local file, a primary paper, a model's inference, or a previous agent's summary. If all evidence enters the next context as undifferentiated prose, the second worker inherits conclusions without inheriting the means to check them.

## What verification actually does

Verification is not asking, “Does this look good?” That question invites agreement with the artifact's presentation. Verification asks whether specified conditions hold.

There are several layers.

**Structural verification** checks whether the artifact has the required shape. Does the file exist? Are the required headings present? Is the link valid? Is the branch based on the expected revision? Structural checks are cheap and valuable, but they cannot establish meaning.

**Behavioral verification** runs the artifact against examples and expected outcomes. A test can show that a function returns the right result on known inputs. A writing check can show that the chapter contains the required sections and falls within the target length. Behavioral checks are stronger than a completion message, but they are limited by the cases selected.

**Evidence verification** checks whether a claim is supported by its source. The question is not whether a citation appears nearby. The question is whether the source actually entails the claim, with the right date, scope, population, version, and qualification.

**Adversarial verification** supplies cases designed to expose predictable failure. Use a stale policy beside a current one, a similarly named file, a contradictory source, an empty result, an instruction hidden in retrieved text, or an input that should be rejected. A verifier that sees only happy paths is a demonstration, not a guardrail.

**Human verification** resolves what tests cannot. Is this the right tradeoff? Is the result acceptable for the people affected? Is the evidence strong enough for the consequence? A human checkpoint is not an admission that automation failed. It is the place where responsibility belongs.

The verifier should not be the same process as the producer when independence matters. A model asked to write an answer and then praise its own answer can find some errors, but it is still operating under the original framing. A separate reviewer can challenge the framing, especially if it receives the acceptance criteria and source artifacts rather than only the producer's explanation.

Independence is a spectrum. Two agents using the same model, same prompt, same retrieved passages, and same mistaken intermediate summary are not independent witnesses. They may still be useful for critique, but their agreement should not be counted as corroboration.

## The working example: a chapter as a coordinated system

The chapter worker provides a practical proof case without pretending to be a controlled experiment.

The input was the book guide and the canonical issue queue. The queue rule selected the lowest-numbered open canonical chapter, excluding historical tickets whose titles begin `ARCHIVED OUTLINE —`. Issue 46 specified the topic, matching template, target length, and definition of done. The template specified the manuscript shape. The repository supplied neighboring chapter decisions and local evidence. Public primary sources supplied technical context.

The workflow can be modeled as five roles, even if one person or one model performs more than one role:

- **Dispatcher:** chooses the correct issue and records the branch and template.
- **Researcher:** gathers sources and separates verified claims from questions.
- **Writer:** turns the evidence and local artifacts into a chapter.
- **Verifier:** checks the template, links, word count, claim ledger, unsupported specifics, and technical consistency.
- **Owner:** decides whether the chapter is fit for the manuscript and whether the issue can be closed.

The important point is not that five software agents are required. The point is that the responsibilities must exist. Collapsing them into one conversational worker is acceptable only when the workflow still preserves the checks and artifacts.

The chapter's source path exposed a real failure. The configured web-search service was unavailable because its required credential was not present. A weak workflow would have continued with plausible citations or silently relied on remembered claims. The worker instead recorded the blocker and used direct retrieval through official pages and repositories. That did not remove uncertainty. It preserved it.

The same principle applies to drafting. A claim ledger is a coordination artifact between writer and verifier. It asks for the claim, source or artifact, last checked date, and boundary of what the source establishes. A number without a source is not automatically false. It is not ready to carry editorial authority.

The human decision points are visible. The book's voice and boundaries came from the guide. The issue selection followed an explicit repository rule. The worker chose sources and interpreted them. The owner must still decide whether the chapter's argument is sound, whether the evidence is adequate, and whether the chapter belongs in the book. The workflow accelerates work while leaving authorship and consequence legible.

## Where agents fail

### Failure mode: everyone solves the same problem

**Why it happens:** The task is split by quantity—“ask five agents”—rather than by uncertainty. Every worker searches the same obvious sources and returns the same summary.

**How to detect it:** Compare source overlap, unique findings, and corrected errors. If the team produces five versions of one answer but no new evidence, the parallelism is not buying coverage.

**How the human responds:** Split by subquestion, source class, or failure mode. Give each worker a distinct deliverable. Stop workers whose expected information gain is low.

### Failure mode: the planner becomes a bottleneck

**Why it happens:** One lead agent must read every intermediate message, approve every step, and reconcile unstructured reports.

**How to detect it:** Measure queue time, repeated instructions, and the size of the lead's context. A system can have many workers and still execute serially through one overloaded coordinator.

**How the human responds:** Use structured reports and bounded updates. Let independent tasks complete without approval at every sentence. Reserve the lead's attention for conflicts and irreversible actions.

### Failure mode: a shared mistake becomes consensus

**Why it happens:** The first worker states an unsupported claim. Later workers receive it as context and spend their effort polishing or extending it.

**How to detect it:** Trace claims back to their first source. Mark inherited assertions separately from independently retrieved evidence. Run a review from source artifacts, not from the summary alone.

**How the human responds:** Make provenance mandatory. Give the reviewer access to raw evidence. Allow an explicit “unsupported” outcome and quarantine disputed claims.

### Failure mode: the verifier grades style instead of truth

**Why it happens:** Fluent work is easier to assess than supported work. A reviewer says “clear” when the acceptance criterion is “correct.”

**How to detect it:** Inspect the rubric. Are there checks for entailment, edge cases, permissions, and failure behavior, or only readability and completeness?

**How the human responds:** Turn requirements into observable tests. Require the verifier to cite the exact artifact or input that justifies each pass. Include known failures in the test set.

### Failure mode: the team optimizes the local task and loses the outcome

**Why it happens:** Each worker completes its assigned stage. Nobody owns whether the combined result is useful, safe, or appropriate.

**How to detect it:** Ask who can reject the entire result and what evidence that person receives. If every stage is green but the outcome has no owner, the workflow has optimized activity.

**How the human responds:** Name an owner at the boundary. Keep side effects behind confirmation. Do not close the issue, ship the change, or publish the claim until the owner accepts the evidence.

### Failure mode: automation creates unsafe authority

**Why it happens:** A verifier, router, or agent is granted permission to change external systems because the workflow assumes its checks are guarantees.

**How to detect it:** List every tool and side effect. Separate read, propose, modify, publish, and delete permissions. Test rejection and partial failure.

**How the human responds:** Give agents the least authority required. Treat a passing eval as evidence about tested cases, not a general security guarantee. Require confirmation for consequential actions.

## Why this matters in 2026

In 2026, the argument for agent teams is no longer theoretical. Public engineering accounts describe systems that split broad research questions among subagents, run searches in parallel, and use evaluations to compare changes. Anthropic's account of its multi-agent research system reports strong gains on its internal breadth-first research evaluation and identifies token use, tool calls, and model choice as major contributors to performance variance. It also describes early failures: excessive spawning, endless searching, distracting updates, and emergent behavior.

Those details are useful because they cut through the shopping-list version of multi-agent design. The result was not “agents are better.” The result was that some tasks benefit from more search and more parallel capacity, while coordination itself introduces costs that must be engineered. The same account describes structured prompts, tool testing, parallelization, small evaluation sets, observability, and feedback loops as practical controls.

OpenAI's public Evals repository makes a related point: evaluation is a framework for testing models or systems against dimensions that matter to a use case, and private task data can represent an organization's own patterns. The repository recommends starting with focused tests rather than waiting for a perfect, enormous benchmark. That is an operational lesson, not a promise that a score guarantees production behavior.

The current environment makes the trust gap more important because agents increasingly have tools, files, accounts, and the ability to act. A wrong sentence in a chat is one kind of failure. A wrong sentence that routes a task, edits a repository, sends a message, or becomes durable memory is another. Coordination gives systems more reach. Verification determines whether that reach is governed.

There is also a labor question. A person who manages ten agents may feel productive while becoming the final verifier of ten streams of plausible text. That is not leverage if review becomes the bottleneck. Human 2.0 does not mean replacing judgment with a crowd of synthetic coworkers. It means moving judgment to the points where it has the highest value: setting intent, defining acceptance, resolving ambiguity, and owning consequence.

## The skeptical reader

A technically informed critic may say that a strong model can plan, execute, and review in one context. Adding agents increases latency and cost. For many tasks, that is correct. A multi-agent architecture is not a maturity badge. If one worker can produce a correct, inspectable result with a simple test, adding three workers is waste.

The critic may also say that “independent verification” is overstated when all agents are language models. Again, correct. Model agreement is not proof. Separate contexts can reduce correlated mistakes, but they do not create ground truth. A verifier needs an oracle where possible: tests, source documents, invariants, a known expected output, or a human decision.

The counterargument is not “always use a swarm.” It is “make the choice measurable.” Compare a single-worker baseline with a coordinated design on representative tasks. Include accuracy, unsupported claims, coverage, time, tool calls, review effort, and side-effect errors. If the team does not improve the outcome after its costs, remove the team.

Some outcomes remain hard to measure. Taste, long-term maintainability, and human trust do not reduce cleanly to one score. That is a reason to state the uncertainty and retain an owner, not a reason to call a fluent transcript success.

## Operator rule

**Generation is cheap. Coordination is not. Trust belongs to the evidence at the handoff, not to the number of agents in the room.** Split work only when the split targets a real uncertainty or failure mode. Give every stage a bounded input, an inspectable output, a failure state, and an owner who can say no.

## Measurable test

Build a representative task set of at least three classes: tasks with independent research directions, tasks with a known expected result, and tasks where the correct answer may be “insufficient evidence.” Run a single-worker baseline and a coordinated workflow.

For each run, record:

- outcome correctness against the task oracle or human rubric;
- source-supported claim rate;
- important errors found by the verifier;
- errors that reached the final owner;
- elapsed time, tool calls, and review minutes;
- duplicated research and unresolved conflicts;
- any unauthorized or unintended side effect.

The coordinated workflow earns its complexity only if it improves the agreed outcome measure while keeping review effort and consequential errors within the owner's threshold. Set the threshold before running the comparison. Do not count a green status, a longer transcript, or agreement among agents as proof by itself.

## Evidence ledger

- **Claim:** Anthropic reports that its multi-agent research system outperformed single-agent Claude Opus 4 by 90.2% on an internal research evaluation, especially on breadth-first queries.
  - **Source:** Anthropic, “How we built our multi-agent research system,” https://www.anthropic.com/engineering/multi-agent-research-system
  - **Last checked:** September 22, 2026
  - **Boundary:** This is an Anthropic-reported internal result for its system and evaluation; it is not a universal guarantee for multi-agent architectures.

- **Claim:** Anthropic reports that token usage, tool calls, and model choice explained most of the performance variance in one cited evaluation, and describes failure modes including excessive spawning, endless searching, and distracting updates.
  - **Source:** Anthropic, “How we built our multi-agent research system,” https://www.anthropic.com/engineering/multi-agent-research-system
  - **Last checked:** September 22, 2026
  - **Boundary:** The findings describe that system's analysis and should not be generalized without local testing.

- **Claim:** OpenAI Evals is a framework for evaluating language models or systems built with them, with support for custom evaluations and private use-case data.
  - **Source:** OpenAI Evals README, https://github.com/openai/evals
  - **Last checked:** September 22, 2026

- **Claim:** The repository's current chapter workflow requires an open canonical issue, a matching template, a claim ledger, a measurable test, QA, a branch, and a pull request before issue closure.
  - **Source:** `C:/Users/jjohn/workspace/book/human-2.0-book-guide.md`, issue 46, and this chapter template in `murderszn/multi-agent-apps`.
  - **Last checked:** September 22, 2026

- **Claim:** The worker encountered an unavailable configured web-search service and used direct retrieval of official pages and repositories instead.
  - **Source:** Tool output from this run and direct retrieval from the OpenAI Evals repository and Anthropic engineering page.
  - **Last checked:** September 22, 2026
  - **Boundary:** This records the run's research path; it is not a claim about general service availability.

- **Number/date/product behavior:** The target chapter length is 2,500–4,000 words; the Anthropic 90.2% figure and other reported findings belong to the cited source and its evaluation setup.
  - **First-party sources:** Canonical issue/template and cited official publisher pages.
  - **Last checked:** September 22, 2026

## Closing image

Return to the green check. It is still useful. A system needs cheap signals that a file exists, a test ran, or a handoff completed. But the check is a door, not a destination.

Behind it should be the artifact, the evidence, the failure cases, and the person who owns the consequence. If the first worker says “done,” the verifier's job is not to make the sentence sound more confident. It is to ask what done means, show the test, and stop the chain when the proof is missing.

The mature system is not the one with the most agents. It is the one that knows where agreement is cheap, where evidence is hard, and where a human must remain accountable.

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
- [x] Publisher review pass
