# Hardware, Models, and the Cost of Intelligence

> **Status:** Draft
> **Part:** part-01-crash-course
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/47
> **Target length:** 2,500–4,000 words

## The lab has a power bill

The first mistake in an AI conversation is usually made before anyone opens a model. We talk about intelligence as if it floats above the machine: a disembodied capability that can be purchased by the request, copied into a product, and scaled without friction.

The lab says otherwise. A model is a file, a set of operations, and a workload. It needs memory to hold its weights and temporary activations. It needs arithmetic to turn those weights into predictions. It needs storage, networking, cooling, electricity, and an operator who can make sense of the bill when the experiment becomes a service. The model may be impressive. The machine still has to carry it.

I have learned this from the repository itself, not from a heroic benchmark. The earlier chapters in this book move from models that represent and predict, to context and retrieval, to tools that let a model act, and then to coordination and verification. Each step adds an operational surface. The tool-using worker is not only a model call; it is a model call plus a runtime, credentials, state, latency, and a receipt. The coordinated system is not only several calls; it is also the cost of moving information between them and checking the result.

That is the lived proof available here: the manuscript's agent systems are built from ordinary machines, cloud services, boards, repositories, and repeated runs. The system works only when those pieces agree. A cheap call that cannot finish a task is not cheap. A powerful call that produces no verifiable improvement is not intelligence; it is overhead with a persuasive interface.

This chapter's promise is simple: by the end, you should be able to choose where intelligence runs—on your computer, in a rented cloud, or behind a provider API—based on workload, evidence, and total cost rather than prestige. You should also know what the hardware does *not* tell you. A larger GPU does not guarantee a more truthful answer. A cheaper token does not guarantee a cheaper workflow. A local model does not automatically make your data private. Every one of those statements requires a boundary and a test.

## Intelligence is constrained by a physical loop

A model turns input into output through a repeated loop. The input is represented as numbers. The model performs many matrix operations. The result is converted into a probability distribution over possible next tokens. Then the selected token becomes part of the next input, and the loop continues.

Three physical constraints dominate the loop.

**Memory capacity** determines whether the model and its working context fit. Model weights occupy space. A rough first estimate is parameter count multiplied by bytes per parameter, before accounting for runtime overhead, caches, and temporary data. Quantization stores numbers with fewer bits, reducing the weight footprint. That can make a model runnable on a consumer computer, but it is a trade: less memory movement and lower cost can come with quality or compatibility limits. The estimate is a planning aid, not a guarantee.

**Memory bandwidth** determines how quickly the machine can move those weights and intermediate values. A processor can have enormous arithmetic capability and still wait on memory. This is one reason hardware marketing is full of several different performance numbers. Peak arithmetic, memory bandwidth, interconnect speed, and measured application throughput answer different questions.

**Latency and throughput** describe different jobs. Latency is how long one request takes. Throughput is how many requests or tokens the system can process over time. A single user may care about the first. A batch job, application pipeline, or agent swarm may care about the second. Optimizing one can hurt the other.

The practical consequence is that “Can it run this model?” is an incomplete question. Ask instead:

- Can the weights, context, and runtime fit in available memory?
- At the required context length, how many tokens per second or requests per minute does it deliver?
- What happens when memory fills: rejection, swapping, offload, or silent slowdown?
- Can the runtime expose the tool calls, logs, and failures needed for verification?
- What does the whole workload cost, including idle capacity and operator time?

A provider may advertise a GPU's theoretical capability. A user needs the behavior of a particular workload on a particular runtime.

## The three places a model can live

There are three useful deployment choices, with many hybrids between them.

### Local: control and friction

A local model runs on hardware you own or control. The obvious benefits are control over the network path, predictable access to files, and no per-request API bill after the hardware is purchased. For sensitive drafts, private repositories, or offline work, that control can matter.

The costs are equally real. Hardware is capital. It depreciates. It consumes power and attention. A local machine may be fast for a small model and unusable for a larger one. CPU inference may work but be too slow for an interactive workflow. A laptop may run a compact quantized model yet struggle with a long context, several concurrent requests, or a tool-using loop.

“Local” also describes location, not a complete security guarantee. The operating system, extensions, logs, backups, and networked tools can still move data elsewhere. If the agent can call a remote search service or a hosted model, the workflow is hybrid whether the label says so or not.

### Cloud hardware: rented control

Cloud GPUs and accelerators turn capital expenditure into an hourly or usage-based charge. AWS describes its P5 family as instances powered by NVIDIA H100 GPUs, with P5e and P5en variants using H200 GPUs. Google publishes TPU prices in chip-hours. These are useful primary references because they expose the unit being rented: an instance, a chip, or a configured service—not an abstract unit of intelligence.

Cloud hardware is valuable when the workload is large, bursty, parallel, or too demanding for local equipment. It can also be the wrong choice for a small, irregular task. A machine that sits idle is still a cost. Storage, data transfer, orchestration, and engineering time can outweigh the nominal accelerator rate.

Cloud capacity introduces another operational dependency: availability. The machine may be powerful but unavailable in the region, interrupted, quota-limited, or misconfigured. If the workflow cannot resume from a checkpoint, the effective cost includes the work lost when the instance disappears.

### Provider API: rented outcome

An API is the easiest place to start. You send a request and pay according to a provider's published or account-specific terms. The provider manages hardware, model serving, upgrades, and much of the scaling.

The trade is less control. The model version may change. Rate limits may shape your architecture. Data handling depends on the provider's contract and configuration. Pricing may differ between input and output tokens, cached and uncached input, or standard and priority service. A multi-step agent can turn one user request into many billable calls, plus retries and verification.

The API is not “serverless intelligence.” It is a metered dependency. The right question is not whether the price per token looks small. It is whether the complete task produces enough value per successful run, after retries, tool calls, review, and failures.

## A cost model that does not lie to you

Start with a workload, not a model name. Define the task and record:

1. Number of input tokens and output tokens per run.
2. Number of model calls, including planner, worker, and verifier calls.
3. Tool calls, retries, failed runs, and human review time.
4. Required latency and concurrency.
5. Data-transfer, storage, and hosting requirements.
6. The cost of a wrong or incomplete result.

For an API workflow, a planning equation is:

`run cost = input tokens × input price + output tokens × output price + tool/retry cost + review cost`

For rented hardware:

`run cost = accelerator time × rate + storage + transfer + orchestration + operator time`

For local hardware:

`run cost = allocated hardware cost + electricity + maintenance + operator time`

These equations are deliberately boring. Boring is good. They force the hidden work into the ledger.

Suppose an agent uses a planning call, three research calls, a drafting call, and a verification call. Even without assigning a price, that is six model calls. If the first researcher fails and is retried, it is seven. If the verifier asks for a correction and the draft runs again, it is eight. A product that quotes the price of “one request” has not priced your workflow.

Do not fill the ledger with invented numbers. Obtain current prices from the provider's official pricing page, then measure your own token counts and wall-clock behavior. Prices change. Model names change. A claim such as “this workflow costs two cents” is incomplete unless it includes the date, provider, model, units, and assumptions.

The cost of intelligence is also a quality-adjusted cost. Let `S` be the percentage of runs that meet the acceptance test. Then a rough cost per accepted result is:

`cost per accepted result = total run cost / S`

Use `S` as a decimal in the calculation. If a workflow costs one dollar per run and succeeds on half of its runs, its accepted result costs two dollars before human correction. That is not a model verdict. It is a workflow measurement.

A cheaper model that needs extensive repair can lose to a more expensive model that passes the test on the first attempt. A local model with no API charge can lose to a hosted model if the local machine takes an hour and a human must babysit it. “Free” is often a way of hiding labor.

## A working example: the manuscript pipeline

Consider this book worker. It selects a GitHub issue, reads a template, researches a topic, writes Markdown, runs checks, commits, pushes, opens a pull request, and links that pull request back to the issue. The model is only one component.

The inputs include the issue body, repository files, current sources, and the editorial guide. The tools include Git, GitHub CLI, file operations, and web retrieval. The outputs include a manuscript file, a commit, a branch, a pull request, and an issue comment. Human decisions remain at the boundary: whether the evidence supports the claim, whether the prose sounds like the author, and whether a change should be merged.

Now look at hardware economics through that pipeline. A larger model might improve prose or research synthesis, but it cannot compensate for a missing GitHub credential. More VRAM does not fix a branch checked out from the wrong base. More tokens do not prove that a URL was current. A verifier call may identify a broken link, but the durable proof is the repository and GitHub response.

The pipeline also has a failure that belongs specifically to infrastructure. If the process stops after writing the file but before pushing, the draft exists locally but the deliverable does not exist for the team. If it pushes but fails to open the pull request, the branch exists but the review path does not. If it opens the pull request but fails to link the issue, the queue remains ambiguous. The correct unit is not “model completion.” It is “accepted manuscript change with a review path.”

That definition changes hardware choices. For this task, local execution may be adequate for editing and deterministic checks. A provider API may be useful for research synthesis. A cloud GPU is justified only if the workload includes a model or batch operation that demonstrably benefits from it. Renting an accelerator for the status of being an AI lab would be theater.

The same reasoning applies to a customer-support worker, a coding agent, or a job-search pipeline. Name the artifact that proves success. Price the whole path to that artifact.

## What failed, and how to catch it

**The benchmark won and the workflow lost.** A model can score well on a public test and still fail on your long context, domain terms, tool schema, or output format. Detect it with a representative evaluation set and a fixed acceptance test. Keep the benchmark result separate from your result.

**The model fit until the context grew.** Weight memory is not the whole memory budget. Long prompts, retrieved documents, and the key-value cache consume capacity. Detect this by testing the maximum context you actually need, not a short prompt. Record latency and failure behavior at several context sizes.

**The cloud bill arrived after the experiment.** An interactive notebook, idle instance, forgotten volume, or retry loop can turn a test into recurring spend. Detect it with budgets, automatic shutdown, per-run identifiers, and a cost alert. Human response: stop the workload, preserve the evidence, and reconcile the bill with the run log.

**The local model was called private, but the tools were not.** A local inference server may still have plugins, telemetry, remote retrieval, or cloud-backed dependencies. Detect it by drawing the data-flow diagram and inspecting outbound calls. Human response: classify data before it enters the workflow and disable tools that cross the approved boundary.

**Quantization solved memory and created a quality problem.** Lower precision may make a model fit, but a model that fits and fails the task is not a successful deployment. Detect it with a paired evaluation against the unquantized or hosted reference on your real examples. Human response: accept the trade only where the measurable task outcome remains within tolerance.

**The agent reported completion before the artifact existed.** This is the same trust gap seen in coordinated work. Detect it by requiring an external receipt: file existence, successful API response, commit hash, test output, or confirmation record. Human response: separate “attempted,” “returned,” and “verified.”

## Why this matters in 2026

In 2026, the choice between local, cloud, and API is no longer a hobbyist detail. Agents are turning model calls into durable actions: editing repositories, sending messages, changing records, and spending money. The hardware and serving layer determines not only speed but also who controls the runtime, where data travels, how failures are logged, and how quickly costs can compound.

The hardware market is also becoming more heterogeneous. NVIDIA's official H100 material separates performance across precisions and describes tensor-core acceleration; AWS offers different P5 configurations; Google prices TPU capacity by chip-hour. Those facts are not interchangeable. A GPU's advertised capability does not establish the cost or quality of a particular inference job. The unit of analysis must remain the workload.

The pressure will run in both directions. Better accelerators and serving software will lower the cost of some capabilities. Larger contexts, more agent steps, multimodal inputs, and continuous operation will increase demand. Falling unit prices can therefore produce rising total bills if people multiply the number of calls.

The human question becomes sharper as intelligence gets cheaper. If a model can draft ten versions, who decides which one represents the organization? If a local system can process private records, who audits the software around it? If a cloud run can complete a batch overnight, who owns the exceptions in the morning? Hardware answers “can this run?” It does not answer “should this run?” or “who is accountable?”

## The skeptical reader

A technically informed reader may object: *You are overemphasizing cost. Capability matters. If the best model produces a better result, pay for it.*

Correct. Cost discipline is not an argument for using the weakest model. It is an argument for measuring the result that justifies the stronger one. If the acceptance test is factual accuracy on a high-consequence task, use that test. If it is code passing a suite, run the suite. If it is a polished chapter, review the claims, sources, voice, and structure. Buy capability where it changes the outcome.

Another reader may say: *Local is obviously safer.*

Not automatically. Local reduces some forms of third-party exposure, but it does not erase malware, access control, backups, tool integrations, or operator mistakes. It gives you responsibility for more of the boundary. That may be exactly what you want. It is not the same as a guarantee.

A third objection is that these cost formulas are too simple for modern serving systems. Caching, batching, speculative decoding, reserved capacity, and shared infrastructure complicate the arithmetic.

They do. The formulas are a ledger skeleton, not a cloud-finance system. Add the provider-specific terms when they matter. The discipline is to make them visible rather than letting complexity become permission to guess. A precise-looking total built on unknown usage is less useful than a rough total with its assumptions exposed.

Finally: *Why not let the agent choose the hardware?* Let it route easy work to a small model and hard work to a large one.

That can be a good architecture. It needs a routing policy, a budget, and an escalation test. The agent should not route by prestige or confidence. Route by measurable signals: task type, context size, required latency, sensitivity, prior error rate, and remaining budget. Then record whether the routing choice improved accepted results. Intelligent routing is still a control system.

## Operator rule

Choose the environment by workload, evidence, and cost—not by the largest model or most impressive accelerator.

## Measurable test

For one representative task, run at least three configurations: a local or smaller model, a hosted API, and—only if relevant—a rented accelerator. Record the model version, hardware or service, input and output tokens, wall-clock latency, total billed or allocated cost, tool calls, retries, human correction time, and whether the result passed the same acceptance test.

Repeat each configuration enough times to reveal ordinary variation, then calculate cost per accepted result. Keep the raw run records. The winner is not the configuration with the cheapest token or the fastest demo. It is the one that meets the quality, privacy, latency, and accountability requirements at a cost you can defend.

The lab has a power bill. Put it in the experiment log.

## Evidence ledger

- **Claim:** NVIDIA describes H100 tensor cores as supporting multiple precisions, including FP64, TF32, FP32, FP16, INT8, and FP8.
  - **Source:** NVIDIA, “NVIDIA H100 Tensor Core GPU,” https://www.nvidia.com/en-us/data-center/h100/
  - **Last checked:** September 23, 2026.
- **Claim:** AWS describes P5 instances as powered by NVIDIA H100 GPUs, with P5e and P5en variants powered by H200 GPUs.
  - **Source:** AWS, “Amazon EC2 P5 Instances,” https://aws.amazon.com/ec2/instance-types/p5/
  - **Last checked:** September 23, 2026.
- **Claim:** Google Cloud publishes TPU prices using chip-hours as a pricing unit.
  - **Source:** Google Cloud, “TPU pricing,” https://cloud.google.com/tpu/pricing
  - **Last checked:** September 23, 2026.
- **Claim:** The manuscript worker's deliverable includes a file, Git history, a pull request, and an issue link.
  - **Source / artifact:** Repository workflow and canonical issue #47, https://github.com/murderszn/multi-agent-apps/issues/47
  - **Last checked:** September 23, 2026.
- **Claim:** The cost equations in this chapter are planning models, not provider quotations.
  - **Source:** Author's analytical framework; no external measurement asserted.
  - **Last checked:** September 23, 2026.

## QA checklist

- [x] Opens with a lab/proof scene without inventing a personal event.
- [x] Explains only necessary hardware and deployment mechanics in plain language.
- [x] Includes a working example with human decision points.
- [x] Includes failure modes, detection, and response.
- [x] Includes “Why this matters in 2026.”
- [x] Addresses skeptical readers and uncertainty.
- [x] States operator rule and measurable test.
- [x] Includes claim/evidence ledger with dates for current claims.
- [x] Does not invent personal experiences, metrics, prices, or product outcomes.
- [x] Copy edit completed.
- [x] Technical QA completed.
- [ ] Publisher review pass.
