# Tokens, Embeddings, and Meaning as Numbers

*Models do not read words the way people do. They operate on pieces and relationships, represented numerically.*

I asked the smartest machine ever built how many times the letter R appears in the word "strawberry."

It said two.

I asked again, slower, the way you would with a child. It said two again — confidently — and then spelled the word out, s-t-r-a-w-b-e-r-r-y, with three R's sitting right there inside its own spelling, and still said two.

This wasn't some obscure model. Millions of people hit the same wall and posted the screenshots. The machine that can explain quantum computing to a ten-year-old could not count to three inside a word it had just spelled for you.

That should bother you. It bothered me enough to find out why. And the answer turned out to be the foundation of everything these systems do: the model never saw the letters at all.

## The chopping

Before a model reads your text, something else reads it first. A separate program called a tokenizer takes everything you typed and slices it into chunks called tokens. This happens every time, before anything you would call thinking begins.

A token is a chunk of text the model processes as one unit. Sometimes it's a whole common word, like "cat." Sometimes it's a fragment, like "ization." Sometimes it's a single punctuation mark or a couple of digits. In English, a token averages about three-quarters of a word — roughly four characters. But the chopping is stranger than that sounds, and the strangeness matters.

The slicing is decided by an algorithm with the unglamorous name of byte-pair encoding. It is beautifully dumb. It starts by treating every character as its own token, then scans an enormous pile of text, finds the most common adjacent pair — "t" and "h," say — and merges it into a new token, "th." Then it repeats. Tens of thousands of times. Until it has a vocabulary of maybe a hundred thousand chunks.

Common words survive as single tokens. Rare words get shattered into familiar pieces. The word "tokenization" itself becomes "token" plus "ization" — because "token" is common and "ization" is a common ending, but the full word never showed up often enough to earn its own chunk. This is why "running," "runner," and "runs" all share the piece "run": the model can feel their relationship through the shared fragment.

Modern tokenizers work at the byte level, which means there is no such thing as an unknown word. Anything — any language, any emoji, any typo — can be broken down into pieces the system knows. There is no "I don't know that word." There is only smaller pieces.

Each chunk in the vocabulary gets assigned an arbitrary number, a token ID. "Token" might be 5964. That number means nothing. It is just a name tag. Which is why the next step exists.

## Meaning as numbers

Every token ID gets mapped to a long list of numbers — hundreds or thousands of them. That list is a coordinate. It places the token at a specific point in an enormous multi-dimensional space, and the position is learned, not assigned.

During training, the model watches which words keep company with which other words, billions and billions of times, and nudges each word's coordinates until words that appear in similar contexts sit near each other. There is a fifty-year-old saying in linguistics that captures it exactly: *you shall know a word by the company it keeps.* The model's version is arithmetic. "Cat" sits near "dog" and far from "carburetor."

And then there is the famous party trick. Take the coordinates for "king," subtract "man," add "woman," and you land near "queen." Nobody programmed that. It fell out of the geometry — out of the sheer weight of how those words are used.

So here is the full pipeline, the first thing that happens every single time you hit send: your text gets chopped into tokens, the tokens become IDs, and the IDs become coordinates in a space of meaning. Only then does the model start thinking. Everything downstream operates on those coordinates, not on your words.

You write in words. The model reads in chunks and thinks in coordinates. Every surprise in this book traces back to that gap.

## Try it tonight

You can watch the chopping happen, no code required. OpenAI publishes a free tokenizer tool — paste any text into it and it shows you exactly how the text gets sliced, each chunk highlighted in a different color, with a running token count. Paste the last email you sent. Then paste your typical AI prompt.

Two things will jump out. First, the slicing is weirder than you'd guess. "Hello world" is three tokens, not two, because the space before "world" glues itself to the word. Contractions split at the apostrophe. Numbers shatter: "$1,234.56" becomes something like nine tokens, because digits get divided in ways that have nothing to do with their value. Punctuation almost always costs you a token apiece.

Second, the count is what you pay. Every commercial model bills by the token — what you send and what it writes back, at different rates. Output almost always costs more than input, because generating text takes more computation than reading it. One 2026 industry white paper listed Claude 4 Sonnet at $3 per million input tokens and $15 per million output tokens; a measured test of GPT-5.6 Sol came in around $5 per million input.

A million tokens sounds enormous until you learn it is roughly 750,000 words — five to seven average novels. A busy support chatbot burns through that without trying. And in a typical support ticket, the response is only about a tenth of the tokens but nearly forty percent of the cost, because output tokens are the expensive ones. The meter spins fastest when the machine is talking, not when it is listening.

For the technically curious, the same experiment in five lines of Python with OpenAI's tiktoken library:

```python
import tiktoken
enc = tiktoken.get_encoding("cl100k_base")  # the GPT-4 tokenizer
text = "How many R's are in strawberry?"
tokens = enc.encode(text)
print(len(tokens), "tokens:", [enc.decode([t]) for t in tokens])
```

Run it and you will see the strawberry get sliced into pieces that contain no letter R anywhere. Which is exactly the problem.

## The blind spots

Here is the failure mode, and it follows directly from the chopping: the model confidently botches anything that requires seeing the actual characters. Counting letters in a word. Comparing 9.11 and 9.9 — multiple models insisted 9.11 was bigger, because the digits arrived as the chunks "9", ".", "11" rather than as a decimal value. Repeating rare "glitch tokens": the most famous was "SolidGoldMagikarp," a Reddit username that had earned a spot in one model's vocabulary during training but barely appeared in the model's actual training data. Ask the model to repeat it and you'd get bizarre, sometimes hostile non-sequiturs, as if you'd spoken a magic word. Researchers spent years cataloguing these blind spots.

The model never sees characters. It sees chunk IDs and meaning-coordinates. "Straw" plus "berry" carries no information about how many R's are inside. Asking it to count letters is like asking someone to count the bricks in a house while only showing them the floor plan.

You can detect it yourself. Give the model a character-level task — count the letters in a word, spell something backwards, compare two decimals — and watch. The tell isn't that it gets it wrong. It's that it gets it wrong *confidently*, with full explanatory poise.

The fix is not to fight the tokenizer but to route around it. Ask the model to write the word out letter by letter *first*, then count. Once the letters are separate tokens sitting in its context, it counts them fine. For numbers, ask it to line the digits up explicitly. And take the general lesson with you: when the model is weirdly, confidently wrong about something trivially checkable, assume it is a vision problem, not a thinking problem — then give it the right glasses.

## What this costs you

This is where the chapter stops being about how the machine works and starts being about your wallet.

You are billed in tokens, not words, and the meter runs in both directions. This stopped being theoretical a while ago. In July 2025, the coding tool Cursor quietly moved from flat request pricing to token-based billing, and some users' effective bills spiked twentyfold once heavy agentic use kicked in. Refunds followed. In June 2026, GitHub Copilot made the same move, with some developers projecting ten-to-fiftyfold increases for agent-heavy workflows; the announcement thread collected 958 downvotes against 24 upvotes. The practical rule is blunt: shorter, tighter prompts are literally cheaper, and rambling "just to be safe" context has a price tag. The math you can do in your head: about four characters per token in English, about 750 words per thousand tokens.

Then there is memory. A model's context window — how much conversation it can "remember" — is measured entirely in tokens. And it refills from scratch, and re-bills, with every single message. The model does not remember your long chat; it re-reads the whole thing each time you hit send. That is why marathon conversations get dumber and pricier the longer they run. The fix is the same one you would use with a forgetful colleague: summarize, start fresh, and keep what's important in front of it.

And there is a fairness problem hiding in the meter. Tokenizers were trained mostly on English, so English gets clean, efficient chunks. Other languages get shattered into smaller pieces — the same message in Hindi, Thai, or Japanese can cost substantially more tokens, which means it literally costs more money and eats more of the memory window. If you are building for non-English users, or you are one, this is not trivia. It is a tax you should know you are paying.

Once you know about chunks, a whole class of AI weirdness stops being mysterious: the letter-counting failures, the number comparisons, the occasional garbled repeat of an unusual word, the way rephrasing a prompt slightly changes the answer. Different phrasing, different chunks, different coordinates. You are not dealing with a mind that misread. You are dealing with a mind that never saw the text at all — only its shadow in chunk-space.

## The skeptic in the room

You might be thinking this is trivia. You drive a car without knowing how fuel injection works; you can use AI without knowing what a token is.

Fair — and you don't need the math. But the driver who can't read the gas gauge still runs out of fuel on the highway. You don't need byte-pair encoding. You need three instincts this chapter gives you: the bill is per chunk, not per word; the model is blind to individual characters; and its memory is a window measured in those same chunks. That is the whole fuel gauge. Everything else is engine internals.

The sharper objection goes deeper: if it's all just chunks and coordinates, isn't this fancy autocomplete? Doesn't that mean it understands nothing?

Here is the honest answer. Predicting the next chunk using meaning-coordinates is precisely what lets these systems do math, write code, and follow multi-step reasoning. The coordinates are the difference between parroting and something stranger: a system that navigates meaning geometrically. Does it "understand" the way you do? No. It understands the way a GPS understands a city — perfectly useful, completely alien, and occasionally confident about a road that doesn't exist. Knowing which kind of understanding you're dealing with is the beginning of using it well.

## Windows, not walls

Back to the strawberry. Three R's, sitting right there, invisible to the smartest machine ever built — because it never looks at letters. It looks at chunks, and it thinks in coordinates.

Here is what I keep coming back to: once I learned that, the machine stopped feeling mysterious and started feeling *legible*. I could predict where it would trip. I could see the bill coming before it arrived. I could tell the difference between "it doesn't know" and "it can't see."

That's the whole book, in miniature. Learn where the eyes are, and you stop being surprised by what it trips over. The strawberry wasn't a glitch in the intelligence. It was a window into how the intelligence works — and windows, unlike walls, are something you can use.

## Notes

- Byte-pair encoding, the merge algorithm behind modern tokenizers: https://github.com/mekkcyber/llm-atlas/blob/HEAD/fundamentals/bpe.md
- tiktoken, vocabulary construction, and token economics: https://letsbuildsolutions.com/blog/ai-ml/how-llm-tokenizers-work-bpe-vocabulary-construction-and-token-economics-for-production-ai/
- "Your AI Bill Is Wrong" — token counting vs. word counting, with worked examples: https://medium.com/@shreyabhingarkar03/your-ai-bill-is-wrong-heres-why-token-counting-breaks-math-051b862bb00a
- Tokenization in 2026 — the strawberry problem, glitch tokens, and the Cursor/Copilot billing blowups: https://github.com/rohankhullar24-oss/product-with-rohan/blob/HEAD/src/content/blog/tokenization-in-ai-2026.md
- Measured: a million tokens is fewer words than you think (GPT-5.6 Sol pricing, cache effects): https://www.notebookcheck.net/A-million-tokens-is-fewer-words-than-you-think-We-measured-it.1352830.0.html
- "Tokens, Not Words" — everyday consequences for pricing, languages, and forgetting: https://medium.com/@Abhijit-Kangale/tokens-not-words-why-ai-thinks-in-weird-little-chunks-55686b76a17f
- The Token Tax (white paper) — per-model pricing and large-scale token consumption: https://cdn.prod.website-files.com/66faf094459c16fad4ecb09a/6a3052f9b57716cece20a8b3_The-Token-Tax-Iterate.pdf
- Dollar figures for token pricing shift monthly; recheck against current published pricing before print.
