# Direct and Route

*Intent starts with the human. Then the work goes where it belongs.*

On my network there's a machine that never sleeps. On it, a small fleet of Hermes agents handles my media management, my invoicing, my email, my admin — everything Claude Code and Codex don't cover.

I didn't set out to build a routing system. I set out to stop doing chores. But somewhere between the second agent and the fourth, the real work stopped being the chores. The real work became the routing: deciding which job goes to which worker, in which room, with what memory, and how I'd know it got done right.

That's what this chapter is. Not the agents. The routing. Because in 2026, the question "which AI should I use?" has quietly become the question "where does this piece of work belong?" — and most people are answering it by accident.

## The four questions

Every request you make of any AI answers four questions, whether you ask them or not:

1. **What is the workload?** Is this a one-sentence answer or a three-hour job? Does it need reasoning, or just speed?
2. **Where can the data go?** Is this a grocery list or your bank statements? Can it leave your house?
3. **What must persist?** Is this a throwaway question or the first step of a project that runs for weeks?
4. **How will you know it worked?** Can you check the answer yourself, or do you need the system to prove it?

Skip them and you still get an answer — just not necessarily a cheap one, a good one, or a safe one. The meme writes itself: a husband burns his last $15 of API credits asking the most expensive reasoning model on Earth to "write a funny poem about the cat." Seventy-seven thousand likes on that one, because everyone who has ever watched a quota die for nothing recognized themselves in it.

Routing is the discipline of asking the four questions on purpose.

## What a router actually is

Strip the jargon and a router is a bouncer with a clipboard. A request comes in. The router classifies it — easy or hard, cheap or consequential — and sends it to the right worker.

Anthropic's own engineering guidance names routing as one of the core workflow patterns: classify the input, send easy and common questions to a small cheap model, send hard and unusual ones to the capable one. Their stated rule is worth stealing for everything else in life: find the simplest solution possible, and only add complexity when needed. Agents, they warn, trade latency and cost for performance — don't pay that trade unless the job earns it.

In practice, routing shows up in four flavors:

**Hardcoded tiers.** The split most teams actually ship. Cheap model for autocomplete, frontier model for full-file edits and chat. No intelligence, just a rule. It works because the split is honest about the workload: generating the next twenty characters of a variable name and re-architecting a module are not the same job.

**Classifier routers.** Open-source projects like RouteLLM score how complex a prompt looks and bounce it between a strong and a weak model. Startups like Not Diamond train routers on which model actually performed best on which prompt types, then predict the cheapest model that can still nail it. Martian has publicly claimed up to 98 percent API-spend cuts for some customers — that's a vendor claim, not an independent audit, but the direction is real.

**Gateway routers.** OpenRouter sits in front of hundreds of models with an auto mode and fallback chains: try the cheap one, escalate if it fails. Portkey adds routing rules and per-model daily spend caps. This is routing as plumbing — the same way your email provider tries the primary server and falls back to the secondary.

**Self-routing models.** When OpenAI shipped GPT-5 in August 2025, it didn't ship one model — in the words of one industry writeup describing Sam Altman's remarks, it shipped a router: a real-time system choosing fast or reasoning models per prompt. You are already living inside routing decisions you never see. The question is only whether you're making any of them yourself.

Then there's the orchestration layer — what happens after the route. Two patterns dominate. In the manager pattern, one central agent keeps control and calls specialists as tools; it owns the final answer. In the handoff pattern, one agent transfers the whole conversation to a specialist, the way a triage nurse hands you to a doctor. The manager is the safer default when a human-review gate has to stay in charge. The handoff is right when routing *is* the workflow — triage, dispatch, escalation.

## The money is real, and it's in the output

Here's the part that makes routing a consumer issue instead of an engineering hobby: the price spread between models is enormous, and it's widest exactly where you spend the most — on generated tokens.

Anthropic's own pricing page, read the day I'm writing this: Haiku 4.5 at $1 in / $5 out per million tokens; Opus 5.5 at $4 / $20; Fable 5.1 at $10 / $50. Same lab, same API, and the top model costs ten times the small one per output token. OpenAI's page: GPT-6 Luna at $0.10 / $0.50, GPT-6 Astra at $10 / $50 — a hundred-fold spread on output. Output tokens run five to ten times the price of input tokens across both lineups, so the money question is almost never "what did I feed it?" It's "what did I ask it to write?"

Run the cat poem through the frontier model and you bought a poem with a fortune's budget. Run a file rename through Opus 4.8 — "Me Using Claude Opus 4.8 to Rename a file," caption "True story" — and the joke is the invoice.

That last point deserves its own section, because it's the one people get backwards.

## The room the model lives in

Some jobs aren't about which model is smartest. They're about which room the model lives in.

A creator with a hundred and ten thousand followers built a personal tax agent that processes his bank statements on a local model, specifically so nothing leaves his machine — his on-screen caption reads, more or less: stop putting your client's data in ChatGPT. Another creator warns against pasting client contracts, financial summaries, and strategy docs into cloud AI, and names the local options: Ollama, LM Studio, Jan. The guidance from the people who run this stuff in production is blunt: run local when you're developing, prototyping, air-gapped, handling sensitive data, or avoiding per-token costs. Run cloud when you need speed, maximum quality, or concurrency. The common hybrid is develop locally, deploy on cloud.

This is routing by sensitivity, and it's the dimension with the sharpest teeth. Send the wrong workload to the cloud and the failure isn't a bad answer — it's your client's contract sitting on someone else's server. A commenter on one of those reels put the economics in one line: "When something is free, the price is your DATA." The counterpoint, from another: "IF you run 'local' AI, you will end up with useless hallucinating babble." And the practitioner's reality check: "I had 1 3090ti running a local model, it heated up my bedroom to sauna temps."

Local has a physical cost. Cloud has a privacy cost. Routing is how you stop paying both at once.

## Where it breaks

Routing fails in two directions: too little and too much.

**Too little** is the default. You send everything to the big model, or everything to the one chatbot you like, and the failures are invisible until they aren't. An industry writeup on routing put it well: routing breaks quietly. A slow erosion of answer quality that shows up in churn numbers three months later. In agent chains the mistakes compound — a weak planner poisons every downstream step, and you don't find out until the end.

The bills tell the story before you do. One builder wrote about burning more than $3,000 in tokens while micromanaging his agents — "$800, then $1,200, then another grand vanished. Each charge was a receipt for my own micromanagement." He wasn't paying for the AI's work. He was paying for standing over its shoulder. Another measured that every time his coding agent runs a routine `git status`, it feeds the language model 2,000 tokens of noise. The routing failure there wasn't model choice. It was giving an expensive worker a job that needed no worker at all.

**Too much** is the failure nobody warns you about, because it looks like diligence. The researchers behind ACRouter — an agent that routes each coding task to the model most likely to nail it — found their system beat always-use-the-frontier setups by 2.6× on cost in their own benchmarks. And in the same breath, they said routing is overkill for trivial tasks where any model suffices, for low-volume work that doesn't justify the engineering, and for subjective domains like creative writing where success can't be verified. A hobbyist who built his own small router found the same thing from the other side: the router's switching overhead can erase the benefit when the gap between models is small. Routing pays when the expensive model is *sufficiently* expensive relative to the cheap one. Otherwise you're building a toll booth on a driveway.

The Reddit consensus, aggregated across the big AI subs, landed somewhere wise: model choice has become an operating policy instead of a preference. And the line that stuck with me: satisfaction was highest when users had a clear role for a tool, and lowest when a tool silently chose the role for them. Nobody minds routing. Everybody minds being routed without being told.

I live this one. My job search runs on two agent systems against one board — this assistant's lineage and Instinct, in friendly competition. We routed it explicitly: who files what, who logs where, duplicate-check rules in a shared repo. The routing is the system. Without it, two fast workers are just two fast ways to apply to the same job twice.

## Why this matters in 2026

Three things changed this year that turned routing from an engineering detail into a consumer survival skill.

First, the frontier won't sit still. "Whatever you pick today is wrong in six months," wrote one 2026 model-selection guide. "The frontier is moving fast — every release shifts the price/performance curve. The teams that win don't pick the best model now; they pick a setup that lets them swap models cheaply when something better ships." Routing *is* that setup. The habit of asking the four questions outlives any particular model.

Second, the models ship with routers inside. GPT-5's real-time router means the default consumer experience is already routed — by someone else's rules, toward someone else's margins. The person who understands routing can see the seams: when the fast model answered a question that needed the reasoning model, when the default changed under them. The person who doesn't just notices the answers got worse and blames the AI.

Third, the evidence says no single model wins everything. The ACRouter researchers found no single model dominating every niche — and their self-learning router, which watches whether the chosen model actually succeeded and adjusts, beat static setups. Static routing — pick a favorite, never revisit — decays. Routing is a practice, not a purchase.

And the stakes are no longer theoretical. People are running tax agents on bank statements, drafting legal language, automating their inboxes. The four questions — workload, sensitivity, persistence, evidence — are the difference between a system that serves you and a system that spends you.

## The skeptic in the room

"Isn't this just 'use the right tool for the job'? Did that need a chapter?"

Fair. And the honest answer is: yes, it's common sense — and common sense is exactly what breaks when the tools change faster than the habits. Nobody needed a chapter on choosing the right screwdriver because screwdrivers didn't start choosing themselves. These tools do. They route you, silently, every day. The chapter exists because the default is no longer neutral.

"Fine, but the router itself costs. The switching overhead, the classifier, the engineering. Sometimes the big model for everything is just simpler."

Also fair — and the evidence agrees with you, up to a point. For trivial tasks, use whatever's open. For low-volume work, hardcode the split or skip it. The hobbyist's finding stands: routing only pays when the cost gap is big enough to matter. But notice what that argument concedes: it concedes that routing is a *decision*, made deliberately, with the costs counted on both sides. That's the whole chapter. I'm not selling you a router. I'm selling you the four questions.

"The models will get cheap enough that none of this matters."

Maybe. Prices have fallen before and the frontier keeps moving. But the sensitivity question doesn't get cheaper with scale — your bank statements don't become less yours because inference got cheaper. And the persistence question doesn't either. Cheap models don't tell you where the work belongs. Only you do.

## The operator rule

Route by workload, sensitivity, persistence, and evidence.

Say it before you start: what is the job, where can the data go, what must be remembered, and how will I know it worked. Write it down if the work repeats. Revisit it when the models change — which is to say, revisit it constantly.

## A test you can actually run

Take the twenty tasks you hand to AI most often. For two weeks, route them deliberately — cheap and local where the data is sensitive or the job is small, frontier where the reasoning is hard, a script where no model is needed at all. Track two numbers: what each task cost, and how often you had to override or redo the result.

Then run the same twenty through a single default for two weeks and compare. If your routed setup costs meaningfully less at the same override rate — or holds the same cost at a lower override rate — the routing earns its keep. If it doesn't, tear it out. The test is the point: a routing policy that can't survive measurement is just superstition with a dashboard.

One number to watch in particular, borrowed from the automation folks: the human override rate. Track it alongside the error rate and the cost, and it tells a completely different story than time saved alone. When overrides climb, your routing is wrong somewhere — the workload changed, the model changed, or the job was never the job you thought it was.

## Back at the desk

The machine on my network is still running. The fleet still handles the media, the invoices, the email, the admin — the stuff Claude Code and Codex don't cover. Nothing about that setup is permanent. The models will change, the prices will change, the fleet will grow or shrink. What stays is the habit: tell every job where it lives before it starts.

Intent starts with the human. Then the work goes where it belongs.

## Notes

- Anthropic, "Building Effective Agents" — routing as a named workflow pattern; "find the simplest solution possible, and only increasing complexity when needed"; agentic systems "often trade latency and cost for better task performance." https://www.anthropic.com/engineering/building-effective-agents (read 2026-09-24)
- Anthropic official pricing — Haiku 4.5 $1/$5, Opus 5.5 $4/$20, Fable 5.1 $10/$50 per 1M input/output tokens; cache reads 0.1×; Batch API 50% off. https://platform.claude.com/docs/en/about-claude/pricing (read 2026-09-24)
- OpenAI official pricing — GPT-6 Luna $0.10/$0.50, GPT-6 Sol $2.00/$10.00, GPT-6 Astra $10.00/$50.00 per 1M input/output tokens. https://developers.openai.com/api/docs/pricing.md (read 2026-09-24)
- VentureBeat on ACRouter — no single model dominates every niche; the self-learning router beat Opus-always setups 2.6× on cost ($13.21 vs $34.02) in the researchers' own CodeRouterBench; routing is overkill for trivial, low-volume, or subjective tasks. https://venturebeat.com/orchestration/acrouter-picks-the-smartest-ai-model-per-task-beating-opus-only-setups-by-2-6x-on-cost (read 2026-09-24; figures are the researchers' benchmarks, not independent audits)
- StartupFortune on model routing — OpenRouter auto-routing and fallback chains; Not Diamond and Martian router approaches (Martian's 98% spend-cut claim is the vendor's); Portkey routing rules and spend caps; GPT-5 shipped as a router (the article's characterization of Altman's remarks, not a direct quote); "routing breaks quietly… a slow erosion of answer quality that shows up in churn numbers three months later"; weak planner poisons downstream steps. https://startupfortune.com/how-does-ai-model-routing-work-and-why-its-halving-llm-bills/ (read 2026-09-24)
- Hindsight + Ollama (Vectorize, March 2026) — "Use local when: developing, prototyping, running in air-gapped environments, handling sensitive data, or avoiding per-token costs. Use cloud when: you need speed, maximum quality, tool calling reliability, or production-scale concurrency." https://github.com/vectorize-io/hindsight/blob/HEAD/hindsight-docs/blog/2026-03-10-run-hindsight-with-ollama.md (read 2026-09-24)
- Emmanuel Mark Ndaliro, "I burned through more than $3,000 in AI tokens" — "I wasn't smart. I was lazy... My API bills told the story: $800, then $1,200, then another grand vanished. Each charge was a receipt for my own micromanagement." https://medium.com/@kram254/i-burned-through-more-than-3-000-in-ai-tokens-836bd5077e88 (June 2026; quote verbatim)
- Bachar Moustapha on agent token waste — "Every time Claude Code runs `git status`, it feeds the LLM 2,000 tokens of noise." https://medium.com/@bacharadjao/your-ai-coding-agent-is-wasting-80-of-its-token-budget-on-garbage-c698dffc143b (quote verbatim)
- Klaws 2026 model-selection guide — "They pick a single 'winner' and route everything through it. In 2026 that's expensive and limiting." / "Whatever you pick today is wrong in six months… The teams that win don't pick the best model now; they pick a setup that lets them swap models cheaply when something better ships." https://klaws.app/blog/how-to-choose-ai-model-for-agent (quotes verbatim)
- "You're Using the Wrong AI Model for the Job" (Aug 2026) — "Choosing the most powerful AI model for every task can increase cost, latency, and complexity without improving the result. Better AI systems match the model to the workload." https://medium.com/skillstuff/youre-using-the-wrong-ai-model-for-the-job-864b991d9ad7 (quote verbatim)
- r/ClaudeCode — quota-burn threads; the community response was downgrading, routing overflow to cheaper models, and breaking work into smaller chunks. https://www.reddit.com/r/ClaudeCode/comments/1v389c3/someone_else_see_increased_token_usages/ and https://www.reddit.com/r/ClaudeCode/comments/1v3q2hl/burned_through_max_5x_in_an_hour/ (content paraphrased from thread digests)
- r/ClaudeCode — one user's role-split heuristic: frontier model as orchestrator only, small models for scouting, mid-tier for research and implementation, short subagent reports. https://www.reddit.com/r/ClaudeCode/comments/1wbc03f/how_i_use_subagents_without_burning_through_fable/ (paraphrased from thread digest)
- r/AI_Agents — "Do AI Agents actually do anything for you guys?", including the agent-when-a-script-would-do critique. https://www.reddit.com/r/AI_Agents/comments/1snwwmc/do_ai_agents_actually_do_anything_for_you_guys/ (paraphrased from thread digest)
- r/automation — "How do you actually know when your AI automation is working vs just burning money?", and the human-override-rate tracking practice. https://www.reddit.com/r/automation/comments/1snute8/how_do_you_actually_know_when_your_ai_automation/ (paraphrased from thread digest)
- HN "10 agents" post-mortem — "an expensive nightmare… infinite loops that burned through tens of thousands of tokens, and 'phantom executions' where the orchestrator would mark a task as complete without writing a single line of code." https://news.ycombinator.com/item?id=45525963 (quote verbatim)
- Instagram @acknowledge.ai — "When your wife uses your last $15 of API credits to ask the LLM to 'write a funny poem about the cat' in the most expensive reasoning model." https://www.instagram.com/reel/DZJUec7zyU8/ (June 2026; on-screen text verbatim)
- Instagram @devhumour.ai — the $20 variant of the same joke, 81K likes. https://www.instagram.com/reel/DVwwtneCJ7T/ (on-screen text verbatim)
- Facebook vibecoding group — "Me Using Claude Opus 4.8 to Rename a file," caption "True story." https://www.facebook.com/groups/vibecodinglife/permalink/2043932446195282/ (on-screen text verbatim)
- Instagram @antoine.digital (Aug 2026) — local tax agent processing bank statements on a local model so nothing leaves his machine; on-screen: "STOP PUTTING YOUR CLIENT'S DATA IN CHATGPT, CLAUDE, ETC." https://www.instagram.com/reel/DboeByVplcK/ (paraphrased)
- Naomi Haile (Apr 2026) — warns against pasting client contracts, financial summaries, and strategy docs into cloud AI; names Ollama, Jan.ai, Locally AI, LM Studio. https://www.instagram.com/reel/DXfcEZVkkX1/ (paraphrased)
- aifoss.dev 2026 backend comparison — "run Ollama for anything private, and keep an OpenRouter key around for the rare job that needs a 400B-class model." https://aifoss.dev/blog/ollama-vs-openrouter-vs-groq-vs-nvidia-nim-llm-serving-2026/ (Sept 23, 2026; snippet-sourced)
- Medium routing-overhead experiment — router switching overhead can erase the benefit when the model cost gap is small; routing pays once the expensive model is sufficiently costly relative to the cheap one. https://medium.com/@jonatassilvaperaza/i-built-a-small-experimental-llm-router-and-found-when-it-actually-gets-faster-f5ed4c46230f (July 2026; single-hobbyist experiment, snippet-sourced)
- Joshua's own setup — Hermes agent fleet on his desktop (media management, invoicing, email, admin — the work Claude Code and Codex don't cover), six-agent lab with Muse and Instinct as the two main systems, and two agents auto-applying against one shared Linear jobs board with duplicate-check rules. From his own notes and working setup, September 2026.
