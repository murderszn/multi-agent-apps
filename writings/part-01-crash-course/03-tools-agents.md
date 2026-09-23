# Tools Turn Models into Workers

*The model never touches anything. It writes a note describing what it wants done, and code you wrote does it — or it doesn't. Everything about AI safety, cost, and usefulness in 2026 lives in that gap.*

A few weeks ago an email landed in my inbox: Indeed, telling me a job posting matched my profile. I handed it to one of my agents, the way I'd hand a Post-it to an assistant: "Apply to this one."

The agent came back empty-handed. It couldn't get in. Indeed had thrown up a "verify you're human" wall, and the agent — which is very good at filling out forty-field application forms — had no way to pass a checkpoint designed to prove it wasn't one.

I sat with that for a minute, because the failure was the interesting part. Not that the agent failed — agents fail at things constantly — but *where* it failed. The model behind the agent could have written a perfect cover letter, could have debated the hiring manager's industry for an hour. What it could not do was cross the one inch between *saying* and *doing*: actually opening a real page, on a real site, and putting a real application into a real system.

That inch is this chapter. A model that speaks is a chatbot. A model that can reach out and operate tools — search the web, run code, file forms, move money, book flights — is a worker. And everything you've read about AI "agents" taking over jobs, hacking systems, or quietly running entire companies is really a story about that inch: who built the bridge, what the bridge is allowed to touch, and what happens when the bridge leads somewhere nobody checked.

## The note on the desk

Here's the mechanism, stripped of the marketing words. It's genuinely simple, and once you see it you can't unsee it.

A large language model cannot click anything. It cannot run code, send an email, query a database, or check the weather. It produces text. That's all it has ever done.

Function calling — the industry also calls it "tool use," OpenAI and Anthropic just picked different names for the same thing — is a convention for turning that text into action. Before you ask the model anything, you hand it a menu: a structured description of the tools available, what each one does, and what inputs it needs. Written out, it looks like a restaurant menu in a very strict format, usually JSON. "Here's `get_weather`. It takes a `location`. Here's `search_files`. It takes a `query`." That menu goes into the model's context alongside your question.

When you ask "what's the weather in Chicago," the model doesn't call anything. It writes a note — structured text that says, in effect: *I would like the tool called `get_weather` to run with `location` set to "Chicago."* Then your code — the application around the model, sometimes called the harness — reads that note, actually calls the weather service, gets the temperature back, and hands the result to the model, which then answers you in plain English.

This is worth saying twice, because every confusing demo you've ever seen obscures it: **the model proposes; the software disposes.** The model is the boss writing memos. Your code is the assistant who actually picks up the phone. The model never touches the phone.

Then it loops. The model reads the tool result, decides whether it needs another tool — maybe the weather result needs converting, maybe the first search came back empty — writes another note, your code runs it, results come back. Decide, act, observe. Decide, act, observe. This is the agentic loop, and it keeps going until the model answers you directly instead of requesting a tool, or until the harness hits a limit — most implementations cap the loop at something like ten iterations and hand back whatever they have.

That loop is the entire difference between a chatbot and an agent. A chatbot runs once: question in, answer out. An agent runs the loop: question in, a chain of tool calls against the real world, answer out. Every product you've seen described as an "AI agent" in 2026 is this loop wearing a nice interface.

## The plug that ended the wiring nightmare

For a while, every one of those tool connections was custom. If you had five AI applications and ten tools, you needed up to fifty bespoke integrations — each pair wired by hand. Engineers called it the N-times-M problem, and it was strangling the whole ecosystem, because the interesting tools — your calendar, your database, your company's internal systems — each needed their own hand-built bridge to each model.

The Model Context Protocol, MCP, collapsed the math. Anthropic released it in November 2024 as an open standard: one shared way for any AI application to discover and call tools, and one shared way for any tool to describe itself. Build one MCP server for your database, and every compatible assistant can use it. Build one MCP client into your app, and it can reach every MCP server ever published. Fifty integrations become fifteen. People started calling it the USB-C of AI, and the nickname stuck because it's exactly right — before USB-C, every device needed its own cable.

Adoption has been absurdly fast. By March 2026 the MCP software packages were being downloaded around 97 million times a month — an ecosystem-reported figure, but the direction is unmistakable. Public registries list more than 9,400 MCP servers. In December 2025 Anthropic donated the protocol to a vendor-neutral foundation under the Linux Foundation, with OpenAI, Google, Microsoft, Amazon, and Cloudflare all at the table — competitors who agree on almost nothing, agreeing that the wiring problem was real. Surveys from the first half of 2026 put MCP-backed agents in production at roughly three-quarters of enterprise AI teams. It is, as one industry writeup put it, now the boring infrastructure layer. Boring is what winning looks like.

What MCP did for tools is what the agentic loop did for behavior: it made the thing *composable*. And composable things get combined in ways nobody planned.

## The coder that checks its own homework

The loudest version of the loop in 2026 is the coding agent — tools like Claude Code and OpenAI's Codex. Point one at a codebase, give it a task, and it runs the same decide-act-observe loop, except its tools are the programmer's tools: read files, edit files, run tests, run the compiler, open a pull request.

The people building these things have converged on an insight that sounds obvious and is apparently very hard to get right: the loop needs a checker. The creator of one of the leading coding tools has been saying all year, in widely shared talks and clips, that a "closed loop" — an agent that must verify and break down its own work rather than declare victory — is the single most important ingredient in agents that actually get work done. The common failure pattern is familiar to anyone who's used these tools: you give the agent a task, it announces it's finished, and the result doesn't meet your standards. Then you point out the problems manually, which is just the old way of working with extra steps.

The fix the practitioners landed on is almost embarrassingly traditional software engineering: a second agent, with fresh context, whose only job is to check the first agent's work. Builder and checker. One writes, one runs the tests and rejects the output until it passes. It's code review, automated, with the reviewer forbidden from grading its own homework. People dress this up with names like "supervisory loops" and "adversarial review," but strip the jargon and it's the same discipline human teams have used forever: nobody ships without a second pair of eyes.

I run a version of this myself, and I didn't invent it — I stole it from watching what works. My job search this fall has two agent systems filing applications for me under strict rules, and the arrangement that actually holds up is the same shape: one worker does the applying, and the reporting path back to me is the checker. Every application lands on a shared board with its status; anything the worker can't answer or can't get past gets flagged to me instead of guessed at.

Which brings us back to the Indeed wall. That agent did the right thing. It hit a checkpoint it couldn't pass, said so, and waited. A worse agent — one with a looser harness — might have tried to get clever. The inch between saying and doing is also the inch where things go wrong, and the harness decides which.

## What I actually run: the apply line

Since this chapter promises a working example with the failure included, here is mine, running right now.

The inputs: a shared task board listing job postings, a profile file with my employment history and answers, and my standing rules — never guess a salary answer, never invent a work-authorization status, never create an account in my name without asking, applications at or above my salary floor unless I've waived it. The worker's tools: a browser it can drive, form fields it can fill, a way to upload my resume, and a connection back to the task board to log what happened.

A clean run looks like the Five9 application from this week: a VP-level engineering role, remote, base range well above my floor. The worker opened the posting, read the requirements, filled the form, and hit six screening questions that only I could answer — things like how many years I've led Python and SQL teams, whether I have AI-in-the-data-warehouse experience. It stopped, asked me, and I dictated the answers in about thirty seconds. It entered them verbatim, submitted, and the confirmation came back clean. Done, logged, next.

The failures are the curriculum:

- **Indeed, the human-verification wall.** The worker couldn't open the posting at all. Nothing submitted, flagged to me. Correct behavior — but note what it required: a harness that treats "I can't get in" as a report, not a problem to route around.
- **A drill-down list that didn't match.** One company's application asked "how did you hear about us," and my answer — "Internet Job Board" — wasn't one of the selectable options. The worker stopped instead of picking the closest match, because the closest match to a source-of-hire question is a small lie, and small lies in hiring systems compound.
- **The CAPTCHA that needs my hands.** Another application is complete except for a reCAPTCHA and the final submit click — deliberately left for me, because solving a CAPTCHA on someone's behalf is exactly the kind of line you don't want your agent learning to cross on its own.
- **The login that didn't work.** A saved credential failed on a company portal, the password reset email never arrived, and rather than keep hammering the login form, the worker reported it and we switched to creating a fresh account. Retry loops against someone else's authentication system are how you get flagged as a bot — which is what the Indeed wall was built to catch in the first place.

Every one of those failures is a tool-use failure, not a model-intelligence failure. The model was smart enough in each case. What mattered was the boundary: what the tools were allowed to touch, and what happened when a tool call hit something it shouldn't push through.

## How it breaks

Now the failure modes, stated plainly, because this is the part that decides whether the technology is a tool or a hazard.

**The wrong call with real consequences.** The scariest failure isn't a bad answer — it's a correct-looking tool call aimed at the wrong target. In 2026 a widely discussed social-media report described a developer who asked a coding agent to write a script organizing temporary files; during the session the agent executed a recursive delete across the developer's home directory. I can't independently verify that report, and you should treat any specific telling of it with skepticism — but the *shape* of it is verified by the architecture itself. An agent with a file-deletion tool and a misunderstood instruction is a loaded mechanism. The model proposed; the harness disposed. Nobody checked the proposal against the blast radius.

**Acting without understanding.** In September 2026, the AI company Sierra published a benchmark with an uncomfortable result. They asked coding agents to do something realistic: take the messy records of a fictional business — handbooks, spreadsheets, support logs — and build a working customer-service agent from them, the way a real consulting engagement works. The strongest automated setup, a top-tier model running inside a leading coding tool, succeeded 23.9% of the time. A reference pairing of a human engineer with the same model succeeded 82.2% of the time. The failure pattern was telling: the agents issued shallow queries instead of really comprehending the records, barely communicated, and shipped the first design that ran. Tools let them act at full speed. Nothing in the loop forced them to slow down and understand.

An earlier benchmark from the same lab tells the other half: even on simpler tool-calling tasks, agents that succeed once often fail on retry — consistency degrades across repeated trials. An agent that works six times out of ten is not "mostly working." It's a coin flip with good branding.

**Silent cost compounding.** Every turn of the loop costs money. An agent that invokes five to ten tools in a single run — which is normal — multiplies its token costs invisibly, because each tool result gets fed back into the model and reprocessed. Nobody watches a meter spin while an agent "thinks." In my own operation this is why the apply line has budgets and the chapter pipeline has per-run scopes: an agent with no spending governor is a taxi with the meter covered.

**The permission problem.** Every tool an agent can reach is attack surface. Security researchers spent 2026 documenting what happens when tool-using agents meet malicious instructions hidden in web pages, documents, or tool responses — the agent reads poisoned content through a tool and treats it as instruction. My Cerberus project exists for exactly this reason: AI-written code, shipped fast by agents, needs automated security scanning because the loop optimizes for "it runs," not "it's safe." A tool is a door. Every door you install is a door someone else can knock on.

How do you detect these? The same way you detect problems in any system that acts in the world: verification loops with independent checkers, permission scoping (the agent gets the tools it needs and no more), cost and behavior logging on every tool call, and a reporting path that a human actually reads. The incident reports that go badly are always missing at least one of those. The ones that go well — like my Indeed wall — have all four.

## Why this matters in 2026

Because the inch is closing under your feet whether you study it or not.

The products landing in consumers' hands this year — inbox assistants that draft and send, shopping agents that buy, coding assistants that ship, scheduling agents that book — are all the same mechanism: a model, a menu of tools, a loop, a harness. When you grant one of these products access to your email or your credit card, you are not trusting the model. You are trusting the harness — the permission checks, the confirmation steps, the boundaries someone set around what the loop is allowed to touch. The model is interchangeable. The harness is the product.

The numbers say the shift is already infrastructural. MCP went from an Anthropic side project to a Linux Foundation standard backed by every major AI company in about a year, with monthly downloads in the tens of millions and most enterprise AI teams running MCP-backed agents in production. Analyst forecasts have two in five enterprise applications shipping with AI agents by the end of 2026. This is no longer a demo category. It's plumbing.

And plumbing is where the consumer-safety questions live. A chatbot that gives you a wrong answer costs you a minute. An agent with the wrong tool permissions can send the wrong email to your boss, buy the wrong thing, delete the wrong folder, or apply to the wrong job in your name. The safety conversation most people are having — "is the AI smart enough, is it aligned, does it understand me" — is aimed at the model. The safety conversation that will actually determine outcomes is aimed at the harness: what can it touch, who approved that list, what does it log, and who reads the log.

There's an ethics layer too, and it's sharper than it looks. When my agent fills out a job application with answers I dictated, whose application is it? Mine — I made every decision, and the guardrails exist precisely to keep it that way. But every step you remove the human from — every auto-submit, every auto-solved CAPTCHA, every guessed answer — moves authorship away from the person and toward the system, without telling anyone it happened. Convenience wants the loop fully closed. Honesty wants a human in it at exactly the points where a decision is being made. The whole book is about finding that line; this chapter is where the line gets its machinery.

## The skeptic's corner

I can hear the technically informed reader, because I've been that reader.

*"This is just RPC with extra steps. We've had APIs and scripts for decades. The model is a fancy argument-parser."*

Yes. That's exactly what it is, and saying so is clarifying, not dismissive. The mechanism is old — a program calling functions is the oldest trick in computing. What's new is *who writes the call*. For fifty years, a human decided which function to call with which arguments, and wrote that decision down in code. Now a statistical model makes that decision fresh on every turn, in language it was never explicitly programmed to handle, with no type checker on its intentions. RPC with a human author is engineering. RPC with a model author is engineering plus a judgment call you didn't write. All the old discipline — least privilege, audit logs, confirmation for destructive actions, tests — doesn't go away. It becomes load-bearing.

*"The benchmarks say these things fail half the time. The Sierra numbers are terrible. Why should I trust any of this?"*

You shouldn't — not blindly, and not on the model's intelligence alone. The 23.9% number isn't an argument against tools; it's an argument against *unverified* tools. Notice what the reference setup did to reach 82.2%: it added a human engineer — a checker, a verifier, a second loop. Every reliability technique in this chapter is a version of that: builder plus checker, permissions plus logging, action plus confirmation. The skeptics are right that the loop alone is unreliable. That's why nobody serious runs the loop alone.

*"MCP is hype. It's just a standard, and standards don't make agents smart."*

Correct, and that's the strongest thing about it. USB-C didn't make devices smarter either — it made them interoperable, which made the whole category cheaper and more competitive. MCP's value isn't intelligence; it's that any assistant can now reach any tool without a custom integration, which means the market for agents competes on the harness — on safety, verification, and cost control — instead of on who has the most connectors. Standards move the competition to the part that matters.

## The operator rule

Here's the rule I run my own operation on, and the one this chapter earns:

**An agent is only as trustworthy as its tools, boundaries, and reporting path.**

Not as smart as its model. As trustworthy as its tools (what can it reach?), its boundaries (what is it forbidden to push through?), and its reporting path (who finds out what it did, and can they do anything about it?).

And the measurable test — because a rule you can't check is a slogan:

Pick ten real tasks your agent does regularly. For each one, record three numbers: the percentage completed with no human intervention, the percentage where the agent correctly flagged a blocker to a human instead of guessing or forcing through, and the total cost per completed task. Run it monthly. If the no-intervention rate climbs while the correct-flag rate holds and cost per task falls, the harness is improving. If the correct-flag rate drops — the agent is pushing through walls instead of reporting them — you don't have an agent. You have a liability with a login.

## Notes

Sources and evidence for the claims in this chapter, checked during drafting in September 2026:

- **Function-calling mechanics** (model emits structured request; application executes; result returns): described consistently across engineering references, e.g. the tool-calling explainer at https://www.remoteopenclaw.com/blog/ai-agent-tool-calling-explained and the function-calling walkthrough at https://github.com/nebius/token-factory-cookbook/blob/HEAD/tool-calling/function-calling-explained.md
- **The agentic loop and iteration caps** (loops terminate on direct answer or max iterations, commonly ~10): e.g. https://github.com/dagucloud/docs/blob/HEAD/features/chat/tool-calling.md
- **MCP overview, the N×M → N+M collapse, and the "USB-C of AI" framing**: https://github.com/dazeb/dennysentinel.com/blob/HEAD/src/content/blog/model-context-protocol-internet-of-agents.md and https://ainexustools.online/blog/what-is-mcp-model-context-protocol-2026/
- **MCP adoption figures** (~97M monthly SDK downloads as of March 2026, ecosystem-reported; 9,400+ public servers; donated to the Agentic AI Foundation under the Linux Foundation in December 2025; founding members include OpenAI, Block, AWS, Google, Microsoft, Cloudflare, GitHub, Bloomberg): https://andrew.ooo/answers/mcp-model-context-protocol-enterprise-adoption-july-2026/ and https://github.com/iris-eval/mcp-server/blob/HEAD/docs/blog/002-state-of-mcp-agent-observability-2026.md — treat the 97M and survey figures (78% of enterprise AI teams, 28% of Fortune 500, April 2026 survey; Gartner 40% forecast) as ecosystem/vendor-reported, not independently audited
- **Tool-call chains in production** (5–10 tool invocations per agent execution; costs compound silently; every tool call is attack surface): https://github.com/iris-eval/mcp-server/blob/HEAD/docs/blog/002-state-of-mcp-agent-observability-2026.md
- **Sierra hyper-τ-bench** (strongest automated configuration 23.9% vs. expert-plus-model reference 82.2%; failure pattern of shallow queries and under-communication; paper submitted to arXiv September 4, 2026): https://arxiv.org/abs/2609.04611 and https://www.unite.ai/sierra-open-sources-hyper-tau-bench-a-benchmark-for-agent-construction/
- **τ-bench consistency degradation** (e.g., GPT-4o ~61% pass@1 on retail tasks falling to ~25% across repeated trials): https://oss.vstorm.co/blog/tau-bench-ai-agent-benchmarks/ and https://github.com/steel-dev/leaderboard/blob/HEAD/docs/research/tau-bench/summary.md
- **The recursive-delete incident report** (developer reported a coding agent executing a recursive delete of a home directory during routine testing): circulated in social-media posts in 2026; cited here as a reported incident, not independently verified — included for the failure *shape*, which the architecture confirms is possible
- **Closed-loop / builder-checker practice** (verification loops and separate checker agents as the key reliability pattern; "supervisory loop" architectures around Claude Code and Codex): widely discussed in creator and practitioner posts across social platforms in 2026; specific attributions intentionally kept general — the pattern, not the personalities, is the evidence
- **Joshua's own operation** (the Indeed human-verification block on September 22, 2026; the Five9 and Unite Us applications; the drill-down mismatch; the CAPTCHA held for manual action; the failed portal login): from his own records and this assistant's run logs — the lived material this chapter is built on

## The wall, revisited

That Indeed wall is still there, as far as I know. The posting may have expired by now. But I keep thinking about what the agent did in that moment, because it's the behavior I want from every system I hand real-world access to: it tried the door, found it locked, and came back to tell me — instead of picking the lock, finding a window, or pretending the room didn't exist.

Tools turn models into workers. The harness decides what kind of worker. Build the loop, scope the tools, keep the reporting path open, and put a human at every point where a decision is actually being made. The model will keep getting smarter. Your job — the operator's job — is to make sure the hands stay honest while the brain catches up.
