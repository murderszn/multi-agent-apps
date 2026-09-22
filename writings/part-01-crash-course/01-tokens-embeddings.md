# Tokens, Embeddings, and Meaning as Numbers

> **Status:** Draft
> **Part:** part-01-crash-course
> **Issue:** https://github.com/murderszn/multi-agent-apps/issues/1
> **Word count:** ~2,300

## Editorial hook

Models do not read words the way people do; they operate on pieces and relationships represented numerically.

## Chapter promise

By the end of this chapter you will understand what an AI actually "sees" when you type a sentence. Not words. Not letters. Chunks and coordinates. That one fact explains its weirdest mistakes, its bills, and the limits of its memory. You will be able to look at a prompt and roughly know what it costs, and you will know the trick that stops the model from fumbling the small stuff.

## Opening scene

I asked the smartest machine ever built how many times the letter R appears in the word "strawberry."

It said two.

I asked again, slower, like you would with a child. It said two again, confidently, and then spelled the word out — s-t-r-a-w-b-e-r-r-y — with three R's sitting right there in its own spelling, and still said two.

This wasn't some obscure model. Millions of people ran into the same wall and posted the screenshots. The machine that can explain quantum computing to a ten-year-old could not count to three inside a word it had just spelled for you.

That should bother you. It bothered me enough to find out why. And the answer turned out to be the foundation of everything these systems do: the model never saw the letters at all.

## Core argument

Here is the whole chapter in four sentences:

1. Before a model "reads" your text, a separate step chops it into chunks called **tokens**.
2. Tokens are a compromise — not whole words, not single letters, but statistically common pieces, learned from how often character sequences appear together.
3. Each token is converted into a number (an ID), and then into a long list of numbers (an **embedding**) that places it at a coordinate in a giant space of meaning.
4. Everything downstream — the model's strange blind spots, what you pay, and how much it can remember at once — follows directly from those three steps.

If you only take one mental image from this chapter, take this: you write in words, but the model reads in chunks and thinks in coordinates. Every surprise in this book traces back to that gap.

## Concepts and terms

**Tokens.** A token is a chunk of text the model processes as one unit. Sometimes it's a whole common word ("cat"). Sometimes it's a fragment ("ization"). Sometimes it's a single punctuation mark or a couple of digits. On average in English, a token is about three-quarters of a word — roughly four characters.

**The tokenizer.** The program that does the chopping. Every model has one, and it runs before anything else happens. OpenAI uses one called tiktoken. Meta's Llama models use a variant of something called SentencePiece. They differ in the details, but they all do the same job: turn your text into a sequence of chunk IDs.

**How the chopping is decided: BPE.** The dominant method is called byte-pair encoding, and it's beautifully dumb. It starts by treating every character as its own token, then scans a huge pile of text, finds the most common adjacent pair ("t" and "h", say), and merges it into a new token ("th"). Then it repeats — tens of thousands of times — until it has a vocabulary of, say, 100,000 chunks. Common words survive as single tokens. Rare words get shattered into familiar pieces. The word "tokenization" itself becomes "token" plus "ization," because "token" is common and "ization" is a common ending, but the full word never showed up often enough to earn its own chunk.

This is why "running," "runner," and "runs" all share the piece "run" — the model can feel their relationship. And it's why the system never truly chokes on a word it has never seen: at the byte level, anything can be broken down into pieces it knows. There is no "I don't know that word." There is only smaller pieces.

**Token IDs.** Each chunk in the vocabulary gets an arbitrary number. "Token" might be 5964. That number means nothing — it's just a name tag. Which is why the next step exists.

**Embeddings: meaning as numbers.** Every token ID gets mapped to a long list of numbers — hundreds or thousands of them. That list is a coordinate. It places the token at a specific point in an enormous multi-dimensional space, and the position is learned, not assigned: during training, the model watches which words keep company with which other words, billions and billions of times, and nudges each word's coordinates until words that appear in similar contexts sit near each other.

The linguist's version of this is a fifty-year-old saying: *you shall know a word by the company it keeps.* The model's version is arithmetic. "Cat" sits near "dog" and far from "carburetor." And the famous party trick: take the coordinates for "king," subtract "man," add "woman," and you land near "queen." Nobody programmed that. It fell out of the geometry.

So the full pipeline, every single time you hit send, is: your text gets chopped into tokens, tokens become IDs, IDs become coordinates in meaning-space — and *then* the model starts thinking. Everything it does downstream operates on those coordinates, not on your words.

## Working example

You can watch this happen tonight, no code required.

OpenAI publishes a free tokenizer tool — paste any text into it and it shows you exactly how the text gets sliced, each chunk highlighted in a different color, with a running token count. Paste the last email you sent. Then paste your typical AI prompt.

Two things will jump out. First, the chopping is weirder than you'd guess. "Hello world" is three tokens, not two — the space before "world" glues itself to the word. Contractions split at the apostrophe. Numbers shatter: "$1,234.56" becomes something like nine tokens, because digits get split in ways that have nothing to do with their value. Punctuation almost always costs you a token apiece.

Second, the count is what you pay. Every commercial model bills by the token — what you send (input) and what it writes back (output), at different rates. Output almost always costs more, because generating text takes more computation than reading it. One 2026 industry white paper listed Claude 4 Sonnet at $3 per million input tokens and $15 per million output tokens; a measured test of GPT-5.6 Sol came in around $5 per million input. A million tokens sounds enormous until you learn it's roughly 750,000 words — five to seven average novels. A busy support chatbot can burn through that without trying.

For the technically curious, the same experiment in five lines of Python with OpenAI's tiktoken library:

```python
import tiktoken
enc = tiktoken.get_encoding("cl100k_base")  # the GPT-4 tokenizer
text = "How many R's are in strawberry?"
tokens = enc.encode(text)
print(len(tokens), "tokens:", [enc.decode([t]) for t in tokens])
```

Run it and you'll see the strawberry get sliced into pieces that contain no letter R anywhere. Which brings us to the failure.

## What can go wrong

- **Failure mode:** The model confidently botches anything that requires seeing the actual characters — counting letters in a word, comparing numbers like 9.11 and 9.9 (multiple models insisted 9.11 was bigger, because the digits arrived as the chunks "9", ".", "11" rather than as a decimal value), or repeating rare "glitch tokens." The most famous glitch token was "SolidGoldMagikarp" — a Reddit username that had earned a spot in one model's vocabulary during BPE training but was barely present in the model's actual training data. Ask the model to repeat it and you'd get bizarre, sometimes hostile non-sequiturs, as if you'd said a magic word. Researchers spent years cataloguing these blind spots.
- **Why it happens:** The model never sees characters. It sees chunk IDs and meaning-coordinates. "Straw" plus "berry" carries no information about how many R's are inside. Asking it to count letters is like asking someone to count the bricks in a house while only showing them the architect's floor plan.
- **How to detect it:** Give the model a character-level task — count the letters in a word, spell something backwards, compare two decimals — and watch. The tell isn't that it gets it wrong; it's that it gets it wrong *confidently*, with full explanatory poise.
- **How the human responds:** Don't fight the tokenizer; route around it. Ask the model to write the word out letter by letter *first*, then count — once the letters are separate tokens in its context, it can count them fine. For numbers, ask it to line the digits up explicitly. And take the general lesson: when the model is weirdly, confidently wrong about something trivially checkable, assume it's a vision problem, not a thinking problem — then give it the right glasses.

## Why this matters in 2026

**Money.** You are billed in tokens, not words, and the meter runs in both directions. This stopped being theoretical: in July 2025 the coding tool Cursor quietly moved from flat request pricing to token-based billing, and some users' effective bills spiked 20x once heavy agentic use kicked in — refunds followed. In June 2026 GitHub Copilot made the same move, with some developers projecting 10x–50x increases for agent-heavy workflows; the announcement thread collected 958 downvotes against 24 upvotes. The practical rule: shorter, tighter prompts are literally cheaper, and rambling "just to be safe" context has a price tag. Rough math you can do in your head: about four characters per token in English, about 750 words per thousand tokens.

**Memory.** A model's context window — how much conversation it can "remember" — is measured entirely in tokens. And it refills from scratch, and re-bills, with every single message. The model doesn't remember your long chat; it re-reads the whole thing each time you hit send. That's why marathon conversations get dumber and pricier the longer they run, and why the fix is the same one you'd use with a forgetful colleague: summarize, restart fresh, keep what's important in front of it.

**Fairness.** The tokenizer was trained mostly on English, so English gets clean, efficient chunks. Other languages get shattered into smaller pieces — the same message in Hindi, Thai, or Japanese can cost substantially more tokens, which means it literally costs more money and eats more of the memory window. The meter isn't neutral. If you're building for non-English users, or you're one, this isn't trivia — it's a tax you should know you're paying.

**Everyday errors, decoded.** Once you know about chunks, a whole class of AI weirdness stops being mysterious: the letter-counting failures, the number comparisons, the occasional garbled repeat of an unusual word, the way rephrasing a prompt slightly changes the answer (different phrasing, different chunks, different coordinates). You're not dealing with a mind that misread. You're dealing with a mind that never saw the text at all — only its shadow in chunk-space.

## Counterargument / skeptical reader

*"This is trivia. I drive a car without knowing how fuel injection works, and I use AI without knowing what a token is."*

Fair — and you don't need the math. But the driver who can't read the gas gauge still runs out of fuel on the highway. You don't need BPE; you need three instincts this chapter gives you: the bill is per chunk, not per word; the model is blind to individual characters; and its memory is a window measured in those same chunks. That's the whole fuel gauge. Everything else is engine internals.

The deeper objection is sharper: *"So it's just fancy autocomplete on chunks? Then it doesn't understand anything."* That's chapter 3's fight, not this one's — but here's the short version. Predicting the next chunk using meaning-coordinates is precisely what lets these systems do math, write code, and follow multi-step reasoning. The coordinates are the difference between parroting and something stranger: a system that navigates meaning geometrically. Does it "understand" the way you do? No. It understands the way a GPS understands a city — perfectly useful, completely alien, and occasionally confident about a road that doesn't exist. Knowing which kind of understanding you're dealing with is the beginning of using it well.

## Evidence to collect

- BPE algorithm explainer (2026): https://github.com/mekkcyber/llm-atlas/blob/HEAD/fundamentals/bpe.md
- tiktoken, vocabulary construction, and token economics: https://letsbuildsolutions.com/blog/ai-ml/how-llm-tokenizers-work-bpe-vocabulary-construction-and-token-economics-for-production-ai/
- "Your AI Bill Is Wrong" — token counting vs word counting, with worked examples: https://medium.com/@shreyabhingarkar03/your-ai-bill-is-wrong-heres-why-token-counting-breaks-math-051b862bb00a
- Tokenization weirdness in 2026 — strawberry problem, glitch tokens, Cursor/Copilot billing blowups: https://github.com/rohankhullar24-oss/product-with-rohan/blob/HEAD/src/content/blog/tokenization-in-ai-2026.md
- Measured: a million tokens is fewer words than you think (GPT-5.6 Sol pricing, cache effects): https://www.notebookcheck.net/A-million-tokens-is-fewer-words-than-you-think-We-measured-it.1352830.0.html
- "Tokens, Not Words" — everyday consequences (pricing, languages, forgetting): https://medium.com/@Abhijit-Kangale/tokens-not-words-why-ai-thinks-in-weird-little-chunks-55686b76a17f
- The Token Tax (white paper) — per-model pricing, Meta's 73.7T monthly token burn: https://cdn.prod.website-files.com/66faf094459c16fad4ecb09a/6a3052f9b57716cece20a8b3_The-Token-Tax-Iterate.pdf
- Claim requiring verification before print: exact per-model token prices shift monthly — recheck all dollar figures against current published pricing.

## Closing image

Back to the strawberry. Three R's, sitting right there, invisible to the smartest machine ever built — because it never looks at letters. It looks at chunks, and it thinks in coordinates.

Here's the thing I keep coming back to: once I learned that, the machine stopped feeling mysterious and started feeling *legible*. I could predict where it would trip. I could see the bill coming before it arrived. I could tell the difference between "it doesn't know" and "it can't see."

That's the whole book, really, in miniature. Learn where the eyes are, and you stop being surprised by what it trips over. The strawberry wasn't a glitch in the intelligence. It was a window into how the intelligence works — and windows, unlike walls, are something you can use.

## QA checklist

- [ ] Plain-language explanation
- [ ] Working example included
- [ ] Failure mode included
- [ ] “Why this matters in 2026” included
- [ ] Claims separated from measurements
- [ ] Sources/evidence captured
- [ ] Human responsibility and limits are clear
- [ ] Copy edited for clarity and rhythm
- [ ] Technical review completed
