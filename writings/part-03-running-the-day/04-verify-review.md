# Verify and Review

> **Status:** Draft for review
> **Part:** part-03-running-the-day
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/60
> **Target length:** 2,500–4,000 words

## The finished-looking branch was not the finished chapter

The branch was clean. That was the first thing it tried to tell me.

I had pulled `main`, created `chapter/60-verify-review`, and opened the canonical template. The file had a title, an issue link, an editorial hook, a promise, a list of empty sections, an operator rule, and a checklist. It looked like a chapter because the headings were already there. It was not a chapter. It was a set of unanswered questions wearing Markdown syntax.

That distinction is easy to miss when work arrives quickly. A pull request can have a green check. A document can have the requested headings. An agent can report that it completed the task. None of those facts proves that the result is acceptable. They prove only that some visible conditions have been met.

The real work begins when I ask what the artifact is supposed to do, what evidence supports it, what it leaves out, and who has the authority to accept it. Verification is not a ceremonial look after production. Review is not a mood applied to a finished thing. They are the part of the work that turns an output into an outcome.

The rule for this chapter is simple: **a finished-looking answer is not a finished outcome.**

## What this chapter is for

By the end, you should be able to:

- separate an output from the result it was meant to produce;
- verify a claim, artifact, or change against an explicit acceptance test;
- review agent work without confusing fluent explanation with evidence;
- identify the point where a human must reject, narrow, or approve the work; and
- leave a record that lets another person understand what was checked and what remains uncertain.

This is not a demand that a human inspect every keystroke. It is a demand that someone with the authority to say no inspect the things that matter. Machines can compare files, run tests, check links, and search for patterns. They cannot make responsibility disappear by returning a complete-looking answer.

## Verification is a question, and review is a decision

The two words are often used together, but they do different jobs.

**Verification** asks whether a claim or artifact matches a stated condition. Does the link resolve? Does the test pass? Is the cited number present in the source? Does the change affect only the files it was supposed to affect? Verification is strongest when the condition is explicit and the check can be repeated.

**Review** asks whether the conditions themselves are adequate and whether the result should be accepted. Is this the right source? Is the example honest? Is the scope safe? Does the change solve the actual problem, or only satisfy the wording of the request? Review includes judgment about meaning, risk, and consequence.

A spell checker can verify that a word is present. It cannot review whether the sentence makes a false promise. A test can verify that a function returns the expected value for its fixtures. It cannot review whether the function should have been allowed to touch production data. A model can verify that a template contains all its headings. It cannot review whether the chapter has earned its personal opening.

The distinction matters because agents are very good at producing the appearance of completion. They can fill every blank. They can summarize a source they did not actually inspect. They can say “all checks passed” when the check covered only the happy path. The response is not to distrust every automated result. It is to give every result a boundary.

Ask four questions:

1. **What exactly was checked?**
2. **Against which version, source, or acceptance condition?**
3. **What was not checked?**
4. **Who decides whether the remaining uncertainty is acceptable?**

If the answer to the fourth question is “the agent,” the workflow has confused assistance with authority.

## A reviewable artifact has a target and a test

Review becomes vague when the work is vague. “Make the chapter better” does not tell a reviewer what to inspect. “Draft the canonical chapter in the named file, open with a real proof case, include a working example and a failure mode, explain why it matters in 2026, source load-bearing claims, and finish with one operator rule and one measurable test” is reviewable.

The repository makes that difference visible. Issue #60 names the target file and the required sections. The editorial guidance adds the boundaries: this is one of twenty canonical chapters, the archived outline is not the queue, reader-facing headings should be sentences, the prose should be first person without invented experience, and load-bearing claims need a source checked by the drafter. Those instructions are not administrative overhead. They are the acceptance test's raw material.

A useful acceptance test has five parts:

- **Artifact:** what must exist and where it must live.
- **Scope:** what the work includes and what it must not rewrite.
- **Evidence:** which claims, behaviors, or decisions need support.
- **Quality:** what “good enough” means in this context.
- **Authority:** who accepts it and what happens when the test fails.

The authority clause is the one people leave out. A test that fails is not a neutral fact. Someone has to decide whether to fix the work, reduce the claim, ask for more evidence, or stop the project. The machine can report the failure. The human owns the response.

## The working example is the review loop itself

The proof case for this chapter is the repository change in front of me. The input is the open canonical issue, the current `main` branch, the matching template, the editorial guidance, neighboring chapters, and sources for any external claim. The output is not “some prose.” It is a committed Markdown file that another person can inspect in a pull request.

The loop has distinct stages.

**First, establish scope.** I check the open issue, ignore historical outline tickets, pull `main`, and create a branch named for the issue. This prevents a common failure: doing good work in the wrong file or against an obsolete tree. The branch is evidence of isolation, not evidence that the work is correct.

**Second, read the contract before producing the artifact.** The template says the chapter must include a proof case, plain-language mechanics, failure and response, a 2026 section, a skeptical-reader section, an evidence ledger, an operator rule, and a measurable test. The guide says not to invent a lived experience. A polished opening that violates that rule is not a strong opening. It is a failed requirement.

**Third, separate claims from sentences.** A paragraph may contain several claims: what a tool does, what a workflow permits, what a study measured, and what I conclude from it. The sentence can sound like one thought while carrying four different burdens of proof. I mark the claims that need artifacts or sources. If I cannot support one, I narrow it or remove it. “This workflow can be checked against the repository” is different from “this workflow prevents defects.” The first can be demonstrated here. The second would require evidence this chapter does not have.

**Fourth, review the example for decision points.** An example is not working merely because it has a beginning and an end. It must show the input, the operation, the output, the failure, and the human choice. In this chapter, the human choices include selecting the canonical issue, resolving the conflict between the local guide and the template where necessary, refusing to invent a personal result, and deciding whether a claim belongs in the final prose. Those decisions are the mechanism of review, not decorative commentary around it.

**Fifth, run mechanical checks.** I check the Markdown headings, links, required phrases, approximate word count, and unchecked placeholders. These checks are valuable precisely because they are boring. They catch omissions without asking a model to admire its own prose. But a passing mechanical check still leaves the substantive review.

**Sixth, inspect the diff.** The question is not only whether the new file looks complete. It is whether the branch changed the intended file and nothing else. A review begins with the change set because the change set is the boundary of the claim: this is what I am asking another person to accept.

**Seventh, ask whether the result is publishable.** The checklist can be checked and the chapter can still be weak. Does the opening show a real operational moment? Does the explanation earn its abstractions? Does the failure teach the reader what to do? Does the conclusion return to the artifact rather than float into a slogan? Those are review questions. They require a human reading for meaning.

The result of this loop is not certainty. It is a smaller, more visible uncertainty. That is what good review provides.

## Where agents fail, and how the human catches it

The first failure mode is **completion by filling**. An agent sees empty bullets and supplies plausible prose. The document is no longer visibly incomplete, so the workflow reports progress. But the missing information has not been found. It has been replaced by confidence.

I detect this by looking for provenance. Which sentence comes from the repository? Which comes from a source? Which is an operating rule? Which is a proposed example? If the categories are indistinguishable, the prose is not ready. I respond by labeling the claim, sourcing it, narrowing it, or deleting it.

The second failure mode is **verification of the wrong property**. A test passes because the function works on the supplied example, while the actual requirement was that it preserve permissions, handle empty input, or avoid a side effect. A link checker passes because the URL resolves, while the cited page does not contain the claim. A Markdown check passes while the chapter still invents a scene.

I detect this by restating the acceptance condition in plain language before trusting the check. If the test cannot be described without naming the property it is meant to protect, it is probably checking syntax rather than outcome. I respond by adding a targeted check or acknowledging that the property requires human review.

The third failure mode is **rubber-stamping**. Review becomes a click between generation and publication. The artifact is familiar, the agent says it is complete, and the human is busy. This is especially dangerous when the workflow has been reliable for a while. Reliability creates the temptation to stop looking.

I detect rubber-stamping by examining the review record: Is there a decision? What changed after review? Which uncertainty was resolved? A review that never rejects, narrows, or asks a question may be genuine, but it may also be ceremonial. I respond by requiring the reviewer to name the acceptance condition and one thing they actually checked. The goal is not to manufacture criticism. It is to make attention visible.

The fourth failure mode is **authority leakage**. The agent is allowed to merge its own change, send the message, publish the claim, or alter the source of truth. The workflow treats a completed action as a successful outcome because no human remains between execution and consequence.

I detect this by mapping permissions rather than trusting intent. Who can write? Who can approve? Who can publish? Can the same identity do all three? I respond by separating proposal from acceptance and by keeping consequential actions behind a human decision. The narrower the permission, the less damage a mistaken completion can do.

The fifth failure mode is **review after the point of no return**. A human is shown the result only after the email was sent, the data was changed, the branch was merged, or the private material was disclosed. That is not review. It is incident response with better typography.

I detect it by locating the last reversible step. Review belongs before that step. If the workflow cannot pause there, it is not designed for accountable delegation. I respond by moving the approval boundary earlier, even if that makes the workflow feel slower.

## Why this matters in 2026

The practical change is not that machines can produce text, code, images, or decisions. The practical change is that the cost of producing a plausible artifact has fallen enough that output is no longer scarce. A person can receive ten drafts where they used to receive one. A team can generate more code than it can responsibly review. A workflow can complete its visible steps while the underlying question—should this be accepted—remains unanswered.

That changes the value of human work. The scarce skill is not merely making something appear. It is defining the condition that matters, checking the result against it, and refusing the result when the evidence is inadequate.

This is also why a baseline belongs earlier in the book. The baseline chapter says to measure the accepted result, not the impressive first draft. Verify and Review is the boundary that makes “accepted” meaningful. Execute in Parallel says to parallelize tasks, not responsibility. This chapter is where the outputs return to one accountable decision.

For an individual, the application is small and concrete. If an agent drafts a complaint, check the facts before sending it. If it prepares a job application, verify the claims, recipient, attachments, and permission to submit. If it changes a repository, inspect the diff, tests, and side effects before merge. If it summarizes a source, open the source for the sentence you plan to repeat. The amount of work varies. The boundary does not.

There is no promise here that review catches everything. A review can miss a defect. A test can be incomplete. A source can be wrong. The honest promise is narrower: explicit review makes the failure discoverable before acceptance more often than a workflow that treats fluent completion as proof.

## The skeptical reader is right about the cost

A technically informed reader may say that this process turns every simple task into paperwork. That objection deserves an answer. Verification has a cost, and not every output merits the same ceremony. A low-stakes draft with no external claims may need a quick read. A database migration, public factual claim, financial instruction, or message sent in someone else's name needs a stronger boundary.

The answer is proportionality, not universal bureaucracy. Match the review to the consequence and reversibility of the action. The more private, irreversible, external, or consequential the result, the more explicit the acceptance test should be. If the result is easy to undo and affects nobody else, a lightweight check may be enough. If undoing it is expensive, “the agent said it was done” is not a reasonable control.

The skeptical reader may also say that humans are not reliable reviewers. Correct. Humans get tired, confirm their expectations, and miss details. That is an argument for layered checks, not for surrendering authority. Automate repeatable comparisons. Use tests for known properties. Require a second person for high-consequence changes where appropriate. Keep the human decision focused on the things that cannot be reduced to a reliable mechanical condition.

Another objection is that a strong model may be better at review than the average human. It may be. A model can find patterns, ask useful questions, and expose omissions. It can be a powerful reviewer. But “better at finding issues” is not the same as “owns the consequence.” The model can recommend rejection. The accountable person still decides what risk the organization, customer, reader, or affected individual is being asked to accept.

What remains uncertain is measurable at the workflow level: which checks catch which failures, how much review time they add, and where human attention produces the largest reduction in consequential mistakes. That is why the test below records rejected or revised results instead of celebrating output volume.

## Operator rule

**A finished-looking answer is not a finished outcome.** Verify the artifact against an explicit acceptance test. Review the meaning, scope, evidence, and consequences. Keep the authority to accept, reject, narrow, or publish with a named human.

## Measurable test

For the next five comparable agent-assisted work items, record:

1. the acceptance conditions written before execution;
2. the checks that ran and the exact property each check covered;
3. the number of claims, artifacts, or changes rejected, narrowed, or revised in human review;
4. the defects or unsupported claims discovered after the first automated check; and
5. whether any consequential action occurred before the last human approval.

The workflow passes this test only when each item has a named acceptance decision, no consequential action occurred before the approval boundary, and every rejected or revised result has a recorded reason. Compare the accepted-result time with the previous baseline. If review time rises but consequential defects fall, that is a tradeoff to evaluate—not proof of failure. If output volume rises while acceptance becomes less explainable, the workflow got busier, not better.

## Evidence ledger

- **Claim:** The canonical manuscript uses a twenty-chapter structure, and this chapter is assigned to `writings/part-03-running-the-day/04-verify-review.md`.
  - **Source / artifact:** `writings/EDITORIAL-GUIDANCE.md`, `writings/MANUSCRIPT-ARCHITECTURE.md`, and canonical issue #60.
  - **Last checked:** September 24, 2026.

- **Claim:** Issue #60 requires a proof case, plain-language mechanics, failure modes, “Why this matters in 2026,” a skeptical-reader response, an evidence ledger, an operator rule, and a measurable test.
  - **Source / artifact:** GitHub issue #60 and the chapter template in this repository.
  - **Last checked:** September 24, 2026.

- **Claim:** The repository guidance requires first-person prose without invented experiences and requires load-bearing claims to name a source checked by the drafter.
  - **Source / artifact:** `writings/EDITORIAL-GUIDANCE.md` and `C:/Users/jjohn/workspace/book/human-2.0-book-guide.md`.
  - **Last checked:** September 24, 2026.

- **Claim:** A pull request, branch, checklist, or passing mechanical check is evidence about a limited condition, not proof of the entire outcome.
  - **Source / artifact:** Editorial analysis of the workflow in this chapter; no external empirical claim.
  - **Last checked:** September 24, 2026.

- **Number, date, price, or product behavior:** No external numerical, price, or product-behavior claim is used as evidence. The five-item measurable test is a proposed operator measurement, not a reported result.
  - **First-party source:** This chapter’s test specification and repository artifacts.
  - **Last checked:** September 24, 2026.

## The branch is not the proof; the decision is

The branch is clean again. The headings are filled. The file can be committed and shown to another person. Those facts matter, but they are still only the outside of the work.

The proof is in the boundary: what the chapter claims, where the claims came from, what the checks actually checked, what was refused, and who accepted what remained. That same boundary follows an agent-built change, a generated memo, a submitted application, or a message waiting in an outbox.

A machine can make the answer arrive before the question has settled. Review is the pause that puts the question back in charge. Not a pause for ceremony. A pause to ask whether the thing in front of us is true enough, safe enough, and ours to send into the world.

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
- [ ] Publisher review pass
