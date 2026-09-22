# I Don't Code Anymore. I Vibe.

> **Status:** Draft
> **Part:** part-02-field-essays
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/49
> **Target length:** 2,500–4,000 words

## Editorial hook

Coding used to mean typing. Now it means directing. The chapter follows the ordinary day of prompting, inspecting, rejecting, and shipping systems that must stay up.

## Opening scene

The most honest description of vibe coding is not any of the hype versions. It is not "I said one sentence and a whole app appeared." It is not a demo of a model generating a full stack in a conversation. It is what happens on a normal afternoon, on a normal desk, when the operator has a real thing to build and a standard that the thing has to survive.

The operator opens a conversation. They describe the outcome, not the implementation. The agent returns something that looks right. The operator reads the diff. They find three things that are wrong and two that are acceptable. They reject the wrong ones, accept the acceptable ones, and ask for a revision. The agent revises. The operator reads again. This time there is one real problem and one cosmetic issue. They fix the real problem themselves and tell the agent to handle the cosmetic one. The thing ships.

That afternoon is not impressive to watch. It looks like a person reading code, making judgments, and slowly steering a piece of software toward a standard. The speed is real. The supervision is realer.

## Chapter promise

By the end, the reader should understand:

- What vibe coding actually looks like on a normal day, stripped of the demo version
- Why "shipped fast" stopped being a moat and what replaced it
- The difference between prompting for something that looks right in a conversation and prompting for something that has to stay up
- Why the operator still has to know enough to catch the moment the agent is lying

## Core argument

### The demo is not the product

The easiest thing to generate is a demo. The model has seen every demo pattern in its training data. It knows the happy path. It can produce something visually correct in a few shots. What it does not naturally produce is the boring work that makes something survivable: error handling, input validation, rate limits, audit logs, the decisions that make a system boring in the way that makes it safe.

The gap between "looks right in the conversation" and "stays up in the world" is where the work moved. Fast is the baseline now. The scarce resource is judgment.

### Prompting for demos vs. prompting for stability

A demo prompt is easy to write and easy to satisfy. A stability prompt has to name the things that fail in practice: missing data, abuse, edge cases, credential handling, the behavior when the agent is wrong. The operator has to ask for those things explicitly, and then has to check whether they landed.

This is not a limitation of the model. It is a difference in what is being asked. The model will do what it is told to do. The operator has to tell it to do the things that make the result durable.

### Why you still have to know enough to catch the lie

The hardest part of vibe coding is not the prompting. It is the reviewing. The agent will sometimes sound confident about something that is wrong. It will generate code that looks right and fails in a way that is easy to miss if the operator is not paying attention.

The more the operator relies on the agent, the more important it becomes that the operator can catch the moment the agent is lying. This is not about having the model do less. It is about the operator doing a different job: auditor, taste-maker, the person who says "this looks right but it is not" and then proves it.

If the operator cannot do that, they are not vibe coding. They are trusting.

## Working example / proof case

The operator builds a small internal tool. The first pass generates the visible interface and the happy path. The operator reviews and finds that the tool does not handle the case where the data source is empty, does not validate the input, and does not log what it did. The operator asks for those three things. The agent adds them. The operator reviews again and finds that the validation is too strict for the real data. They adjust the rule. The tool ships.

The shipping moment is not dramatic. It is the moment when the operator decides the thing is good enough to be used, and takes responsibility for that decision.

## What can go wrong

- **Failure mode:** The operator accepts a confident wrong answer because they do not know enough to catch it.
- **Why it happens:** The operator treats the agent as an oracle instead of a worker. The agent sounds right. The operator does not check.
- **How to detect it:** The operator cannot explain why the thing works. The operator cannot predict what happens when the input is unexpected.
- **How the human responds:** The human slows down, reads the diff, tests the edge cases, and refuses to ship until they can say why the thing is safe.

## Why this matters in 2026

Vibe coding is a real shift in what the human does, but it is not a replacement for competence. The person who can only prompt and not review will ship garbage faster than ever. The person who can prompt and review will ship better things faster than ever.

The difference is not the tool. The difference is the human's ability to tell the difference between a good result and a convincing result.

## Counterargument / skeptical reader

A technically informed critic would say that this is just another layer of abstraction and that the operator is still doing the same work, only indirectly. That is partially true. The operator is still reviewing code, still making judgments, still deciding what is good enough. The difference is that the operator is no longer typing every line. They are directing the work and reviewing the result.

The critic would also say that the operator who cannot review is dangerous. That is true. The operator who cannot review should not be vibe coding. They should be learning to review.

## Operator rule

Know enough to catch when the agent is lying.

## Measurable test

Can the operator explain why the thing works? Can the operator predict what happens when the input is unexpected? Can the operator read a diff and find the thing that is wrong without running it? If the answer to any of those is no, the operator is not ready to vibe code that thing.

## Evidence ledger

- Claim: Fast is the baseline. Judgment is the scarce resource.
  - Source / artifact: Chapter 1, opening scene and core argument
  - Last checked: Draft
- Claim: The agent will do what it is told. The operator has to tell it to do the durable things.
  - Source / artifact: Chapter 1, "Prompting for demos vs. prompting for stability"
  - Last checked: Draft
- Claim: The hardest part is reviewing, not prompting.
  - Source / artifact: Chapter 1, "Why you still have to know enough to catch the lie"
  - Last checked: Draft

## Closing image

The operator closes the conversation. The thing is shipped. The operator does not feel like they coded it. They feel like they directed it, reviewed it, and took responsibility for it. That is the difference.
