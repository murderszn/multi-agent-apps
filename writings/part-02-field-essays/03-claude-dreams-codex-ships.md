# Claude Dreams. Codex Ships.

> **Status:** Draft
> **Part:** part-02-field-essays
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/51
> **Target length:** 2,500–4,000 words

## Editorial hook

Different models are good at different jobs. Stop using one for everything.

## Opening scene

The operator has two agents available. One is better at generating ideas, explaining strategy, and writing the thing that describes what should be built. The other is better at producing the implementation — the code, the structured output, the deliverable that has to actually run.

The operator could use one agent for both jobs because it is convenient. That is the mistake.

The first agent produces a spec that is broad, framed well, and explained clearly. The second agent takes that spec and produces the code. The operator reviews the code against the spec. The operator decides what to merge.

The switching is not dramatic. It is practical. It happens at the lane boundaries, not in the middle of a sentence. The discipline is to make those boundaries explicit.

## Chapter promise

By the end, the reader should understand:

- Why different models are good at different jobs and why that matters
- Why "which model is smartest" is the wrong question
- How to actually switch between models in a real workflow
- Why the swarm works because it treats models as specialists

## Core argument

### The dreamer and the implementer

Some models are better at generating ideas, explaining strategy, and writing the thing that describes what should be built. Others are better at producing the implementation — the code, the structured output, the deliverable that has to actually run.

The dreamer role is about breadth, framing, and explanation. The implementer role is about precision, structure, and correctness under constraints. A model that is excellent at one is not necessarily excellent at the other.

The workflow improves when the operator assigns the work to the model that is actually good at that lane. The mistake is using one model for both jobs because it is convenient.

### "Which model is smartest" is the wrong question

The question that wastes time is "which model is the smartest." The useful question is "which model is the right tool for this lane, at this cost, with this review standard."

A model that is slightly less capable overall but dramatically better at the specific work being delegated is the better choice for that work. The swarm works because it treats models as specialists, not as a single genius the operator consults for everything.

The operator's job is to know which specialist to call for which job, and to review the output when it comes back.

### How you actually switch between them

In a real workflow, the switching is not dramatic. It is practical.

The operator starts with the dreamer to frame the problem and produce a spec. The operator takes the spec to the implementer to produce the code or the deliverable. The operator uses a third pass — sometimes the same model, sometimes a different one — to review the result against the spec.

The switching happens at the lane boundaries. The discipline is to make those boundaries explicit. When the work moves from dream to build, the spec should be in a form the implementer can use. When the work moves from build to review, the standard should be in a form the reviewer can apply.

The switching is only smooth when the handoff is clean.

## Working example / proof case

The operator has a task: build a small internal tool. They start with the dreamer to produce a spec that describes what the tool should do, what inputs it should accept, what outputs it should produce, and what the edge cases are. They take the spec to the implementer, which produces the code. They review the code against the spec and find that the implementer missed one edge case. They ask for a revision. The agent revises. The operator reviews again and merges.

The switching happened twice: dream to build, build to review. Both handoffs were clean because the spec was explicit and the standard was clear.

## What can go wrong

- **Failure mode:** The operator uses one model for everything because it is convenient.
- **Why it happens:** The operator does not want to manage the complexity of switching. The operator treats the model as a single general worker.
- **How to detect it:** The operator is using the same model for the dream stage and the build stage and the review stage. The operator is not naming the lanes.
- **How the human responds:** The operator splits the work into lanes, assigns each lane to the model that is best at that lane, and makes the handoffs explicit.

## Why this matters in 2026

The model landscape is not converging on one winner. It is diversifying into specialists. The operators who win are the ones who stop asking which model is best and start asking which model is right for which lane.

The swarm is not a single model with a bigger context window. It is a small set of specialists with a human who knows how to route work between them.

## Counterargument / skeptical reader

A critic would say that the best model is the best model, and that using multiple models is just managing complexity that the operator should not have to manage. That is true if the operator is doing trivial work. For work that has different requirements at different stages, a single model is a compromise. The compromise is convenient. It is also suboptimal.

The critic would also say that the switching cost is real and that the operator should measure whether the benefit of specialization pays for the cost of switching. That is a good point. The operator should measure it. The book's position is that for sustained work with multiple lanes, the benefit usually does pay for the cost.

## Operator rule

Use the right model for the lane, not the same model for everything.

## Measurable test

Can the operator name which model is used for which lane? Can the operator explain why that model is the right one for that lane? Can the operator measure whether the specialization is paying for itself? If the answer to any of those is no, the operator is using one model for everything out of convenience, not strategy.

## Evidence ledger

- Claim: Different models are good at different jobs.
  - Source / artifact: Chapter 3, "The dreamer and the implementer"
  - Last checked: Draft
- Claim: "Which model is smartest" is the wrong question.
  - Source / artifact: Chapter 3, "'Which model is smartest' is the wrong question"
  - Last checked: Draft
- Claim: The switching should happen at lane boundaries, not in the middle of a sentence.
  - Source / artifact: Chapter 3, "How you actually switch between them"
  - Last checked: Draft

## Closing image

The operator has two agents on the desk. One dreams. One builds. The operator reviews the work and decides what to merge. The switching is not dramatic. It is practical. That is the swarm.
