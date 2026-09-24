# Human 1.0: The Baseline Before the Lab

> **Status:** Draft for review
> **Part:** part-03-running-the-day
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/57
> **Target length:** 2,500–4,000 words

## Editorial hook

At 9:00, the workday looks available. The document is open. The code editor is open. The inbox is quiet enough to pretend it is quiet. Then the first meeting starts, a message arrives, a second meeting moves, and the work that mattered becomes the work that can be squeezed between other people's calendars.

This is the baseline we usually skip. We say an agent made us faster, but we cannot say faster than what. We say a swarm gave us leverage, but we did not record how long the old workflow took, where it broke, or what “done” meant before the machinery arrived.

Before Human 2.0, there is Human 1.0: one accountable person carrying intent, context, prioritization, execution, verification, and memory in one head and one calendar. It is not an insult. It is the starting measurement.

## Chapter promise

By the end of this chapter, you will have a practical baseline for work before delegation:

- the smallest useful unit of work, from request to accepted result;
- the time, interruptions, decisions, rework, and defects that baseline contains; and
- a test for whether an agent improves the system rather than merely making activity look faster.

The promise is deliberately modest. This chapter will not tell you that an agent will save a fixed percentage of your day. That number depends on the work, the tools, the review burden, and the cost of being wrong. It will show you how to find out without trusting a demo.

## Opening scene

The artifact is usually not a dashboard. It is a half-finished thing.

A pull request with a polite title and a red check. A memo with three versions in its filename. A spreadsheet whose owner has gone home but whose assumptions live only in a chat thread. A folder full of screenshots because nobody knows which state is current. The operator remembers why the work began, what changed halfway through, and which shortcut is unsafe. The artifact remembers none of that.

I have learned to treat the end of a workday as evidence. Not as a verdict on discipline, and not as a personality test. Look at what remains open. Count the handoffs. Find the decisions that were made without being written down. Notice where the same question was answered twice because the answer was stored in a person's working memory instead of in the work itself.

The old workflow is not “a human types into a computer.” It is a chain:

1. Someone states an outcome, often imperfectly.
2. One person interprets the request and decides what it includes.
3. That person finds the relevant context.
4. The person performs the work across tools.
5. The person decides whether the result is acceptable.
6. The person explains the result to someone else.
7. The person carries the remaining uncertainty into tomorrow.

Every step can be reasonable. The chain can still be expensive. The expense is not only keystrokes. It is retrieval, switching, waiting, correction, and the invisible tax of being the only place where the whole problem is assembled.

The first useful question is therefore not “Which agent should I use?” It is “What exactly did I do last time, and what did it cost?”

## Core argument

The baseline is part of the product.

If you do not record the before-state, you cannot distinguish improvement from novelty. A new tool can make a task feel easier while adding review work later. It can reduce drafting time while increasing the number of plausible mistakes. It can produce more output while making the operator less certain about which output deserves trust.

A baseline also protects human judgment. When the human is the only worker, responsibility is obvious but the process is often blurry. When agents enter, the process becomes distributed, and blurry responsibility becomes dangerous. You need to know which decisions were yours before you decide which decisions may be delegated.

The practical unit is a bounded work item: a request with an owner, an input, an acceptance test, and an artifact. “Improve the launch” is not a unit. “Turn these five customer notes into a one-page brief, preserve direct quotes, link each recommendation to a note, and get the owner’s approval” is a unit. It can be timed. It can fail visibly. It can be reviewed.

## Concepts and terms

### Baseline

A baseline is a recorded description of the current workflow before a change. It is not one magic number. For a work item, record elapsed time, active work time if you can estimate it honestly, interruptions, waiting, decisions, handoffs, rework, and defects found in review.

Do not pretend these measures are cleaner than they are. “Active work time” is often an estimate. Mark it as an estimate. If you cannot measure it consistently, use elapsed time and record the conditions around it.

### Context

Context is the information needed to make a decision: source files, prior decisions, constraints, examples, credentials, definitions, and the reason the work matters. Context is not the same as volume. A long transcript can contain less usable context than a short acceptance checklist.

### Acceptance test

An acceptance test is the evidence that lets a human say the work is done. It can be a passing test suite, a reconciled total, a cited source list, a visual comparison, or an explicit approval. “Looks good” may be a human judgment, but it is a weak test unless the reviewer says what good means.

### Rework

Rework is effort spent correcting or redoing a result because it missed the request, violated a constraint, or failed review. It belongs in the baseline. A draft produced in ten minutes and corrected for an hour did not take ten minutes.

### Decision load

Decision load is the number and difficulty of choices the operator must make to move the item forward. It includes scope decisions, tradeoffs, exceptions, and calls about whether a result is safe to accept. Agents may reduce mechanical effort while leaving decision load untouched. That is not failure. It is information.

## Working example / proof case

Use a small work item, not a heroic one. For this chapter, the proof case is a repository change: take an existing Markdown chapter template, turn it into readable prose, add evidence, and prepare it for review.

The input is the template and its issue definition. The tools are the repository, Git, a text editor, command-line checks, and public documentation. The output is a committed Markdown file and a reviewable diff. The human decision points are the important part: which claims are supported, which examples are real, which sections belong in the chapter, and whether the requested length is compatible with the evidence.

A baseline log can be plain text:

| Field | Record before changing the workflow |
|---|---|
| Work item | One bounded chapter draft |
| Start / stop | Timestamp both; do not reconstruct from memory later |
| Inputs | Template, issue, repository evidence, primary sources |
| Acceptance test | Required sections complete; claims sourced; copy and technical checks pass |
| Interruptions | Count them and name the kind: message, meeting, lookup, waiting |
| Decisions | Record scope, evidence, exclusions, and unresolved questions |
| Rework | Record changes after self-review and reviewer feedback separately |
| Defects | Count unsupported claims, broken links, formatting failures, or missing requirements |
| Human review | What did the human verify and what remains uncertain? |

This log changes the work before any agent is added. It turns a vague chore into an inspectable object. It also reveals where delegation might actually help. Research retrieval may be separable from argument. Formatting may be mechanical. Claim checking may be assisted. The editorial judgment is not automatically separable merely because a model can generate sentences.

The first attempt will not be clean. The writer may discover that the template says 2,500–4,000 words while the repository guide says 1,500–3,000. That conflict is itself a baseline finding. It must be surfaced and resolved by the responsible human; an agent should not silently pick the more convenient instruction. A source may describe a survey rather than a measurement. A product page may describe capability rather than behavior under your conditions. A generated paragraph may sound personal even though nobody lived it. Those are not small editorial defects. They are boundary failures.

What failed, then? The fantasy that the work begins with writing. It begins with interpretation. It also fails when the operator records only the final duration and omits waiting, review, and corrections. Finally, it fails when the person treats a polished artifact as proof that the process was sound.

The human response is to keep the item bounded, write down the acceptance test, and stop when the evidence runs out. A baseline is not bureaucracy added around the work. It is the work's first safety rail.

## What can go wrong

- **Failure mode: measuring only production speed.**
  **Why it happens:** typing and generation are visible; verification and rework are delayed.
  **How to detect it:** compare first-draft time with accepted-result time.
  **How the human responds:** report both, and include defects discovered after the draft.

- **Failure mode: making the baseline too elaborate to maintain.**
  **Why it happens:** the operator tries to measure everything before learning what matters.
  **How to detect it:** the log takes longer than the work item or is filled in from memory.
  **How the human responds:** keep five fields for the next run—elapsed time, interruptions, decisions, rework, and acceptance result.

- **Failure mode: treating personal memory as shared context.**
  **Why it happens:** the original operator can fill gaps quickly.
  **How to detect it:** another person cannot reproduce the decision from the artifact.
  **How the human responds:** write the constraint and the reason into the work item.

- **Failure mode: delegating before defining authority.**
  **Why it happens:** “the agent can handle it” replaces a specification.
  **How to detect it:** nobody can answer what the agent may change, what it may not touch, and who approves the result.
  **How the human responds:** define permissions, escalation conditions, and the acceptance test before execution.

- **Failure mode: inventing a before-state.**
  **Why it happens:** a clean number makes the later comparison persuasive.
  **How to detect it:** the number has no timestamp, artifact, or method.
  **How the human responds:** label it unknown and run a measurement cycle. Unknown is more useful than false precision.

## Why this matters in 2026

The pressure to skip the baseline is now industrial. Microsoft’s 2025 Work Trend Index reports that, in its Microsoft 365 telemetry, employees were interrupted every two minutes during core work hours—275 interruptions a day—by meetings, email, or chats. The same report says 60% of meetings were ad hoc and that PowerPoint editing rose 122% in the final ten minutes before a meeting. Those are Microsoft’s operational definitions and rolling measurement windows, not universal laws of work. They are still a useful description of the environment many knowledge workers are being asked to improve.

In that environment, an agent can be valuable simply by protecting a boundary: collecting inputs before a focus block, turning a request into a checklist, or preparing a review packet. But the same environment makes bad measurement easy. If the agent drafts while the human is in meetings, elapsed time may fall without attention becoming available. If the system sends more messages, it may reduce one queue while increasing interruption load elsewhere.

The current moment also rewards claims that are narrower than the marketing. GitHub’s published Copilot research described a controlled experiment in which developers using Copilot completed a specified coding task faster than the control group. That is evidence about that task and study design; it is not proof that every developer, repository, or software problem becomes faster. The transferable lesson is methodological: name the task, the comparison, and the acceptance condition.

A baseline is how an operator keeps 2026’s abundance of tools from becoming an abundance of unverified output. It is also how a small team can decide whether to adopt a tool without confusing adoption with value.

## Counterargument / skeptical reader

**“I know my work. I do not need a stopwatch to tell me whether a tool helps.”**

Sometimes that is true. If the tool removes an obvious repetitive action and the result is checked by a reliable test, formal measurement may be unnecessary. The cost of measurement can exceed the likely benefit.

But this argument weakens as the work becomes more ambiguous, consequential, or distributed. Human intuition is good at noticing a dramatic improvement and bad at accounting for hidden rework, selection effects, and delayed defects. A tool that feels fast can become expensive when it changes what gets attempted, what gets reviewed, or what gets trusted.

The answer is not permanent surveillance. It is a short measurement cycle. Pick a bounded item. Run the old or current workflow enough times to establish a range, not a mythical perfect average. Introduce one change. Keep the acceptance test stable. Record what failed. Stop measuring when the decision is clear. If the result is uncertain, say so.

The skeptical reader is also right about one thing: a baseline can become theater. A spreadsheet of activity is not an explanation of value. The measure must serve a decision—adopt, adapt, reject, or investigate—not decorate a presentation.

## Operator rule

**Do not claim an upgrade without recording the baseline.** Record the accepted result, not the impressive first draft. Keep human ownership of the acceptance test and of every unresolved uncertainty.

## Measurable test

For the next five comparable work items, record elapsed time, interruptions, decisions, rework, and whether the acceptance test passed on the first review. Then change one part of the workflow—one tool, one delegation boundary, or one context packet—and record the same fields for five more comparable items.

Call the change an improvement only if all of the following are true:

1. accepted-result time falls or stays within the previous range;
2. first-review defects do not increase; and
3. the operator can explain the result and reproduce the acceptance decision from the artifact.

If any condition fails, the result is not “the agent failed” or “the human resisted.” It is a signal to inspect the boundary: scope, context, permissions, review, or measurement.

## Evidence ledger

- **Claim:** Employees were interrupted every two minutes during core work hours, or 275 times per day, by meetings, emails, or chats.
  - **Source / artifact:** Microsoft, *2025 Work Trend Index: The Year the Frontier Firm Is Born*, Microsoft 365 telemetry methodology and findings: https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born
  - **Last checked:** September 24, 2026. This is a Microsoft-reported telemetry result, not a universal population estimate.

- **Claim:** 60% of meetings were ad hoc; PowerPoint edits rose 122% in the final ten minutes before a meeting.
  - **Source / artifact:** Microsoft, *2025 Work Trend Index*, cited telemetry definitions and rolling windows at the source above.
  - **Last checked:** September 24, 2026. Treat as reported study findings with the source’s population and method, not as a claim about every workplace.

- **Claim:** GitHub published a controlled Copilot experiment comparing developers completing a specified coding task with and without Copilot.
  - **Source / artifact:** GitHub Blog, “Research: quantifying GitHub Copilot’s impact on developer productivity and happiness,” September 7, 2022: https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/
  - **Last checked:** September 24, 2026. The chapter uses this as an example of bounded evidence, not a general productivity guarantee.

- **Claim:** A bounded work item needs an input, owner, acceptance test, and artifact to be measured responsibly.
  - **Source / artifact:** Editorial operating rule derived from the chapter’s workflow analysis; not presented as an external empirical finding.
  - **Last checked:** September 24, 2026.

## Closing image

At the end of the day, the half-finished artifact is still on the desk. The difference is that it now has a timestamp, an owner, a stated test, and a note about what remains unknown. That is not yet an agent. It is something more basic: a human system that can be observed.

Only after that can the machine earn a place in the chain. Not because it produced a faster sentence, and not because the dashboard turned green, but because the operator can point to the old cost, the new result, and the evidence between them.

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
