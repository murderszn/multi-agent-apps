# Vibe-Coded Apps Get Hacked. That's the Product.

> **Status:** Draft
> **Part:** part-02-field-essays
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/55
> **Target length:** 2,500–4,000 words

## Editorial hook

Shipping fast is easy. Shipping something that doesn't leak credentials is the actual work.

## Opening scene

The app ships fast. The demo works. The agent generated the code in a few shots. The operator is pleased. The operator deploys.

The app leaks a key.

This is not a surprise. It is the predictable outcome of fast-shipped code. Vibe-coded apps have a predictable security profile. They are often sloppy about credentials, about authentication, about dependencies, about input validation, about the things that do not show up in the happy-path demo. The speed of generation makes it easy to produce a lot of code quickly, and the speed of generation makes it easy to miss the boring security details that matter when the app is exposed to the world.

This is not an argument against vibe coding. It is an argument for treating security as part of the loop, not as an afterthought. The app that ships fast and leaks a key is not a success. It is a failure with a faster timeline.

## Chapter promise

By the end, the reader should understand:

- The security profile of fast-shipped code and why it is predictable
- How Cerberus and similar tools fit into the agent workflow as a conversation, not a PDF
- Why the new loop is generate, review, fix, merge
- Why security has to be a step in the workflow, not a gate at the end

## Core argument

### The security profile of fast-shipped code

Vibe-coded apps have a predictable security profile. They are often sloppy about credentials, about authentication, about dependencies, about input validation, about the things that do not show up in the happy-path demo.

The speed of generation makes it easy to produce a lot of code quickly. The speed of generation makes it easy to miss the boring security details that matter when the app is exposed to the world.

This is not an argument against vibe coding. It is an argument for treating security as part of the loop. The app that ships fast and leaks a key is not a success. It is a failure with a faster timeline.

### Cerberus: review the repo, talk to the findings, patch, open a real PR

The security review in an agent workflow is not a PDF. It is a conversation.

The operator runs the review tool — Cerberus, in the lab's case — against the repo. The tool produces findings. The operator talks to the findings with the agent. The operator decides which ones matter. The operator patches the ones that do. The operator opens a real PR that documents what changed and why.

The review is a step in the workflow, not a separate audit that happens after the work is "done." The new loop is: generate, review, fix, merge. The security review is one of the review steps. It is not special. It is just the step where the operator checks for the things that would make the app dangerous instead of just incomplete.

### Security as a conversation with the agent

The old model of security review was a gate at the end — a person in a different department goes through the code and writes a report. The new model is a conversation that happens during the build.

The agent that wrote the code is the agent that patches it. The human reviews the findings and the patches and decides what to merge. The loop is tight, and the feedback is immediate.

This is better than the old model for one reason: the person who writes the code is the same context as the person who fixes it. The security review is not a handoff to a different team. It is a step the same agent-and-human pair runs before the work leaves the desk.

## Working example / proof case

The operator builds a small app. The app works. The operator deploys it. The operator runs Cerberus against the repo. Cerberus finds a hardcoded credential, an input validation gap, and a dependency with a known vulnerability. The operator talks to the findings with the agent. The operator decides that all three matter. The agent patches all three. The operator reviews the patches. The operator merges the patches. The app is safer than it was before the security review.

The security review took a few minutes. It was a conversation. It was a step in the workflow. It was not a separate audit.

## What can go wrong

- **Failure mode:** The operator ships the app without running the security review, and the app leaks a credential.
- **Why it happens:** The operator is excited about the speed. The operator treats the security review as optional. The operator does not want to slow down.
- **How to detect it:** The operator cannot say what the security review found. The operator has not run the security review. The operator is deploying without reviewing.
- **How the human responds:** The operator runs the security review as a standard step in the workflow. The operator does not deploy without reviewing. The operator accepts that the review is part of the work.

## Why this matters in 2026

The volume of agent-written code is going up. The security review has to keep up. The way to keep up is not to slow the build. It is to make the security review a standard step in the loop, run by the same agents that wrote the code, reviewed by the same human that owns the outcome.

The apps that survive are the ones where security is part of the workflow, not a scramble after a leak.

## Counterargument / skeptical reader

A critic would say that the security review is a gate that slows down the build, and that the speed of vibe coding is the point. That is wrong. The speed is the baseline. The security review is what makes the speed useful. An app that ships fast and leaks a key is not a success. It is a failure with a faster timeline.

The critic would also say that the security review is a job for a security professional, not for the operator. That is true for high-stakes systems. For the small apps that the operator is building, the security review is a step the operator can run and review. The operator does not need to be a security professional to run a standard review and patch the findings.

## Operator rule

Run the security review as a standard step. Review the findings. Patch the ones that matter. Merge the patches. Do not deploy without reviewing.

## Measurable test

Has the operator run the security review? Can the operator name the findings? Can the operator explain which findings were patched and why? Can the operator say what the app's security profile is before and after the review? If the answer to any of those is no, the operator is not treating security as part of the loop.

## Evidence ledger

- Claim: Vibe-coded apps have a predictable security profile.
  - Source / artifact: Chapter 7, "The security profile of fast-shipped code"
  - Last checked: Draft
- Claim: The security review is a conversation, not a PDF.
  - Source / artifact: Chapter 7, "Cerberus: review the repo, talk to the findings, patch, open a real PR"
  - Last checked: Draft
- Claim: The new loop is generate, review, fix, merge.
  - Source / artifact: Chapter 7, "Security as a conversation with the agent"
  - Last checked: Draft

## Closing image

The operator runs Cerberus. The findings come back. The operator talks to the findings with the agent. The operator patches the ones that matter. The operator merges the patches. The app is safer than it was before. The security review was a conversation. It was a step in the workflow. It was not a separate audit.
