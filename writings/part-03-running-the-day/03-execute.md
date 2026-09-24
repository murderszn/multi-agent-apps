# Execute in Parallel

*Concurrency is easy. Convergence is the skill.*

## Two agents, one job board

I run two agent systems. One is Muse, the line this assistant comes from. The other is called Instinct. They are in friendly competition, and in September 2026 they were both pointed at the same thing: my job search.

The job search lives on one shared board in Linear. Every card is a role: compensation, req ID, the posting link, notes. A card can be a prospect, it can need something from me, it can be done, or it can be dead. Two different agent pipelines run against that board in cycles — mine every eight hours, Instinct's on its own schedule. Both of them search postings, verify the listing is live, check it against my salary floor, and file applications on my behalf.

If you picture that for half a second, you see the problem. Two workers, one board, no manager on duty. What happens when both of them find the same fresh posting at the same time and both decide to apply?

The answer is a protocol, and the protocol is almost embarrassingly simple. Both systems check the board first. When one of them starts work on a card, it leaves a claim comment — "In Progress" — on that card. The other one reads the comment and moves on. No locks, no database, no ceremony. A sentence on a card.

I will be honest: collisions remain unproven in practice. The two cycles have agreed on the rules, and so far the board has stayed clean, but I have not watched a head-on collision resolve itself yet. The protocol is a bet that a written claim, made before the work starts, is enough coordination for two workers who never talk to each other directly. That bet is what this chapter is about.

Parallel execution is not "more agents everywhere." It is a controlled arrangement where several workers make progress at the same time without silently making the same decision twice.

## Independence is a property of inputs and outputs, not of job titles

Here is the most common mistake people make when they start running agents in parallel: they divide the work by role instead of by question. "You do research, you do drafting, you do fact-checking." That sounds like delegation. It is often duplication. Two agents handed "research" and "fact-checking" will run the same searches, return overlapping links, and disagree on emphasis. The information value did not double. The effort did.

A task is genuinely independent when it does not need another task's output to produce a trustworthy result. That is it. The property lives in the inputs and outputs, not in the names of the jobs.

Two searches are independent if they examine different questions and return separate notes. "What does the official documentation say about parallel jobs in GitHub Actions?" and "What do users on Reddit say breaks when they run coding agents in parallel?" are two good lanes. Neither needs the other's answer.

Two edits are not independent if both rewrite the same paragraph in place. Two applications are not independent if both target the same job posting. Research and drafting are not independent if the draft depends on claims the researcher has not checked yet.

This is why the claudemaxxing grid of forty browser tabs is theater. In May 2026, a creator named Cormac Hayden posted a reel of his "work setup": a grid of Claude tabs, each running an agent — one building a landing page, one writing scripts, one summarizing the news, one measuring feedback, one finding cheap flights. The caption was essentially "if your setup doesn't look like this, you're in the wrong timeline." Per the search summary of that post, the comment thread ran critical and technical — many viewers questioned the method, not the ambition. Running more workers is not the achievement. Getting them to converge on something trustworthy is.

## A lane needs a contract

Once you know which tasks are independent, you give each one a lane. A lane is one bounded piece of work: one question, one owner, one output. "Find evidence that matrix jobs can run independently" is a lane. "Improve the chapter" is not a lane; it has no boundary and will overlap with everything else.

Every lane needs a contract, even if the contract is one paragraph. The contract says four things: what the worker receives, what it may change, what it must return, and how failure gets reported. Without that, parallel work produces a pile of prose and code with no merge rule — and no way to tell which piece is safe to keep.

There is a small open-source pattern worth knowing here, because it encodes exactly this discipline. GitHub Actions — the automation system that runs jobs on code repositories — has a "matrix strategy": you define one job with variables, and the platform fans it out into a run per combination, each one independent, each one reporting its own result. You can also set a cap, like `max-parallel: 2`, so six jobs run two at a time instead of all six at once. The platform also documents controls for what happens when one lane fails: stop everything, or let the rest finish. The point is that a serious parallel system plans for failure before dispatch, not after. I will come back to that.

The consumer version of this rule is shorter: before you hand a worker a task, write down what "done" looks like and what "broken" looks like. If you cannot write those two sentences, the lane is not ready.

## Shared state is where parallel work gets dangerous

Shared state is anything more than one worker can change or rely on: a board, a branch, a working directory, a browser session, a set of credentials, a document, a generated artifact. Shared state is not automatically bad. It is simply expensive to coordinate, because every worker that touches it is making decisions the others cannot see.

Git gives a clean physical metaphor. A repository can support multiple working trees at once — `git worktree` lets you check out different branches in different directories, all attached to the same repo. That solves one class of problem: two workers no longer overwrite each other's files. It does not solve another: two workers can still make incompatible decisions in two clean directories. The worktree fixes collision. It does not fix judgment.

My job board has the same shape. The board is shared state. The protocol — check the board, claim the card with a comment before applying — is what keeps two workers from silently doing the same application twice. Notice what the protocol does not do: it does not make either agent smarter, and it does not review the applications. It only answers one question: who owns this card right now?

A practical orchestration guide from an agent team called OpenSin puts the rule this way: parallel work is correct when tasks do not mutate the same surface, when they only gather information, or when they are independent implementation tracks. Sequential work is required when one task defines contracts another consumes, when shared files would conflict, when architectural decisions must settle first, or when irreversible actions depend on previous validation. And their anti-pattern is the one that matters most: running dependent tasks in parallel because it "feels faster" usually creates merge debt and rework.

Read that last sentence twice. It is the whole chapter in one line.

## The barrier: where parallel work gets collected

There is a second concept, and it is the one that separates a working system from a busy one. A barrier is the point where parallel outputs get collected and checked before anything moves forward. The barrier can be a person, a test suite, a review, or a generated checklist. It has to answer four questions:

1. Did every required lane return an output?
2. Did the outputs all start from the same version of the inputs?
3. Do the outputs contradict one another?
4. Who is authorized to decide what happens next?

Without a barrier, parallel execution becomes asynchronous drift. Every worker moves forward and nobody knows whether the system is converging.

The claim comment on my job board is a barrier, a tiny one. It answers question four — I own this card — before the work begins, which is the right time to answer it. The board itself answers question one: if a card has no "done" comment and no application, the lane did not finish, and nobody gets to call it finished.

Here is the working example from my own lab, because this chapter is itself the proof case. This book is being drafted on a schedule: a job wakes up every four hours, takes the lowest-numbered open chapter ticket, researches it, drafts it, runs copy and technical QA, opens a pull request, posts the checklist, and closes the ticket. The work divides into lanes. Inspecting the issue queue and inspecting the repository do not need each other's results — those can run together. Researching the topic and reading the chapter template can run together. But the draft cannot start before the template is read, QA cannot start before the draft is stable, and the pull request cannot open before the branch holds the finished chapter. The sequence hides inside the parallelism like this:

```text
inspect queue ───────┐
inspect repository ──┼──> choose scope ──> draft ──> QA ──> commit ──> push ──> PR ──> ticket closed
research topic ──────┘             │
                                  └────────> reconcile evidence and claims
```

It is not a race. It is short lanes converging on named barriers, with a human at every barrier. The human decision points are explicit: Is this the right ticket? Do the sources actually support the claims? Does the draft meet the definition of done? Is the pull request ready for editorial review? An agent can recommend at each point. It cannot turn an ambiguous decision into a fact by writing confidently.

And the failure happened, too, in the open, on the day I wrote this. While I was working this chapter through the canonical queue, a different drafting flow in the same repository opened its own pull request with its own version of this chapter — same file, same chapter, different branch (PR #80 against `chapter/59-execute-in-parallel`). Two drafts of one chapter. The fix was not to forbid parallelism. It was to do the review-and-polish pass the canonical queue requires, fold the better material in, keep one canonical lane, and review the other's output as evidence rather than competing with it. Parallelism produced the collision. The barrier resolved it.

## What can go wrong

Failure modes first, because each one is a place where I have watched this break, in my own lab or in someone else's.

**Duplicate work wearing different names.** Two agents get "research" and "fact-checking," both search the same terms, both return overlapping links. The lanes were defined by role instead of by question. Detection is easy: compare the requested outputs before starting. If both workers will return the same type of notes about the same claim, it is one lane, not two. The fix is to split by decision — one worker gathers the official mechanism, another checks the limitations — or cut a lane.

**Parallel edits create a merge tax.** Two workers edit the same document. One strengthens the opening, another restructures the evidence section. Both changes might be good. Combining them now requires a human to hold two full rewrites in their head and recover the intended argument. The file was treated as a task boundary even though the argument was shared state. The fix: separate worktrees, separate patches, or one worker that proposes without applying. Merge by decision, not by line count.

**The fastest worker becomes the authority.** A worker returns first with a polished, readable explanation. The team accepts it because it is complete. Later, a slower source check shows it described a default, a beta feature, or a behavior that depends on configuration. Fluency is mistaken for verification. Detection: every number, date, price, and product behavior lacks a source or a checked date. The fix: the claim ledger gets completed before publication, not after. If a claim cannot be verified, narrow it, attribute it, or cut it.

**A shared environment turns concurrency into interference.** Two workers use the same credentials, the same temporary directory, the same browser session, the same deployment target. One changes the state while the other is testing. Both report results that cannot be reproduced. My own eight-hour apply cycle has a cousin of this problem: when it runs long and times out partway, I have to verify the board's actual state before assuming anything finished — a failed report does not prove nothing happened. The fix: isolate the environment, serialize the sensitive operation, or make the shared state read-only. Parallelism is not worth an untrustworthy result.

**Failure gets hidden by partial success.** Five lanes succeed, one times out. The coordinator treats the group as complete because most of it worked. The missing lane held the security review, or the last required source. Completion was defined as "some results arrived" instead of "all required outputs are accounted for." Detection: the dispatch list and the return list do not match. The fix: record the missing output explicitly — retry it, replace it, or proceed with a documented gap. Never let silence become approval.

## Why this matters in 2026

Agents made it cheap to start work and cheap to start too much work. That moved the bottleneck. The scarce resource is no longer the first draft or the first search. It is coordination: deciding what is relevant, reconciling contradictory outputs, protecting private inputs, and proving the final artifact matches what was asked for.

The culture already reflects this. Alongside the claudemaxxing grids, there are people running a hundred agents in batches to write social posts, creators managing fifty agents across twelve projects from one terminal, and open-source tools with names like `herdr` — described by its maker as "tmux for AI agents," a multiplexer for watching and controlling many coding agents at once. One developer, Rui Fu, demonstrated spawning an agent per file in a repository with a separate verifier agent checking the findings, scaling toward a thousand agents, after first building a dependency graph to find the "fake edges" — steps that only look dependent. The instinct is right: map the dependencies first, then parallelize what is genuinely free.

That last point is the consumer takeaway. You do not need a thousand agents. What you need, when you hand an agent your errands — plan the trip, check the bills, apply to the jobs, watch the grant deadlines — is the discipline this chapter describes. Define the lane. Write down done and broken. Keep one accountable owner for scope, evidence, tradeoffs, and consequences. The skill of 2026 is not running more agents. It is keeping one human in charge of what they converge on.

This is the safety promise of the book wearing work clothes. More workers mean more surfaces for unsupported claims, inconsistent assumptions, secret exposure, and unreviewed side effects. Every external action needs an owner. Every result needs enough provenance to be checked. Parallel execution makes governance more important, not less.

## The skeptical reader is right about one thing

A technically informed reader may say this is ordinary project management with an agent-shaped vocabulary. Dependencies, handoffs, queues, review gates — none of it is new, and calling it "multi-agent orchestration" does not make it more reliable.

That criticism is partly right, and I will not dodge it. The new part is not the vocabulary. It is the speed and scale at which one person can now create workers that look competent. A manager who would never assign ten human interns to edit the same document will casually launch ten agents at the same prompt, because the cost of starting a lane has collapsed to near zero. When starting is free, the discipline has to move earlier: define the question, define the output, define the permissions, define the stop condition — before execution, not during.

There is a stronger objection, and it deserves a direct answer: if the human has to inspect every result, does parallelism actually save time? Sometimes it does not. If the tasks are small, tightly coupled, or high-risk, serial work is cheaper because coordination dominates execution. The honest test is never "how many agents did I run?" It is "did the time to a trustworthy result fall without lowering the evidence standard?" What remains uncertain is workload-specific: a clean time saving on one workflow proves nothing about the next one. Measure the workflow you actually care about.

## The rule

Parallelize tasks, not responsibility. Give each lane one question, one bounded output, and the minimum permissions it needs. Keep scope, evidence, tradeoffs, and consequences with one accountable human.

## The test

Run five comparable requests through your parallel setup and record five numbers: elapsed time from accepted scope to trustworthy artifact; how many lanes ran and how many duplicated each other; coordination time spent reconciling conflicts; defects or unsupported claims found after the first review; how many lanes failed, timed out, or needed a rerun. Compare against the serial baseline you used before. Keep the parallel design only if elapsed time falls *without* an increase in post-review defects or unresolved evidence gaps. If it is faster but less trustworthy, the system did not improve. It got louder.

## Back at the board

The board is still the proof.

Two agents can search, verify, and apply while I hold the boundary of the work: the salary floor, the guest-only rule, the never-guess-answers rule. At the end there has to be one artifact I can inspect — one card that says done, with the confirmation to back it up. If the outputs cannot be brought back to that card without guesswork, the system did not execute in parallel. It merely produced applications in parallel, which is a different thing and not one I want.

The operator's job is not to make every process run at once. It is to make sure that when they do, they are still moving toward the same accountable result.

## Notes

- OpenSin's "Ultimate Team Orchestration Doctrine" (2026-04-10): parallel work is correct when tasks do not mutate the same surface; running dependent tasks in parallel because it "feels faster" creates merge debt; orchestration quality is "throughput without confusion." Supports the parallel-vs-sequential section and the merge-debt claim. https://github.com/opensin-ai/opensin-documentation/blob/HEAD/docs/best-practices/team-orchestration.md — opened and read 2026-09-24.
- Git's `git-worktree` documentation: a repository can support multiple working trees, each checking out a different branch, while per-worktree and shared refs stay separate. Supports the shared-state and worktree discussion. https://git-scm.com/docs/git-worktree — opened and read 2026-09-24.
- GitHub's Actions documentation on matrix strategies: one job definition fans out into a run per variable combination, with `fail-fast`, `continue-on-error`, and `max-parallel` controls. Supports the lane-and-failure-planning discussion. https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs — opened and read 2026-09-24.
- A parallel-agent-orchestration skill (itallstartedwithaidea/claude-googleadsagent): only parallelize truly independent tasks; cap concurrent subagents at 3–5; set per-task budgets; handle partial failures; resolve conflicts explicitly. Supports the lane-contract and failure sections. https://github.com/itallstartedwithaidea/claude-googleadsagent/blob/HEAD/skills/parallel-agent-orchestration/SKILL.md — retrieved via search 2026-09-24.
- Lightless Labs' multi-model dispatch patterns (2026-04-01): diverge-evaluate-converge (run models independently, cross-evaluate, synthesize); process-lifecycle mismatches silently degrade parallel dispatch. Supports the barrier and divergence-playbook discussion. https://github.com/lightless-labs/skunkworks/blob/HEAD/docs/solutions/best-practices/multi-model-autoresearch-dispatch-patterns-2026-04-01.md — retrieved via search 2026-09-24.
- Cormac Hayden (@cormacbuilds), Instagram reel, 2026-05-01, the "claudemaxxing" grid of simultaneous Claude agents; per the social-search summary, the comment thread runs critical and technical, questioning the method. Supports the 2026 culture section. https://www.instagram.com/reel/DXy3X9cykbD/ — retrieved via social search 2026-09-24.
- "Launching 100 AI agents with Kimi K2.5" via OpenCode in 10 parallel batches, 2026-01-29; "How I Manage 50 AI Agents" across 12 projects, 2026-08-19; Rui Fu (@raycfu) on running up to 1,000 agents with a dependency graph and a verifier agent, 2026-08-13; `herdr`, an agent multiplexer ("tmux for AI agents"), 2026-07-16; Dallion King (@dallionking)'s Orca Workflow for parallel coding agents, 2026-07-17. All retrieved via social search 2026-09-24 and used only as existence examples of the 2026 trend, not as performance claims. https://www.instagram.com/reel/DUEvFm2EnX5/ · https://www.facebook.com/reel/4541378649465758/ · https://www.instagram.com/reel/Db9f8vyP02z/ · https://www.instagram.com/reel/Da3XotHJHnw/ · https://www.instagram.com/reel/Da6XDSolaos/
- First-party context: Joshua's two agent systems (Muse and Instinct) share one Linear jobs board with check-first and "In Progress" claim-comment race avoidance; his eight-hour apply cycle and this four-hour chapter cycle; AURABLOX's 4 humans and 8 agents whose sub-agents make it operate like a company of hundreds. From his own records and daily logs, cited as his experience, not as external evidence.
- PR #80 in murderszn/multi-agent-apps ("docs: draft Execute in Parallel chapter," opened 2026-09-24 on branch `chapter/59-execute-in-parallel`) is the parallel drafting flow whose output this run reviewed and polished into the chapter above. Referenced as the chapter's own proof case.
