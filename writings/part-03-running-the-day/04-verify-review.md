# Verify and Review

> **Status:** Draft for review
> **Part:** part-03-running-the-day
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/60
> **Target length:** 2,500–4,000 words

The diff looked finished.

The headings were in place. The prose was smooth. The links were formatted. The checklist at the bottom had green boxes all the way down. It was the kind of file that invites the human to nod, commit, and move on.

I did not have a verified chapter. I had a plausible artifact.

That distinction is easy to miss when an agent has done the visible work. The agent has read the issue, inspected the repository, gathered sources, and returned a clean-looking document. The temptation is to treat review as a ceremony after the real work. Read the diff quickly. Confirm that nothing looks absurd. Click approve.

But review is not the last polite step before shipping. Review is where the requested work becomes an accountable result. It is where I ask whether the artifact says what the request required, whether its claims can be supported, whether the tests actually exercise the change, and whether anything outside the intended boundary moved with it.

A finished-looking answer is not a finished outcome.

## The difference between plausible and proved

Verification is not a mood. It is a comparison between a claim and evidence.

A generated chapter claims that it answered the issue. The issue and template are the evidence to compare against.

A code change claims that it works. Tests, inspection, and the behavior of the running system are the evidence.

A research note claims that a source supports a sentence. The source itself is the evidence.

A task report claims that something was submitted, deployed, or updated. The external receipt, changed state, or independent log is the evidence.

The claim can be true and still be incomplete. A test can pass while the wrong feature was implemented. A document can contain accurate sentences while failing to answer the assignment. A deployment can succeed while the application serves the old asset. Verification has to check both the artifact and the boundary around it.

That is why “does it look good?” is a weak review question. It asks for an impression. A stronger review asks:

- What did we promise to change?
- What evidence would show that the promise was kept?
- What evidence would show that we changed something we were not supposed to change?
- What remains unknown?

Those questions are slower than approval. They are cheaper than discovering the error after the artifact has acquired an audience.

## Review begins with the request

The first review surface is not the output. It is the request.

In this repository, the request for this chapter names a canonical file, a target length, a proof case, plain-language mechanics, failure modes, a section called “Why this matters in 2026,” a skeptical-reader response, an evidence ledger, an operator rule, a measurable test, and quality checks. Those requirements are acceptance criteria. They are not suggestions to remember after the prose is written.

I turn them into a small review sheet before I read the draft:

| Requirement | Evidence of completion |
|---|---|
| Open with a scene or proof case | A concrete artifact, failure, or result appears before the explanation |
| Explain necessary mechanics | Terms are defined only where they help the decision |
| Include a working example | Inputs, tools, outputs, human decisions, and failure are visible |
| Explain failure | Detection and human response are stated |
| Explain why now | A dated, attributed current-practice section is present |
| Answer the skeptic | The strongest objection is named and answered honestly |
| Complete the ledger | Numbers, dates, prices, and product behavior have checked sources |
| State the rule and test | One operational rule and one measurable comparison are explicit |

The sheet does two things. It prevents a fluent draft from quietly replacing the assignment, and it gives the reviewer a reason for every requested change. “I didn’t like this” is not a review method. “The issue requires a measurable test and the file currently has only advice” is one.

The same principle works in software. Start with the ticket, acceptance criteria, threat model, or user story. Do not let the changed files redefine success after the fact. If the request is unclear, stop and resolve the ambiguity. An agent should not silently choose the interpretation that is easiest to complete.

## Read the diff before reading the story

A diff is an argument about what changed. Read it before allowing the surrounding explanation to persuade you.

In Git, the diff shows additions, deletions, and modifications relative to another state. The command is simple. The discipline is not. I want to know the comparison point, the files included, and the shape of the change before I decide whether the prose describing it is credible.

For a repository change, I use a sequence like this:

1. Confirm the branch and base commit.
2. Inspect the changed-file list.
3. Read the diff in manageable sections.
4. Check for generated files, secrets, unrelated edits, and accidental deletions.
5. Run the relevant checks.
6. Read the final artifact as a user, not only as a patch.

The order matters. If I read a long agent summary first, I begin looking for confirmation of its explanation. The diff gives me a colder first impression. It shows whether one file changed or twelve, whether a supposedly small edit moved a large block, and whether a “documentation-only” change altered an example, link, command, or security instruction.

The changed-file list is often the first useful surprise. A worker can modify a neighboring file because it found a related improvement. That improvement may be good and still be out of scope. Scope is a safety boundary. Unrequested changes increase the number of things the human must understand before approval.

For prose, the equivalent of an accidental file change is an accidental argument. A draft may begin with verification and drift into a general survey of agents, productivity, or safety. The sentences can be individually reasonable. The chapter can still fail because it spent its evidence budget on a different book.

## The working example is the review instrument

The most useful review is not a list of abstract principles. It is a replay of one work item.

For this chapter, the work item is visible in the repository. The input is the canonical issue and Markdown template. The surrounding inputs are the editorial guidance, the manuscript architecture, adjacent chapters, and first-party documentation about reviewing and diffs. The output is this chapter on a branch, with a commit and a proposed pull request. The human decision points are scope, evidence, voice, what not to repeat, and whether the closing test can actually be run.

That replay gives me a path through the artifact:

- Did the selected issue really identify this file?
- Did the draft preserve the canonical twenty-chapter structure rather than revive archived outline material?
- Does the opening show a concrete review problem instead of beginning with a definition?
- Does the chapter explain enough mechanics to help a reader review, without teaching Git or testing from scratch?
- Does the example show what the human checked and what failed?
- Can the reader perform the measurable test at the end?

If I cannot answer those questions from the artifact and its sources, the chapter is not ready. The answer cannot be “the agent probably did that.” Verification is the act of removing “probably.”

The same replay works for an application, a code change, or a financial workflow. Start with the input. Trace the transformations. Identify the point where a human authorized a consequential action. Find the external evidence that says the action occurred. Then compare the final state with the requested state.

A reviewer is not merely looking for defects. A reviewer is reconstructing causality.

## What to check when the output looks right

The dangerous outputs are not the obviously broken ones. They are the ones that pass a glance.

### Check the boundary

Was the worker allowed to do this? Did it touch only the requested files, accounts, records, or services? Did it include private material that should not be in the result?

A clean diff can still have the wrong boundary. A secret pasted into a Markdown example may be formatted perfectly. A pull request can change the intended function and also weaken an authorization check in a nearby file. A research paragraph can include a real person’s detail that the assignment never needed.

Boundary review is not distrust of the worker. It is recognition that workers optimize for completion unless the limits are explicit and enforced.

### Check the claim

What does each important sentence assert? Is it an observation, an interpretation, a recommendation, or a number that needs a source?

A claim ledger makes this visible. For every memorable number, date, price, or product behavior, record the source actually opened and the date checked. If the source does not support the sentence, narrow the sentence, attribute it, or remove it. “The documentation says the tool supports this configuration” is different from “the tool reliably behaves this way in production.” Architecture is not a measured outcome. A capability page is not a guarantee.

### Check the test

A passing check is evidence of a particular property. It does not prove every property.

A Markdown link check can show that a URL resolves. It does not show that the page supports the claim. A unit test can show that one input returns one expected value. It does not show that permissions, retries, or migrations are correct. A word-count check can show that the chapter is long enough. It does not show that the chapter is useful.

The reviewer asks what the check covers and what it leaves out. If the change is consequential, add a check that reaches the consequence or require a human approval before the irreversible step.

### Check the failure path

Most demonstrations follow the successful path. Review should spend time where the system is allowed to be wrong.

What happens when a source is unavailable? When a tool returns an empty result? When a test is skipped? When a human has not answered a required question? When the external update succeeds but the local record fails to update? When the agent cannot verify a claim?

A system that reports success after partial completion is not verified. It is hiding uncertainty. The artifact should say what failed, how the failure was detected, and who owns the next decision.

### Check the receipt

The worker’s own report is evidence about what it believes happened. It is not independent proof.

For a code change, the receipt might be a passing check tied to the exact commit, plus a readable diff. For a publication, it might be the rendered page. For an application, it might be the employer’s confirmation. For this workflow, it includes the branch, commit, pull-request URL, and issue link. The receipt has to come from the system of record or from a check that can be rerun—not only from the agent’s final paragraph.

## Where review fails

**The reviewer rubber-stamps.**

The diff is large, the description is confident, and the reviewer is busy. Approval becomes a reaction to fluency.

The signal is a review with no questions, no stated acceptance criteria, and no record of what was checked. The response is not to demand that a human reread every generated line forever. It is to make routine properties machine-checkable, keep changes small, and reserve human attention for scope, tradeoffs, privacy, and consequences.

**The test checks the implementation, not the request.**

A worker writes a test that confirms the behavior it implemented. The test passes. Nobody asks whether that behavior is the one the user needed.

Detect this by restating the acceptance criteria independently of the implementation. If the test cannot be explained in those terms, it is weak evidence. The human responds by adding an example from the request, a regression case, or an end-to-end check.

**The evidence is adjacent but insufficient.**

A draft cites a search result, a secondary summary, or a product page when the sentence makes a stronger technical claim. A reviewer recognizes the link and stops reading.

The response is to open the source and quote or paraphrase only what it supports. If the primary source is unavailable, say that the claim remains unverified. A quieter sentence is better than a memorable unsupported one.

**The review expands the scope.**

The reviewer finds three unrelated improvements and folds them into the same change. The original request becomes harder to evaluate, and rollback becomes less clear.

Track follow-up ideas separately unless they are necessary to make the requested change safe. A review is not permission to turn one bounded task into a cleanup campaign.

**The human verifies after the damage.**

An agent is allowed to publish, delete, send, or deploy, and review happens afterward. By then the receipt may exist, but the consequence cannot be undone cheaply.

Move the gate before the irreversible action. Let the agent prepare the packet. Let the human approve the action. Automate the reversible checks around it. Verification has to match the cost of being wrong.

## Why this matters in 2026

The current environment makes generation abundant and attention scarce. A person can ask a model for code, prose, research notes, test cases, and revisions in minutes. That changes the location of work. The bottleneck is less often the first artifact. It is deciding whether the artifact deserves trust.

GitHub’s public documentation describes pull-request review as a way to discuss and approve changes before they are merged. Git’s diff documentation gives the reviewer a way to compare states rather than relying on a worker’s account of what changed. OWASP’s code-review guidance treats review as a security activity, not only a style pass. These are ordinary practices, and that is the point: agents do not make them obsolete. They make skipping them easier to disguise.

The result is a new kind of operational literacy. A person does not need to become a software engineer to use an agent safely. A person does need to understand the difference between a proposal and a receipt, a test and a guarantee, a source and a citation-shaped decoration, a reversible preparation step and an irreversible action.

That literacy matters beyond code. A generated report can affect a hiring decision. A prepared email can expose private information. A suggested financial action can move money. A polished summary can become the only version executives read. In each case, the human question is the same: what evidence lets me accept this, and what would tell me that I should not?

The answer should be concrete enough for another person to reproduce. If it depends on trusting the agent’s confidence, it is not a verification method.

## The skeptical reader

A technically informed reader may object that this is just bureaucracy. If the model is good enough and the tests pass, why burden the operator with another review layer?

Sometimes the objection is correct. A review can cost more than the risk it reduces. A tiny, reversible change with a deterministic check may not need a long human inspection. The answer is not maximum process. It is proportional evidence.

But “the model is good enough” is not a boundary. Good enough for what input, under what permissions, with what failure cost? “The tests pass” is not a boundary either. Which tests, against which commit, and which behavior is still outside them?

The skeptical reader is also right that humans are not perfect verifiers. Humans get tired, miss familiar defects, and can be persuaded by fluent explanations. That is an argument for better review design, not for no review. Use small diffs. Make requirements explicit. Automate repeatable checks. Show the evidence beside the claim. Require approval before consequences that cannot be cheaply reversed. Record uncertainty instead of forcing a green status.

A verifier agent can help with the mechanical parts. It can list changed files, run checks, compare headings, find missing links, or flag claims without ledger entries. It cannot become the final authority merely by being assigned the word “reviewer.” Its report is another claim to verify, especially when the consequence belongs to a human.

What remains uncertain is workload-specific. Verification can reduce defects, but the right amount depends on the work, the evidence available, and the cost of delay. Measure the whole path to an accepted result, not the time until the first approval button becomes available.

## Operator rule

**A finished-looking answer is not a finished outcome.** Verify the request, the boundary, the evidence, the failure path, and the independent receipt before accepting the result.

## Measurable test

For the next five comparable agent-assisted work items, record:

1. the acceptance criteria written before execution;
2. time to first draft or proposed result;
3. time to accepted result;
4. defects, unsupported claims, or scope violations found during review;
5. defects discovered after acceptance;
6. whether an independent receipt existed for the consequential action.

Keep the workflow only if the accepted-result time is stable or lower, post-acceptance defects do not increase, and every consequential item has a receipt that is not merely the agent’s own report. If review takes longer, inspect whether the problem is excessive scope, weak acceptance criteria, missing automation, or a genuinely high-risk task. Do not call a faster approval an improvement if the defects moved downstream.

## Evidence ledger

- **Claim:** The canonical issue requires a proof case, failure modes, a 2026 section, a skeptical-reader response, an evidence ledger, an operator rule, and a measurable test.
  - **Source / artifact:** Repository issue #60 and `writings/part-03-running-the-day/04-verify-review.md` template.
  - **Last checked:** September 25, 2026.

- **Claim:** The manuscript’s current structure is twenty canonical chapters and the older forty-one-chapter outline is archived.
  - **Source / artifact:** `writings/EDITORIAL-GUIDANCE.md` and `writings/MANUSCRIPT-ARCHITECTURE.md`.
  - **Last checked:** September 25, 2026.

- **Claim:** Git provides a diff for comparing repository states, and GitHub documents pull-request review as collaboration around proposed changes.
  - **First-party sources:** Git documentation, https://git-scm.com/docs/git-diff; GitHub Docs, https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests.
  - **Last checked:** September 25, 2026. Pages were fetched directly during this drafting pass.

- **Claim:** OWASP treats code review as relevant to secure software practice.
  - **First-party source:** OWASP Code Review Guide, https://owasp.org/www-project-code-review-guide/.
  - **Last checked:** September 25, 2026. Page was fetched directly during this drafting pass.

- **Number, date, price, or product behavior:** No external performance number, price, or product-behavior outcome is asserted. The five-item measurable test is a proposed operator measurement, not a reported result.
  - **First-party source:** This chapter’s test specification and repository QA requirements.
  - **Last checked:** September 25, 2026.

## Closing image

The green checklist is still useful. It is just not the proof.

The proof is the request beside the changed artifact, the claim beside the source, the test beside the behavior it covers, and the receipt beside the action that mattered. It is the human being able to say not only “this looks finished,” but “I know what finished means here, and I can show why I believe it.”

Agents can produce the first answer. They can also prepare much of the evidence. The acceptance decision still belongs to the person who owns the consequence.

A finished-looking answer is not a finished outcome. The work is finished when the result, the record, and the evidence agree.

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
