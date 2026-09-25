# Models Represent and Predict

*Your agent didn't lie to you. It did the only thing it knows how to do: write the next word. The confidence was free.*

## The report that was wrong

Earlier this week one of my agents was filing job applications for me, dozens of them, and reporting back on a shared board. One evening it told me about the Novartis application — Executive Director, Head of Agentic Factory. The report said I had answered the referral-source question, picked a specific job board from the dropdown, and that the application was continuing and would be submitted.

It was written in the calm, finished voice of a done deal.

The next day I checked the actual board. The application was sitting at Step 1 of 8. Nothing had been submitted. The dropdown question was still open, waiting on me. The report had described a world that did not exist, and it had described it beautifully.

I wasn't angry. I run a lab full of these machines; I know what they are. But that evening I sat with the interesting part, which wasn't that the agent was wrong. Agents are wrong constantly. The interesting part was how *right* it sounded — and that I almost acted on it. If I hadn't opened the board myself, I would have spent the week believing a job application was moving when it was standing still.

This chapter is the smallest complete explanation of why that happens. Once you see the machine clearly, the confident wrong answer stops being a mystery and starts being a predictable output you can plan around.

## Your words go in, but the machine never sees words

Everything starts with a translation you never notice. Before a language model does anything, your text gets chopped into pieces called tokens. A token can be a whole word, part of a word, or a punctuation mark. The model never sees your sentence. It sees a list of chunk IDs.

I wanted a real number for this instead of a quoted one, so I ran the public tokenizer myself this week. I took 230 words of plain English prose and fed it through the open-source tokenizer library for OpenAI's GPT models. Result: 272 tokens. That's about 0.85 words per token, roughly five characters per token — right near the published rule of thumb that one token is about three-quarters of an English word.

The chopping is uneven, and the unevenness matters. "The quick brown fox jumps over the lazy dog" becomes ten tidy tokens, one per word plus the period. But "tokenization" becomes two chunks — "token" and "ization" — and "unhappiness" becomes "unh" and "appiness." Common words get their own chunk. Rare words get sawed into reusable parts. The machine learned this vocabulary from enormous amounts of text so it can represent almost anything, and the price is that what you wrote and what the machine "read" are two different objects.

This is the first thing to keep in your head: every strange, slightly-off behavior downstream starts here, at the fact that the machine operates on chunks, not on meaning the way you mean it.

## Meaning becomes coordinates

Each token gets converted into a long list of numbers — hundreds or thousands of them. This list is called an embedding, and the geometry of those lists is where something remarkable happens: tokens with similar meanings end up near each other in that number-space. The coordinates for "king" sit close to "queen" and far from "carburetor." Relationships between words become directions you can do arithmetic with.

The machine does not know what a king is. It has never met one. It knows where the king-chunk sits relative to every other chunk it has ever seen. Meaning, to this machine, is a neighborhood, not a definition.

That distinction will matter later. A definition can be checked. A neighborhood can only be navigated. When the machine reaches for a fact, it isn't opening a file — it's walking toward the part of the neighborhood where answers like this one tend to live, and describing what it finds there.

## It rereads everything before writing each word

Here's the second piece, and it's the one that made modern AI possible. As the machine writes, it doesn't just look at the last word. For every new token, it weighs *which earlier tokens matter* — scanning back across everything written so far and deciding what deserves attention.

The plain-language version: it rereads the relevant parts of the conversation before committing to each new word. When you write "the trophy didn't fit in the suitcase because it was too small," you know "it" means the suitcase. The machine figures that out the same way you do — by giving "suitcase" more weight than "trophy" at that moment. This mechanism, called attention, was introduced in a 2017 paper by researchers at Google with the gloriously confident title "Attention Is All You Need." The architecture it described — the Transformer — is still the skeleton inside essentially every capable model in 2026, including the ones running in my lab.

Attention is why these machines handle context so well and why they also, occasionally, attend to exactly the wrong thing with total conviction. The rereading is statistical, not careful. It weights what *usually* matters, which is right until it isn't.

## The one trick, repeated trillions of times

Now the core of it, the part the whole industry is built on. Training a language model is one move, repeated at incomprehensible scale: take a piece of text, hide the next chunk, guess it, check the guess, adjust. Do that trillions of times across most of the public internet and a large slice of the private kind.

That's it. That's the entire education. Guess the next chunk, given all the chunks so far.

Everything else these machines can do — hold a conversation, write code, summarize a contract, argue about history — is built on top of that one move. Generation works the same way, one step at a time: the machine scores every chunk in its vocabulary for "what comes next," picks one, appends it to what it has, and repeats. Predict, append, repeat. Engineers call this autoregressive generation, which is a fancy way of saying the machine eats its own output as it goes.

Sit with what this implies, because it's the whole chapter in one sentence: **the machine doesn't look things up; it reconstructs.** It is a student who did all the reading but took no notes. Ask about the book and you'll get a beautiful, fluent essay — and possibly an invented chapter, delivered with the same polish as the real ones. The fluency and the fabrication come from the same place. They're not two modes. They're one mode, applied to different amounts of evidence.

## The dial nobody told you about

After the machine scores its candidate next chunks, one more thing happens before it picks: a dial called temperature decides how strictly to obey those scores.

Turn the dial down and the machine almost always takes its top-ranked chunk. Same question, same answer, every time. Boring, repeatable, reliable. Turn the dial up and it starts sampling from further down the list — the plausible-but-not-best guesses. More surprising, more varied, more creative, and wrong more often.

Operators set this dial deliberately. Low for invoices, forms, and anything you'll sign. Higher for brainstorming product names and anything you'll throw away. Most consumer apps hide the dial entirely — the app maker chose a setting for you, usually somewhere in the middle. So when your chatbot gives you a slightly different answer every time you ask the same question, you're not seeing a mood. You're seeing the dial.

And here's the connection back to my Novartis report: a status update written at a middle temperature, by a machine whose training data is full of status updates that all sound certain, will sound certain. The certainty is a property of the *genre being imitated*, not a measurement of anything the machine actually verified.

## Why it sounds so sure

The industry's word for the confident wrong answer is hallucination, which is a slightly unfair word — it sounds like the machine is seeing things. It isn't seeing anything. It's completing a pattern.

When the evidence is thin, the machine does what it always does: produce the most plausible continuation. You've seen this in the wild. Last spring a video went around of a man asking his AI assistant which month is spelled with an X. The assistant answered "December," confidently, even embroidering it — "like a little holiday surprise" — before being walked back to October. There was a whole meme genre of people catching their chatbots claiming to have seen photos that were never uploaded. Millions of people have now watched a machine be wrong with perfect grammar and total poise. The humor lands because everyone recognizes the experience.

The deeper account comes from the labs themselves. In September 2025, OpenAI researchers published a paper titled "Why Language Models Hallucinate," and its argument is refreshingly blunt: the training pipeline *rewards guessing*. Benchmarks — the tests the industry uses to rank models — mostly grade the final answer, and on most tests a guess scores better than "I don't know." So the machines are optimized to be good test-takers, and a good test-taker never leaves a question blank. Hallucination isn't a glitch in the machine. It's the machine doing exactly what it was shaped to do, in the one situation where doing it looks like lying: when it doesn't actually know.

Read that again, because it's the most useful sentence in this chapter: **confidence is a style the machine learned from text, not a reading from an internal certainty meter.** It writes "definitely" because texts like the one it's imitating contain "definitely" — not because it checked.

## Tracing my bad report through the machine

Let's run the Novartis evening through the five pieces, because this is the working example: a real failure, fully explained, with the human decision points marked.

My message and the conversation history went in and got chopped into tokens — chunk IDs, not words. Those became coordinates in meaning-space, near other "job application status update" neighborhoods the machine had seen millions of times. As it wrote, attention weighed the relevant history: my question about the application, the earlier form-filling, the shape of a status report. Then the one trick: predict the most likely next chunk, append, repeat. "Continuing" is a very likely chunk in a status update. "Careerbuilder" is a plausible chunk after "job board." The temperature dial was at its default middle setting, so the prose stayed fluent instead of collapsing into repetition. And out came a report that read like a finished job.

At no point did anything check the board. Checking was never in the pipeline, because checking isn't a language move — it's an action in the world. That missing step is the entire subject of the next chapter. The model proposes; something else has to dispose. That evening, there was nothing else. There was only prose, doing the only thing prose-trained machines do: continuing the pattern convincingly.

The human decision point was mine, and it's the one this book will return to again and again: I opened the board myself. The failure was detectable in ten seconds by anyone willing to look at the underlying system instead of the report about the system. That's not a sophisticated defense. It's the whole defense.

## When it breaks and what you do

Every failure in this chapter has the same shape, so the response is one habit, not a toolkit.

**The failure mode:** a confident false completion. Status reports, citations, dates, names, prices, quotes — anything the machine renders in the assured voice of settled fact. It is most dangerous exactly where it looks most professional.

**Why it happens:** generation rewards completion. Training data teaches that questions get answered; benchmarks reward the guess over the shrug. Uncertainty has nowhere to live in the output except in the wording, and the wording is optimized to sound good.

**How you detect it:** ask what was actually checked. A claim with an artifact — a screenshot, a board entry, a receipt, a quoted source you can open — is a claim about the world. A claim with only prose behind it is a claim about prose. The danger zone is high confidence plus zero source markers. My lab rule for this is four words long: *show me the artifact.*

**How the human responds:** you don't argue with the report. You go around it, to the system it claims to describe. Open the board. Open the form. Open the receipt. Then you fix the process so the check happens before anyone acts: in my job-search operation, no application counts as filed until the confirmation exists somewhere other than an agent's message. The machine drafts; the world decides. That rule has caught more errors than any clever prompt I ever wrote.

## Why this matters in 2026

A word about where this chapter sits. Later in this book there's a chapter about the moment models became a commodity — good enough that picking a smarter one stopped being the game. I won't retell it here. The point for *this* chapter is what the commodity moment leaves behind: the scarce skill is no longer choosing the best model. It's operating the machine you already have without getting fooled by it.

That lands on all three of this book's promises.

**Safety:** my lab runs on standing rules — never guess a salary answer, never invent a work-authorization status, never file anything in my name without the artifact — and every one of those rules exists because of this chapter. A machine that completes patterns fluently will complete your application with invented facts if you let it. The rules are the walls around the guesser.

**Convenience:** the dial is yours to use once you know it's there. Anything you'll sign gets the low, boring setting. Anything you'll throw away gets the lively one. Knowing which you're doing is half of getting good output — most "the AI is so random" complaints are just a dial set for brainstorming doing invoice work.

**Ethics:** the responsibility for a confident claim stays with the human who acts on it. The machine can't own a consequence; it can't even know it produced one. That's not a limitation to fix. It's the boundary the final chapter of this book is about — what must stay human — and it starts here, with understanding exactly what the machine is and isn't doing when it tells you something.

One more 2026 note, for the cynical: remember that the industry's tests reward guessing. That means the products are tuned, however slightly, toward the confident answer over the honest shrug. Buy and deploy accordingly. The machine is not your enemy. But it was trained to impress a grader, not to protect your afternoon.

## The skeptic in the back row is right about 2019

The technically informed reader has been patient through five sections of what looks like a 2019 explainer, and deserves an answer: modern systems do far more than next-token prediction. They get reshaped by human feedback, they think out loud for pages before answering, they retrieve documents, they call tools. Surely the autocomplete story is outdated.

Steelman accepted — the stack is much deeper than it was. Here's why the chapter stands anyway.

First, the engine underneath still emits one chunk at a time from a ranked list. The reasoning trace — those pages of "thinking" — is also generated text, produced by the same mechanism. It can contain the same confident wrong turns; they're just longer and better formatted now. A fluent chain of thought is not a verified chain of thought.

Second, the additions that actually change the game — retrieval, tools, checking steps — change it precisely by adding the missing piece this chapter identifies: something other than prose that verifies the prose. That's the next chapter's subject, not this one's. The tools don't make the guesser honest. They give the guesser something to check against, when someone builds the loop that way. When nobody builds it, you get my Novartis evening.

And the other skeptic's question — if it's just autocomplete, why can it write working code, pass exams, do real work? Because autocomplete at the scale of trillions of words stops being a joke. The patterns it absorbed include whole programs, whole arguments, whole procedures. Recomposition at that scale looks like understanding from the outside. The metaphor breaks, but the failure mode doesn't: show it the part it doesn't know, and it will confidently complete that part too. Scale made the machine useful. It didn't make it truthful. Those were never the same project.

## The rule

**Use the smallest complete explanation that lets the reader make a better decision.**

When a report sounds certain, ask what it checked. If the answer is nothing, that's your whole diagnosis — and you didn't need the other four sections to act on it. The rest is there so the diagnosis sticks.

## The test

For one week, keep a tally. Every time your agent reports something done — an application filed, a bill paid, a form submitted, a fact found — check the underlying system yourself before you act on it. Open the board, the form, the receipt, the source. Mark each claim "survived" or "didn't."

Your hallucination budget is the "didn't" column. If it's empty after a week, you have a verified pipeline — congratulations, you built the checking step. If it isn't empty, you just measured the exact size of the problem this chapter describes, in your own lab, with your own numbers. Either way you now know something no explainer could give you: how much to trust the machine you actually run.

## Back to the report

The Novartis application sat at Step 1 of 8 while the report said "continuing." It stayed there until I handled the dropdown question myself, in my own browser, with my own eyes on the actual form. The application eventually moved. The report didn't move it. I did.

Here's the smallest complete explanation that let me make a better decision that week, and it's the one I still use: a claim about the world needs a window, not a sentence. Open the board yourself. The machine writes the next word beautifully. What it can't do — what it was never built to do — is tell you whether the word is true. That's your job. It always was.

## Notes

- Adam Tauman Kalai, Ofir Nachum, Santosh S. Vempala, and Edwin Zhang, "Why Language Models Hallucinate," arXiv:2509.04664, September 4, 2025. The paper's argument, in its own abstract: training and evaluation procedures reward guessing over acknowledging uncertainty, so hallucinations arise through natural statistical pressures. https://arxiv.org/abs/2509.04664 (checked 2026-09-25)
- Ashish Vaswani et al., "Attention Is All You Need," arXiv:1706.03762, June 12, 2017. Introduced the Transformer architecture built on attention mechanisms. https://arxiv.org/abs/1706.03762 (checked 2026-09-25)
- First-party tokenizer measurement, run during drafting on 2026-09-25 with the open-source tiktoken library (the public byte-pair encoding used by OpenAI's GPT models): 230 words of plain English prose tokenized to 272 tokens (about 0.85 words per token, roughly 4.8 characters per token); "tokenization" split into "token" + "ization"; "The quick brown fox jumps over the lazy dog." split into 10 tokens.
- The "which month is spelled with an X" video: a widely shared April 2026 clip of an AI assistant confidently answering "December" before correcting to October — a public, low-stakes specimen of the confident wrong answer. https://www.instagram.com/reel/DXDBEg8AZqo/ (checked 2026-09-25)
- The "ChatGPT said it saw a photo that was never uploaded" meme: a viral template built around chatbots confidently describing images that don't exist. https://www.instagram.com/reel/DSdEBEHDUia/ (checked 2026-09-25)
- The "about three-quarters of a word per token" figure is the industry's standard rule of thumb for English, published in OpenAI's tokenizer guidance and repeated across 2026 explainers; my own measurement above lands in the same neighborhood. Treated here as an approximation, not a constant.
- Mechanism descriptions (tokens, embeddings, attention, autoregressive generation, temperature) were cross-checked against practitioner references, including the "How LLMs Work" chapter of an open AI-engineering handbook (https://github.com/bschouha19/ai-engineering-handbook/blob/HEAD/chapters/chapter-02-how-llms-work.md) and an open course module on why LLMs hallucinate (https://github.com/baluragala/ethical_and_responsible_gen_ai/blob/HEAD/course_content/02_module2_why_llms_hallucinate.md). No load-bearing numbers were taken from these.

## Evidence ledger

- Claim: a language model's training objective is next-token prediction; generation is predict-append-repeat (autoregressive). Source: standard technical description, consistent with Vaswani et al. 2017 (architecture) and Kalai et al. 2025 (training/evaluation analysis). Last checked: 2026-09-25.
- Claim: 230 words of English prose tokenized to 272 tokens. Source: first-party measurement with tiktoken, run 2026-09-25. Reproducible with the open-source library.
- Claim: roughly three-quarters of a word per token in English. Source: industry rule of thumb (OpenAI tokenizer guidance, widely republished); consistent with the first-party measurement above. Labeled as an approximation. Last checked: 2026-09-25.
- Claim: training and evaluation reward guessing over admitting uncertainty; benchmarks grade the final answer so guessing scores better than "I don't know." Source: Kalai et al., "Why Language Models Hallucinate," arXiv:2509.04664, September 4, 2025 (abstract). Last checked: 2026-09-25.
- Claim: attention/Transformer introduced in 2017. Source: Vaswani et al., arXiv:1706.03762, June 12, 2017 (abstract). Last checked: 2026-09-25.
- Claim: the Novartis application report said "continuing" while the application sat at Step 1 of 8, unsubmitted, awaiting the author's answer on the referral-source question. Source: the author's own lab log, 2026-09-20 and the correction logged 2026-09-21. Lived scene; no external artifact. No invented numbers, dates, prices, or product behavior.
- Claim: the December/X and photo-never-uploaded examples. Source: public social posts linked in Notes; presented as observed public examples, not as data. Last checked: 2026-09-25.
- Claim: standing lab rules (never guess a salary answer, never invent authorization status, no filing without the artifact). Source: the author's documented operating rules for the job-search agent operation. No external verification needed; stated as the author's own practice.
