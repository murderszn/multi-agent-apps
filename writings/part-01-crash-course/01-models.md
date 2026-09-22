# Models Represent and Predict

*The machine doesn't read your words. It chops them into numbers, guesses the next one, and sometimes guesses wrong with total confidence. Here is the whole trick, in plain English.*

I asked the smartest machine ever built how many times the letter R appears in the word "strawberry."

It said two.

I asked again, slower, the way you would with a child. It said two again — confidently — and then spelled the word out, s-t-r-a-w-b-e-r-r-y, with three R's sitting right there inside its own spelling, and still said two.

This wasn't some obscure model, and it wasn't a trick of phrasing. Millions of people hit the same wall and posted the screenshots. The machine that can explain quantum computing to a ten-year-old could not count to three inside a word it had just spelled for you.

Two years later the meme is still alive. In January 2026, a guy on Instagram filmed himself holding up a handwritten sign misspelled "Strawbery" and argued with his AI about it on camera — 78,000 likes, 1,600 comments, most of them people sharing their own versions of the same argument. A month later a couple posted themselves asking an AI the same question on the couch; it answered "exactly one R," then "two," then spelled the word "STRAWBRRY" and arrived at three by a route nobody could follow. Testing in December 2025 found that even the newest flagship model answered "two" without hesitation.

That should bother you. It bothered me enough to find out why. And the answer turned out to be the foundation of everything these systems do: the model never saw the letters at all.

This chapter is the whole machine, end to end, in plain language. Tokens, embeddings, attention, prediction, temperature, hallucination — six ideas, one story. By the end you'll know exactly what the machine is doing when it "thinks," exactly where the metaphor breaks, and exactly what to do about it.

## The chopping

Before a model reads your text, something else reads it first. A separate program called a tokenizer takes everything you typed and slices it into chunks called tokens. This happens every time, before anything you would call thinking begins.

A token is a chunk of text the model processes as one unit. Sometimes it's a whole common word, like "cat." Sometimes it's a fragment, like "ization." Sometimes it's a single punctuation mark or a couple of digits. In English, a token averages about three-quarters of a word (OpenAI's own documentation puts it at roughly four characters per token). But the chopping is strange and arbitrary. It comes from a compression scheme called byte pair encoding, which learned its chunks by scanning enormous piles of internet text and promoting the most frequent letter clusters into single units. "Strawberry" gets split into pieces (some tokenizers cut it as "straw" and "berry," others as three pieces) based purely on how often those clusters appeared in training data, not on spelling, syllables, or sense.

The model never sees your words. It sees the token IDs: long lists of numbers standing in for the chunks. That is the entire input. Ten letters went in; a few numbered chunks came out the other side.

This is why the machine can't count the R's. Asking it how many R's are in "strawberry" is like asking you how many times the letter R appears inside a single emoji. You'd have to mentally unpack the symbol first. The model has no built-in way to unpack a token. It sees chunks that contain R's the way a sealed envelope contains a letter. It knows something's in there, but it can't open it.

Numbers get the same treatment, which is why the machine is also bad at arithmetic. Depending on the tokenizer, "1234" might become one token, or "12" and "34," or "1" and "234," decided by frequency in training data, not by place value. So "12345" and "12346" can have completely different internal representations even though they're nearly the same number. The ones, tens, and hundreds columns — the entire structure that arithmetic depends on — get scrambled before the model thinks a single thought.

And it quietly costs money. Most AI services charge by the token, so longer prompts and longer answers cost more. And because tokenizers were trained mostly on English, other languages get chopped into far more pieces. The same sentence can cost several times more tokens in Japanese or Korean than in English, which means worse performance for more money. That's not a conspiracy. It's just what a compression scheme trained on the English internet does. But it's worth knowing the machine has a home-field advantage for English, because the bills and the quality gap both land on everyone else.

## Meaning as coordinates

Once your text is chopped into tokens, each token gets converted into a long list of numbers — its embedding. You can think of it as coordinates: every token gets a position in a vast map of meaning, where words that show up in similar contexts sit near each other.

The famous demo, from the early word2vec work in 2013, still captures the idea: take the coordinates for "king," subtract "man," add "woman," and you land near the coordinates for "queen." Nobody programmed that in. The geometry fell out of the statistics — words that behave alike in text end up near each other in the map.

This is worth pausing on, because it's genuinely remarkable and genuinely limited at the same time. The map captures *relationships* between words with uncanny accuracy. It captures nothing about the world those words point to. The coordinates for "apple" sit near "pear" because they appear in similar sentences, not because the machine has ever seen, held, or tasted either one. Everything the model knows about apples arrived secondhand, through text. Keep that in your pocket. It explains most of what goes wrong later.

## Which words get a vote

Now the tokens-with-coordinates flow into the transformer — the architecture, published in 2017, that sits underneath essentially every capable model today. The transformer's signature trick is called attention, and in plain language it answers one question: for each token, which other tokens in the passage deserve a vote on what it means?

The textbook example: "The animal didn't cross the street because it was too tired." To process the word "it," the model has to decide whether "it" means the animal or the street. Attention lets "it" reach back and pull meaning from "animal." The words that matter get a bigger vote; the words that don't get ignored. Multiply that by billions of parameters and trillions of tokens of training text and you get a machine that tracks references, tone, and argument structure across pages of text.

But notice what attention is not. It is not understanding. It is a weighting scheme: a very sophisticated way of deciding which parts of the input should influence the next guess. The machine is still, at every step, doing one thing.

## A prediction engine, not a calculator

That one thing is this: given everything written so far, the model produces a probability distribution over what token should come next, picks one, appends it to the text, and repeats. Engineers call this autoregressive generation. The long, fluent answers you see are the accumulated result of hundreds or thousands of independent guesses, each one conditioned on all the guesses before it.

There is no calculator inside. There is no internal tally being kept. When the model writes "2 + 2 = 4," it's not because it added anything. It's because the sequence "2 + 2 = 4" appeared so often in its training data that "4" became the overwhelmingly likely next token. It works beautifully for small, common arithmetic and falls apart the moment you ask it to multiply two numbers it has never seen together. Then there's no memorized shortcut and no mechanism to actually do the math, so the model produces something that *looks* like the right answer (right number of digits, plausible last digit) with the middle quietly wrong.

The same failure shows up everywhere counting is involved: counting items in a long list, words in a paragraph, bullet points in its own response. Ask it to write exactly 100 words and you'll usually get somewhere between 80 and 130. Ask for exactly 17 ideas and you might get a list numbered to 17 that actually contains 15. In each case the model isn't counting. It's pattern-matching against what a count-shaped answer usually looks like.

## The temperature dial

If every step is a guess, the obvious question is: how does the machine choose among the candidate next tokens? That's the temperature dial.

At each step the model scores every possible next token. Temperature controls how those scores get turned into a choice. Turn it to zero and the model always picks the top-scoring token: deterministic, robotic, repeatable. Turn it up and lower-scoring tokens get a real chance, so the output gets varied, surprising, creative. Turn it up too far and it starts picking tokens that barely belong, and the answer wanders off into confident nonsense.

Here's the part most explanations get wrong: temperature is not a creativity dial. It's a *risk* dial. Research on sampling found that cranking the temperature up is only weakly correlated with novelty and not correlated at all with coherence — higher temperature mostly just increases variance, which can look like creativity but is equally likely to be fabrication. The model doesn't get smarter or dumber. It just gets more or less willing to gamble on unlikely words.

And the gamble is the entire reason hallucinations exist. High temperature and hallucination are two sides of the same coin: the same mechanism that lets the model surprise you with a fresh metaphor is the mechanism that lets it invent a fact with total confidence. Developers keep the dial low for factual Q&A and code, higher for brainstorming and fiction. When your assistant starts making things up, the first suspect is that it's running hot.

## Try it yourself

Here's the working example, and you can run it on any chatbot in about thirty seconds.

First, ask: "How many times does the letter R appear in the word strawberry?" Watch it answer confidently (probably "two.")

Now ask: "Spell the word strawberry out, one letter per line. Then count how many of those lines are the letter R."

It will get it right. Three.

Why does the second prompt work? Because spelling the word out forces the model to generate single-character tokens — one letter at a time. Each letter becomes its own chunk, and chunks the model *can* see individually are chunks it can count. You didn't make the model smarter. You changed the shape of its input so the counting happened at a level the machinery can actually handle.

This is the whole chapter in miniature. The failure wasn't stupidity; it was architecture: the model can't open its own tokens. The fix wasn't a better model; it was a better-shaped task. Every reliable use of these systems follows the same pattern: figure out what the machinery can actually see, and hand it the problem in that shape.

## When it makes things up

Hallucination is the industry's polite word for the machine stating falsehoods with complete confidence. It happens for the reason this chapter has been building toward: the model must always produce an answer, even when uncertain, and its only move is to guess the most plausible next tokens. A guess shaped like a fact is still a guess.

The failure mode comes in flavors. Invented citations are the classic: ask for sources and the model will fabricate paper titles, authors, and links that look exactly right and resolve to nothing. A lawyer in 2023 was sanctioned after submitting a brief full of case citations his chatbot had invented (real-looking, perfectly formatted, entirely fictional). Vague prompts make it worse: ask "fix this bug" without showing the code and the model fills the gaps with whatever sounds most plausible. Once a wrong token gets picked early, everything after it is conditioned on the wrongness, and the hallucination snowballs, each confident sentence making the next one more likely.

Here's how you catch it. First, know the tells: extreme specificity with no way to verify, citations you can't click through to, numbers that are suspiciously round, and answers that get more confident the further they drift. Second, verify anything with consequences against a primary source: click the link, check the number, read the actual paper. Third, ask the model to show its work: "quote the passage you're basing that on" or "walk through your reasoning step by step." A model that can ground its answer in something real usually can; a model that's improvising will often contradict itself or retreat into vagueness when you pin it down.

And here's how you respond. For anything factual that matters (medical, legal, financial, or anything with your name on it), treat the model's output as a draft, never a source. For math, let the machine reach for a real calculator: modern assistants can write and run a few lines of code to compute an answer instead of guessing at it, and you should prefer that path whenever it's offered. For creative work, let it run hot and enjoy the ride — that's what the dial is for. The human's job is matching the temperature to the stakes.

## Why this matters in 2026

Three things make this chapter urgent instead of merely interesting.

First, the failure is still unsolved. After billions in investment and multiple model generations, the December 2025 tests showed the newest flagship still answering "two" to the strawberry question without hesitation. The patches help: digit-by-digit tokenization fixes arithmetic, tool use lets the model hand math to real code, and chain-of-thought reasoning models spend more compute deliberating before answering. But each patch covers one hole. The underlying machine is still a prediction engine wearing a calculator's clothes. Anyone selling you "hallucination-free AI" is selling you something the architecture doesn't currently provide.

Second, the stakes went up because the outputs grew teeth. These systems don't just chat anymore — they act. They file forms, book travel, write and deploy code, and submit job applications. I know this one personally: agents handle large parts of my job search, filling out applications in my name. Every one of those applications is my reputation attached to a machine's guesses. A hallucinated job title or an invented employment date on my application isn't a funny screenshot. It's my name on a lie I didn't tell. When the guesser starts signing your name, the boundary between "pattern it can handle" and "pattern it can't" becomes the most important line in your working life.

Third, the economics are real and uneven. You pay per token, so every rambling answer costs more than a tight one (a small thing per question, a real thing at the scale of a business running thousands of queries). And the token tax on non-English languages means the people who can least afford the premium pay it. The machine's inner workings aren't just trivia for engineers; they're the fine print on a product the world now runs on.

## The skeptic in the room

At this point the technically informed reader is entitled to an objection, and it's a good one: *if the machine can't count the letter R, why should I trust it with anything?*

Fair question. Here's the honest answer: you shouldn't trust the parts it can't do. The machine is the best pattern-matcher ever built for human language, and it is not a calculator, not a database, and not a witness. It knows language the way a brilliant mimic knows accents: flawless on the surface, nothing lived behind it. The correct response to the strawberry problem isn't to dismiss the machine; it's to learn the exact shape of the boundary and operate on the right side of it. This chapter is that map. Everything the machine does well — drafting, summarizing, translating, brainstorming, explaining — lives on one side. Everything it fakes — counting, citing, measuring, remembering — lives on the other. The people getting burned are the ones who never learned there was a line.

The second objection comes from the other direction: *isn't "temperature" just a fancy word for randomness, and isn't all of this just statistics with good marketing?* On the statistics part: yes, at bottom. There is no little person inside doing comprehension. But "just statistics" undersells what statistics at this scale can do: the embeddings map, the attention mechanism, the fluent reasoning are real capabilities with real uses, even if the mechanism is guessing rather than knowing. The practical question was never whether the machine understands. It's whether you understand the machine well enough to put it to work without getting fooled. That's an operator's question, not a philosopher's, and it's the question this book answers.

## The rule

So the next time the machine confidently tells you there are two R's in strawberry, you'll know what happened: it counted its own chunks instead of the letters, because chunks are all it can see. The failure is a window straight into the machinery: tokens in, embeddings as coordinates, attention deciding what matters, one probable token at a time, with the temperature dial deciding how far it's allowed to wander from the safest guess.

The operator's rule for this chapter: **use the smallest complete explanation that lets you make a better decision.** You don't need the math of backpropagation. You need six ideas: the machine chops text into tokens it can't open, maps them to coordinates of meaning, weighs which ones matter, guesses the next token, gambles more or less depending on temperature, and will always guess rather than admit it can't. That's enough to predict every failure in this chapter before it happens.

And the test, so you know the rule is working: run the strawberry experiment yourself. Ask any model to count the R's, watch it fail, then ask it to spell the word one letter per line and count again. If the count goes from wrong to right, you understand the machine, not as a metaphor but as a mechanism. The day you can predict its failures is the day you can trust its successes. That's the whole game, and it starts with a berry.

## Notes

Claim and evidence ledger for this chapter. Checked 2026-09-22 unless noted.

- **Claim:** Even the newest flagship models answered "two" to the strawberry R question in December 2025 testing.
  - Sources: https://techbriefly.com/2025/12/15/chatgpt-gpt-5-2-miscounts-rs-in-strawberry/ ; https://dataconomy.com/2025/12/15/gpt-5-2-still-counts-two-rs-in-strawberry/ ; https://www.makeuseof.com/chatgpt-still-cant-answer-this-simple-question/
- **Claim:** Tokenizers split text with byte pair encoding; "strawberry" becomes a few chunks (e.g. "straw"/"berry") based on training frequency, not spelling; the model never sees individual letters.
  - Sources: https://medium.com/@shreeramgs666/why-ai-cant-count-to-100-eb82263bc784 (Apr 2026) ; https://github.com/hieptran1812/my-website/blob/HEAD/content/blog/machine-learning/large-language-model/bpe-tokenizer.md
- **Claim:** Non-English text costs substantially more tokens than English (token tax / algorithmic bias in tokenizers).
  - Source: https://github.com/KunjShah95/TOKENIZER-FROM-SCRATCH
- **Claim:** LLMs are autoregressive next-token predictors; "2 + 2 = 4" is a memorized likely sequence, not computed; models fail on unseen arithmetic and invent count-shaped answers.
  - Source: https://medium.com/@shreeramgs666/why-ai-cant-count-to-100-eb82263bc784
- **Claim:** Temperature controls sampling risk, not intelligence; high temperature raises hallucination risk; temperature is weakly correlated with novelty and uncorrelated with coherence (Peeperkorn study, via sampling survey).
  - Sources: https://medium.com/@ashoksubbiahkumar/understanding-llm-temperature-how-it-shapes-answers-creativity-and-hallucinations-557952b18213 ; https://medium.com/@wasowski.jarek/temperature-0-0-generates-48x-more-repetition-loops-than-1-0-sampling-strategies-f0b8d7a3c850 ; https://github.com/haozhe-xing/agent_learning/blob/HEAD/src/en/chapter_llm/01_how_llm_works.md
- **Claim:** Hallucinations snowball once an early wrong token is sampled; models always generate an answer even when uncertain; mitigations include clear prompts, lower temperature, examples, and tool use.
  - Sources: https://towardsai.net/p/machine-learning/why-does-your-llm-application-hallucinate ; https://medium.com/@davidmgbede75/modern-large-language-models-llms-like-gpt-claude-gemini-and-llama-have-become-essential-841c41bedf07
- **Claim:** Asking the model to list each character separately before counting restores accurate counting.
  - Source: https://www.youtube.com/watch?v=_z7_CZtGC20
- **Claim:** The strawberry-counting meme remained viral into early 2026 (Instagram reels, Jan–Feb 2026) as cultural shorthand for AI fallibility.
  - Sources: https://www.instagram.com/reel/DUHAaZSAVxX/ ; https://www.instagram.com/reel/DUQzH91DZFu/
- **Claim:** A lawyer was sanctioned in 2023 after submitting a brief with ChatGPT-invented case citations.
  - Source: widely reported, June 2023 (Mata v. Avianca). Flagged: verify citation details against a primary news source before print.
- **Claim:** The transformer architecture dates to 2017; the word2vec "king − man + woman ≈ queen" demo dates to 2013 (Mikolov et al.).
  - Source: standard results in the field; no single link cited — verify before print.
- **Joshua's context used:** his agents file job applications in his name (memory: job-search apply cycles, Sept 2026); he shipped LLM-derived alerts to pharma client reps at Beghou Consulting (his dictated 2026-09-19 application answer). No invented anecdotes.
