# I Don't Code Anymore. I Vibe.

> **Status:** Draft — publisher review pass
> **Part:** part-02-field-essays
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/49
> **Target length:** 2,500–4,000 words

## The afternoon the code became a judgment call

The most honest description of vibe coding is not any of the hype versions. It is not “I said one sentence and a whole app appeared.” It is not a demo of a model generating a full stack in a conversation. It is what happens on a normal afternoon, at a normal desk, when there is a real thing to build and a standard that the thing has to survive.

The operator opens a coding-agent conversation and describes an outcome rather than dictating every implementation step. The agent returns a change that looks right. The operator reads the diff. Three things are wrong. Two are acceptable. The operator rejects the wrong ones, accepts the acceptable ones, and asks for a revision. The agent revises. The operator reads again. This time there is one real problem and one cosmetic issue. The operator fixes the real problem and sends the cosmetic one back. A test runs. The result is inspected. The thing ships—or it does not.

That afternoon is not impressive to watch. It looks like a person reading code, making judgments, and slowly steering a piece of software toward a standard. The speed is real. The supervision is realer.

That is the part people miss when they use “vibe coding” as either a victory cry or an insult. The phrase names a new interface to programming, but it does not repeal the old obligations. Software still receives inputs. It still stores state. It still fails. It still has users who do not follow the happy path. The model can produce the first draft quickly. Somebody still has to decide whether the draft deserves to exist in the world.

## The promise of the new interface

Coding used to mean typing most of the implementation. Now it can mean describing an outcome, inspecting a proposed change, asking for a correction, and accepting a result. The center of gravity moves from production to direction and review.

This matters because typing was never the whole job. A working programmer has always had to decide what the system should do, what it must not do, which trade-offs are acceptable, and how to tell whether the result works. The keyboard made those judgments visible, but it did not create them.

A coding agent compresses the distance between a requirement and a plausible implementation. It can inspect a repository, edit several files, run commands, explain a diff, and iterate. The exact capabilities depend on the product, permissions, environment, and configuration. The durable idea is simpler: the operator gives a worker a bounded task, and the worker can act on the codebase instead of merely discussing code in the abstract.

That is useful. It is also dangerous in the ordinary way that delegation is dangerous. A delegated worker can misunderstand the assignment, make a locally sensible change that damages a larger system, or report success before the work has been proved. An agent makes this easier to do at machine speed.

The right response is not nostalgia for manual typing. It is a stronger operating loop:

1. State the outcome and the boundary.
2. Ask the agent to inspect before changing.
3. Make the change small enough to review.
4. Read the diff, not just the explanation.
5. Run tests that can fail for meaningful reasons.
6. Exercise the edge cases the happy path hides.
7. Keep or reject the change explicitly.

“Vibe” is acceptable as a name for the first pass. It is not a quality standard for the last pass.

## The demo is not the product

The easiest thing to generate is a demo. Models have absorbed the familiar shapes of demos: a landing page, a form, a dashboard, a database table, an API route, a button that performs the expected action. These patterns are useful priors. They are not evidence that a particular implementation is correct.

A demo proves that a path can be made to look coherent. A product has to survive paths nobody put in the screenshot.

What happens when the data source is empty? What happens when a request is repeated? What happens when the user submits malformed input? What happens when the network disappears between two steps? What happens when the person who configured the credential leaves? What happens when an error is logged without exposing private data? What happens when a dependency changes its interface? What happens when the agent’s generated migration is run against a copy of the database instead of the toy database it imagined?

These are not advanced concerns. They are the floor beneath the demo.

The model will often make the happy path feel complete because the happy path is legible. It has a beginning, a middle, and a satisfying result. Durability is less cinematic. It is a collection of decisions about invalid states, recovery, authorization, observability, and maintenance.

This is where the work moved. Fast generation became common enough that speed alone stopped distinguishing a serious operator from a careless one. The scarce resource is not the ability to produce code. It is the ability to recognize which code is merely convincing and which code is fit for the stated use.

A useful prompt therefore names the non-demo conditions. It asks for input validation, explicit failure behavior, tests, and a description of assumptions. It asks the agent to show the files it plans to change before it changes them. It asks for a small patch rather than an unsolicited rewrite. None of those requests guarantees a good result. They create surfaces on which a bad result can be seen.

## Prompting for stability

A demo prompt describes an image: “Build a clean dashboard that lets me filter these records.” A stability prompt describes a responsibility: “Build the smallest dashboard that filters these records. Inspect the existing data shape first. Do not change the schema. Treat missing data as an empty state, reject invalid filter values, preserve the current authorization boundary, add tests for empty and malformed input, and report what you could not verify.”

The second prompt is not magic. It is a better contract.

The distinction is important because agents tend to optimize for the visible request unless the invisible obligations are made explicit. This is not a moral failure by the machine. It is a property of underspecified work. If the operator requests a button, the agent can add a button. If the operator requests a dependable operation with a defined failure mode, the agent has more constraints to reason about—and the operator has more things to check.

The practical unit of work is not “make an app.” It is a change with a boundary. The boundary might be one route, one component, one migration, one test fixture, or one command. The smaller the boundary, the easier it is to answer four questions:

- What was supposed to change?
- What actually changed?
- What evidence says it works?
- What remains unknown?

The fourth question is the one that disappears in a polished agent transcript. A generated explanation can be accurate, incomplete, or wrong. It is a useful index into the patch, not a substitute for the patch. The operator should treat “all tests passed” as a claim that needs context: which tests, against what environment, with what coverage, and did the tests exercise the risk that motivated the change?

A responsible agent workflow also separates read authority from write authority. An agent can inspect broadly and edit narrowly. It can propose a plan without receiving permission to touch unrelated files. It can run a test suite without receiving permission to deploy. These boundaries are not bureaucracy. They are how a person keeps a fast worker from turning a local misunderstanding into a repository-wide event.

## The repository is part of the proof

The Human 2.0 project itself makes the difference visible. Its current manuscript is organized into canonical chapters, while the former outline is explicitly preserved as an archive. The chapter issue identifies the target file, the definition of done, and the requirement for an evidence ledger. That is not an ornamental process. It is an executable description of what “finished” means for this work.

The chapter file starts as a structured draft. It carries an issue link, an editorial hook, a working example, failure modes, a section on why the topic matters now, a skeptical-reader response, an operator rule, a measurable test, and an evidence ledger. The document is not complete merely because paragraphs exist. It is complete when the claims, structure, and checks are visible enough for another person to review.

That is the same pattern as an agent-built software change. The artifact needs a boundary, a reason, an inspection path, and evidence. A good agent can help produce all four. It cannot own the meaning of them.

The repository also supplies an uncomfortable proof case: a draft can look complete while still being too short, too general, or weakly sourced. A chapter can contain every expected heading and still avoid the hard question. A test suite can pass while failing to test the behavior that matters. Completion labels are not proof. They are invitations to inspect.

## Working example: the internal tool that wants to be trusted

Consider a small internal tool whose job is to display records from an existing data source and let an operator filter them. This is intentionally ordinary. Ordinary software is where most confidence is either earned or wasted.

The first request is narrow: inspect the repository, identify the existing data shape, and propose the smallest change that adds the filter. The agent should not start by replacing the interface, adding a new framework, or inventing a schema. The operator wants to know what exists before accepting what comes next.

The first implementation produces a visible interface and the expected result for populated, well-formed data. That is useful progress. It is not the end. Review finds three problems:

- An empty data source produces a confusing blank region rather than a deliberate empty state.
- The filter accepts values outside the supported set.
- The operation leaves no useful record of what happened, so a later operator cannot distinguish “no matches” from “the query failed.”

The operator asks for those cases explicitly. The agent adds an empty state, validation, and structured logging that respects the existing privacy boundary. The operator reviews again and discovers that the validation is too strict for a real value already present in the data. That is an important failure. The agent followed a plausible interpretation of the specification; the human knew the specification was incomplete.

The rule is adjusted. Tests cover populated data, no matching records, an empty source, and invalid input. The operator runs the tests and then performs one manual check using a record shape that the fixture did not represent. The tool ships only after the operator can explain what happens in each case.

Nothing in this example requires pretending that the agent had a personal insight or that the operator achieved a measured productivity miracle. The evidence is the sequence of requested behavior, changed artifact, test result, and human decision. That is enough. The point is not that an agent always follows this sequence. The point is that a trustworthy workflow makes it difficult to skip.

What failed? The first pass optimized for the visible success case. The second pass encoded an assumption too aggressively. The tool improved because the human recognized both failures. The agent was valuable as a fast implementer. It was not the authority on what the data meant.

## Why agents lie without intending to

When I say an agent can lie, I do not mean it has a private desire to deceive. I mean that it can state a false conclusion with the tone of a finished one.

The failure usually begins with a mismatch between appearance and verification. The code compiles, so the agent says it works. The test command exits successfully, so the agent says the feature is complete. The page renders, so the agent says the integration is done. Each statement may contain a small truth while hiding the larger unknown.

An agent can also inherit a bad assumption from the request. If a requirement says “users can access their records,” the agent may implement a route that works for an authenticated user while missing the authorization question: which user’s records? If a request says “store the token,” the agent may put a secret in a convenient configuration path while failing to establish how the secret is rotated or excluded from logs. The generated code can be tidy and still be wrong at the boundary where harm occurs.

The operator’s defense is not suspicion of every line. It is targeted skepticism. Ask what the system assumes. Ask which test would fail if the assumption were false. Ask whether the evidence was produced by the same path that is being claimed as reliable. Ask the agent to identify what it did not inspect. Then inspect the high-risk parts yourself.

This is why basic competence becomes more valuable, not less, when generation improves. The operator does not need to type every loop. The operator does need to understand data flow, permissions, failure behavior, and the difference between a test that exercises a path and a test that merely exists.

If the operator cannot explain why the change works, they are not directing a worker. They are trusting a stranger with write access.

## What can go wrong

### The confident wrong answer

**Why it happens:** The operator treats a fluent explanation as evidence. The agent has produced a coherent story, and the operator does not compare it with the diff or the running behavior.

**How to detect it:** The explanation names files or tests that do not match the patch. The operator cannot describe the changed data flow. A negative case has no defined result.

**How the human responds:** Stop. Ask for a file-by-file account. Read the diff. Run a deliberately failing or edge-case test. Do not accept a claim that has not met the relevant evidence.

### The unsolicited rewrite

**Why it happens:** The request is broad, or the agent interprets cleanup as part of the task. A large patch can hide a small defect and make review expensive.

**How to detect it:** Unrelated files change. Naming, dependencies, or architecture move without a stated reason. The diff is larger than the user-visible requirement suggests it should be.

**How the human responds:** Reset or reject the unrelated portion. Restate the boundary. Prefer a small patch, then make a separate decision about cleanup.

### The passing test that proves the wrong thing

**Why it happens:** The test describes the implementation rather than the behavior. A mock is too complete, a fixture is too clean, or the assertion checks that a function was called instead of checking the result a user needs.

**How to detect it:** The test cannot fail when the important behavior is broken. No test covers empty, malformed, unauthorized, repeated, or unavailable states where those states matter.

**How the human responds:** Write the failure case first. Add a manual check when the risk is visual, operational, or environmental. Record what the suite did not test.

### The operator who cannot review

**Why it happens:** The interface makes programming feel accessible before the underlying system is understood. The operator mistakes a lower typing burden for a lower responsibility burden.

**How to detect it:** The operator accepts changes because they look professional. They cannot predict the result of an unexpected input or explain the security boundary.

**How the human responds:** Reduce scope. Learn the concepts needed for the decision. Use the agent as a tutor and implementer, but keep the release decision human.

## Why this matters in 2026

Vibe coding is a real shift in what the human does, but it is not a replacement for competence. The person who can only prompt and not review can ship garbage faster than before. The person who can prompt and review can move from idea to working artifact with less mechanical friction.

The useful distinction is not coder versus non-coder. It is accountable operator versus unaccountable accepter.

That distinction will matter as coding agents move beyond toy applications into repositories with secrets, customer data, production dependencies, and long-lived maintenance obligations. The agent may become better at planning, editing, and testing. Those improvements raise the value of a good review loop because a more capable worker can make larger changes before a weak process notices.

The organizations that benefit will not be the ones that merely measure how quickly a first draft appears. They will measure rework, escaped defects, review quality, recovery time, and whether the person responsible can explain the system. The numbers will differ by team and task; the operating principle does not. Speed is useful only when the verification loop can keep up.

There is also a personal consequence. A person who uses an agent only as an answer machine will become dependent on confidence. A person who uses it as a transparent worker can become more capable: ask it to explain a dependency, produce a minimal reproduction, compare approaches, generate adversarial cases, and then check the answers. The tool can widen the field of what one person can attempt. It cannot decide which attempt is wise.

## The skeptical reader

A technically informed critic might say this is just another abstraction layer. The operator is still doing the same work, only indirectly. That is partially true. The operator is still reviewing code, making trade-offs, testing behavior, and deciding what is good enough. The difference is that the operator no longer has to type every line, and that changes the scale and speed of the work.

Another critic might say that “vibe coding” is a marketing term for inexperienced people generating brittle software. Sometimes it is. The phrase should not be used to disguise weak engineering. But dismissing the entire practice misses the important change in interface. Experienced engineers are also using agents to explore unfamiliar code, draft tests, translate between APIs, and handle routine edits. The question is not whether the first pass was typed. The question is whether the resulting system was understood and verified.

The strongest objection is that review itself takes expertise, so the method cannot democratize software as much as its advocates claim. This objection is right about the bottleneck. Agents reduce some implementation cost; they do not eliminate domain knowledge, judgment, or accountability. A person can build a small personal tool with a modest review burden. A person should not place an agent-generated system in a high-consequence setting without the ability and process to examine it.

That is not a failure of the tool. It is a boundary around responsible use.

## Evidence ledger

| Claim | Evidence or source | Status and boundary |
|---|---|---|
| Coding agents can shift work from line-by-line typing toward directing, editing, and reviewing. | GitHub, “What is GitHub Copilot?” and official Copilot documentation: https://github.com/features/copilot | Product capability description; capabilities vary by product, mode, permissions, and date. |
| Generated code can require human review and may contain errors or security problems. | GitHub, “GitHub Copilot Trust Center”: https://resources.github.com/copilot-trust-center/ | Vendor guidance; this is a risk statement, not a measured defect rate. |
| Productivity evidence is task- and study-dependent rather than a universal promise. | GitHub Next, “Research: quantifying GitHub Copilot’s impact on developer productivity and happiness,” 2022: https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/ | Reported research context; not a claim about every team or current model. |
| A passing test command is not, by itself, proof of all required behavior. | Repository QA requirement in this chapter’s canonical issue and template; software-testing principle applied here. | Operational rule, not a population statistic. |
| The Human 2.0 manuscript uses an issue, canonical file, definition of done, and evidence ledger as review surfaces. | This repository: issue 49 and `writings/part-02-field-essays/01-vibe-coding.md` | Direct artifact evidence; describes this project only. |
| Empty input, malformed input, authorization, secrets, and recovery are stability concerns. | OWASP Application Security Verification Standard: https://owasp.org/www-project-application-security-verification-standard/4.0/en/ | General security and verification guidance; exact controls depend on the system. |

No personal productivity number is claimed here. No product behavior beyond the cited documentation is treated as universal. The internal-tool example is a proposed proof case, not a report of an event that happened to the author.

## Operator rule

Know enough to catch when the agent is lying.

More precisely: give the agent a bounded job, require evidence, and keep the release decision with the person who can explain the result.

## Measurable test

Before accepting an agent-built change, the operator must be able to answer, in writing or aloud:

1. What files and behavior changed?
2. What happens on empty, malformed, unauthorized, repeated, and unavailable input where those conditions apply?
3. Which test or observation would fail if the main assumption were wrong?
4. What did the agent not verify?

For a small change, run the relevant automated checks and at least one deliberately chosen edge case. Record the result. If the operator cannot explain the behavior or cannot identify an unverified assumption, the change is not ready to ship.

## Closing image

The operator closes the conversation. The thing is shipped—or the patch is rejected and the work continues. The operator does not feel like they typed every line. They feel like they directed the work, inspected the evidence, and accepted responsibility for the result.

That is the difference.
