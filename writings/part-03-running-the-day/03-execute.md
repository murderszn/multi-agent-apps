# Execute in Parallel

> **Status:** Draft
> **Part:** part-03-running-the-day
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/59
> **Target length:** 2,500–4,000 words

## Editorial hook

The proof is not a diagram. It is a branch.

## Opening scene

The repository gave us a queue of canonical issues, a clean `main` branch, and a single request: write **Execute in Parallel**. The first useful move was not to ask six agents for six versions of the same chapter. It was to separate the work into lanes that could be checked independently: inspect the queue, pull the current branch, read the canonical template, verify the manuscript architecture, research the mechanics, then draft against the evidence.

That sounds less dramatic than an agent swarm. It is also closer to what makes a swarm useful.

In this repository, the canonical issue for this chapter says the outline has been replaced by a tighter 20-chapter queue. Its template names the required artifacts: opening proof case, working example, failure modes, “Why this matters in 2026,” skeptical reader response, evidence ledger, operator rule, and measurable test. The surrounding manuscript architecture says the same thing in a different way: Human judgment remains accountable; agents are tools, workers, or systems—not authorities.

Those constraints are not decoration. They are the work. Once the constraints are explicit, some tasks can happen at the same time. Other tasks cannot. Research can proceed beside repository inspection. Copy editing can proceed beside link checking after a draft exists. But nobody should draft from a template they have not read, and nobody should declare a chapter complete while another process is still changing the claims underneath it.

The useful distinction is simple: **parallelize independent work; serialize decisions and shared state.**

## Chapter promise

By the end of this chapter, you should understand:

- how to decide whether a task is genuinely independent before assigning it to another agent or process;
- how to give parallel workers narrow lanes, explicit inputs, and inspectable outputs;
- why shared files, mutable branches, credentials, and final claims turn apparent speed into coordination risk;
- how to preserve one human owner for scope, tradeoffs, evidence, and consequences.

## Core argument

Parallel execution is not “more agents everywhere.” It is a controlled arrangement in which several workers make progress at once without silently making the same decision twice.

Three ideas matter.

First, **independence is a property of inputs and outputs, not of job titles**. “Research,” “draft,” and “review” may sound like separate jobs, but research and drafting are not independent if the draft depends on claims that have not been checked. Two searches may be independent if they examine different questions and return separate notes. Two edits are not independent if both rewrite the same paragraph in place.

Second, **a lane needs a contract**. The contract says what the worker receives, what it may change, what it must return, and how failure is reported. Without that contract, parallel work creates a pile of prose and code with no clear merge rule.

Third, **the human stays on the critical path where judgment lives**. A worker can collect sources. A worker can run a test. A worker can propose three structures. The human still decides which claim belongs in the manuscript, which test is adequate, and whether the result is safe to publish or ship.

Parallelism reduces waiting. It does not remove responsibility.

## Concepts and terms

### A lane is a bounded piece of work

A lane has one question, one owner, and one output. “Find evidence for the claim that matrix jobs can run independently” is a lane. “Improve the chapter” is not. The first can return links and notes. The second has no stable boundary and will overlap with every other worker.

A good lane is narrow enough that another person can inspect it without reconstructing the entire assignment. It also has a stopping condition: a source list, a test result, a proposed outline, or a patch.

### A dependency is a reason to wait

Task B depends on task A when B cannot produce a trustworthy result without A’s output. The dependency can be technical—one build must finish before integration—or editorial—an argument must be selected before a copy editor can check its consistency.

The mistake is to treat all time as dependency. Some work can begin with a stated assumption. For example, a researcher can investigate official documentation while the repository inspector maps the current files. The draft still waits for the human to reconcile the two results, but the investigation itself need not wait.

### Shared state is where parallel work gets dangerous

Shared state is anything multiple workers can change or rely on: a branch, a working directory, a database, a production account, a document, a generated artifact, or an evidence ledger. Shared state is not automatically bad. It is simply expensive to coordinate.

Git gives us a useful physical metaphor. `git worktree` supports multiple working trees attached to one repository, so separate branches can be checked out in separate directories. That arrangement can reduce accidental file overwrites. It does not resolve conflicting decisions. Two workers can still make incompatible changes in two clean worktrees.

The clean worktree solves one class of problem: collision. It does not solve another: judgment.

### A barrier is a deliberate handoff

A barrier is the point where parallel outputs are collected and checked before the next stage begins. The barrier may be a person, a test suite, a review, or a generated manifest.

A barrier should answer four questions:

1. Did every required lane return an output?
2. Did the outputs use the same version of the inputs?
3. Do the outputs contradict one another?
4. Who is authorized to choose what happens next?

Without a barrier, parallel execution becomes asynchronous drift. Each worker moves forward, but nobody knows whether the system is converging.

## Working example / proof case

The book repository provides a practical example because its queue and templates are visible artifacts rather than imagined workflow diagrams.

The input was the open canonical issue for “Execute in Parallel.” The queue rule selected the lowest-numbered open canonical chapter issue and excluded historical issues titled `ARCHIVED OUTLINE —`. The selected issue identified the target file and the definition of done. The repository architecture supplied the larger constraints: this chapter belongs in Part III, follows Direct and Route, and must end with an operator rule and measurable test.

From that input, the work can be divided into lanes:

- **Queue lane:** inspect open issues, exclude archived mapping tickets, and identify the canonical target.
- **Repository lane:** fetch `main`, confirm the current tree, and read neighboring chapters and the architecture document.
- **Research lane:** collect first-party explanations of parallel jobs, matrix strategies, and multiple working trees.
- **Evidence lane:** record each externally checkable claim, its source, and the date checked.
- **Draft lane:** turn the approved argument and repository constraints into the chapter.
- **QA lane:** check headings, links, word count, required sections, unsupported specifics, and the template checklist.

Some of those lanes can start together. Queue inspection and repository inspection do not need each other’s results. Research into the mechanics can begin while the local tree is being read. The evidence ledger can be prepared as sources are found.

But the lanes are not all equally free. The draft depends on knowing the target template. The final QA depends on a stable draft. The evidence ledger depends on the claims actually made, not only on the claims the researcher expected to make. The pull request depends on the branch containing the completed artifact. The issue comment depends on the pull request URL.

That last sequence is the part most workflow diagrams hide:

```text
inspect queue ───────┐
inspect repository ──┼──> choose scope ──> draft ──> QA ──> commit ──> push ──> PR ──> issue link
research mechanics ──┘             │
                                   └────────> reconcile evidence and claims
```

The diagram contains parallel work, but it is not a race. It is a set of short lanes converging on named barriers.

The human decision points are visible:

- Is this issue canonical, or is it historical outline material?
- Does the requested word count conflict with the repository guide’s local standard?
- Which claims are necessary to the chapter, and which are interesting but out of scope?
- Does a source document a product behavior, or merely discuss a possibility?
- Does the working example prove the rule, or only illustrate it?
- Is the branch ready to publish, or does it still contain unresolved uncertainty?

An agent can make recommendations at each point. It cannot turn an ambiguous decision into a fact by writing confidently.

## What can go wrong

### Failure mode: duplicate work wearing different names

Two agents are assigned “research” and “fact-checking.” Both search the same terms, return overlapping links, and disagree on emphasis. Time was spent in parallel, but the information value did not double.

**Why it happens:** the lanes were defined by role instead of question.

**How to detect it:** compare the requested outputs before starting. If both workers will return the same type of notes about the same claim, the work is probably duplicated.

**How the human responds:** split by decision. One worker gathers the official mechanism; another checks limitations or implementation context. If there is no distinct decision, keep one lane.

### Failure mode: parallel edits create a merge tax

Two workers edit the same Markdown file. One strengthens the opening; another restructures the evidence section. Both changes may be good. Combining them now requires a human to understand two full rewrites and recover the intended argument.

**Why it happens:** the file was treated as a task boundary even though the argument was shared state.

**How to detect it:** more than one worker has write access to the same artifact, or a worker cannot state which headings it owns.

**How the human responds:** use separate worktrees or patches, or assign one worker to propose changes without applying them. Merge by decision, not by line count.

### Failure mode: the fastest worker becomes the authority

A worker returns first with a polished explanation. The team accepts it because it is complete and readable. Later, a slower source check shows that the explanation described a default, a beta feature, or a behavior that depends on configuration.

**Why it happens:** fluency is mistaken for verification.

**How to detect it:** every number, date, price, and product behavior lacks a source or a checked date.

**How the human responds:** require the claim ledger before publication. If a claim cannot be verified, narrow it, attribute it, or remove it.

### Failure mode: a shared environment turns concurrency into interference

Two workers use the same credentials, temporary directory, browser session, or deployment target. One changes the state while the other is testing. Both report results that cannot be reproduced.

**Why it happens:** the plan measured task count, not resource contention.

**How to detect it:** results depend on execution order, tests pass alone but fail together, or a worker cannot identify the exact input state.

**How the human responds:** isolate the environment, serialize the sensitive operation, or make the shared state read-only. Parallelism is not worth an untrustworthy result.

### Failure mode: failure is hidden by partial success

A parallel group returns five successful outputs and one timeout. The coordinator treats the group as complete because most lanes succeeded. The missing lane contained the security review or the last required source.

**Why it happens:** completion was defined as “some results arrived” instead of “all required outputs are accounted for.”

**How to detect it:** the dispatch manifest and return manifest do not match.

**How the human responds:** record the missing output explicitly. Retry, replace, or proceed with a documented gap. Never let silence become approval.

## Why this matters in 2026

Agents make it cheap to start work and cheap to start too much work. That changes the bottleneck. The scarce resource is often no longer a first draft or a first search. It is coordination: deciding what is relevant, reconciling contradictory outputs, protecting private inputs, and proving that the final artifact corresponds to the requested change.

The practical opportunity is real. A human can ask one worker to inspect a repository while another reads official documentation and a third prepares a test plan. A coding workflow can run independent checks across a matrix of environments. A Git repository can hold isolated branches or worktrees. These patterns let waiting happen beside useful work.

The danger is equally real. More workers produce more surfaces for unsupported claims, inconsistent assumptions, secret exposure, and unreviewed side effects. Parallel execution therefore makes governance more important, not less. Every lane needs a boundary. Every external action needs an owner. Every result needs enough provenance to be checked.

The 2026 question is not whether agents can work concurrently. They can, in many workflows. The question is whether the organization can tell the difference between concurrent progress and concurrent motion.

## Counterargument / skeptical reader

A skeptical reader may say that this is ordinary project management with an agent-shaped vocabulary. That criticism is partly right. Dependencies, handoffs, queues, and review gates are not new. Calling them “multi-agent orchestration” does not make them more reliable.

The new part is the speed and scale at which a person can create workers that appear competent. A person who would never assign ten human interns to edit the same document may casually launch ten agents against the same prompt. The cost of starting a lane is low, so discipline has to move earlier in the process: define the question, define the output, define the permissions, and define the stop condition before execution.

There is also a stronger objection: if the human must inspect every result, parallelism may not save time. Again, sometimes it will not. If the tasks are small, tightly coupled, or high-risk, serial work is cheaper because coordination dominates execution. The right test is not “How many agents did we run?” It is “Did the time to a trustworthy result fall without lowering the evidence standard?”

What remains uncertain is workload-specific. A clean reduction in elapsed time on one workflow does not prove a general productivity gain. Measure the workflow you actually care about.

## Operator rule

**Parallelize tasks, not responsibility.** Give each lane one question, one bounded output, and the minimum permissions it needs. Keep scope, evidence, tradeoffs, and consequences with one accountable human.

## Measurable test

For the next five comparable requests, record:

1. elapsed time from accepted scope to trustworthy final artifact;
2. number of independent lanes and number of duplicated outputs;
3. coordination time spent reconciling conflicts;
4. defects or unsupported claims found after the first review;
5. number of lanes that failed, timed out, or required a rerun.

Compare the parallel workflow with the previous serial baseline. Keep the parallel design only if elapsed time falls **without** an increase in post-review defects or unresolved evidence gaps. If the result is faster but less trustworthy, the system did not improve.

## Evidence ledger

- **Claim:** The canonical queue for this manuscript is a 20-chapter structure, and the 41-chapter outline is archived rather than the current drafting queue.
  - **Source / artifact:** `writings/MANUSCRIPT-ARCHITECTURE.md` in this repository; canonical issue #59.
  - **Last checked:** 2026-09-24.
- **Claim:** The chapter’s required output includes an opening proof case, working example, failure modes, “Why this matters in 2026,” skeptical-reader response, evidence ledger, operator rule, and measurable test.
  - **Source / artifact:** `writings/part-03-running-the-day/03-execute.md` template and issue #59 definition of done.
  - **Last checked:** 2026-09-24.
- **Claim:** Git supports multiple working trees attached to one repository.
  - **Source / artifact:** Git documentation, https://git-scm.com/docs/git-worktree.
  - **Last checked:** 2026-09-24.
- **Claim:** GitHub Actions documents matrix strategies for running jobs across combinations of configuration values, including controls such as `fail-fast`.
  - **Source / artifact:** GitHub Docs, https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs.
  - **Last checked:** 2026-09-24.
- **Number, date, price, or product behavior:** No numerical performance, cost, or product-behavior claim is used as evidence for a general productivity result. The proposed five-request test is an operator measurement, not a reported outcome.
  - **First-party source:** This chapter’s measurable-test specification.
  - **Last checked:** 2026-09-24.

## Closing image

The branch is still the proof.

A dozen workers can search, outline, test, and comment while the human holds the boundary of the work. At the end, there must be one artifact that someone can inspect: one chapter, one patch, one result, one explanation of what failed. If the outputs cannot be brought back to that artifact without guesswork, the system did not execute in parallel. It merely produced noise in parallel.

The operator’s job is not to make every process run at once. It is to make sure that, when they do, they are still moving toward the same accountable result.

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
