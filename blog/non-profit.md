---
date: 2026-09-05
title: D2 is non-profit
description: D2 is becoming an independent, donation-funded open-source project fiscally sponsored by Hack Club.
slug: d2-non-profit
tags: [announcement, community]
hide_table_of_contents: false
---

Hello, I wanted to share some news about the future of D2.

The creation and development of this project was funded by a for-profit company,
Terrastruct. We made money through selling an IDE and a closed-source layout engine
for D2.

Terrastruct is winding down, and D2 has been transferred to
[Hack Club](https://hackclub.com/) to continue running as a non-profit, open-source
project. The previously paid components, the layout engine (TALA) and the IDE
(D2 Studio), will be open-sourced.

I will continue to maintain and improve D2. But my time commitment will be limited.
If you have interest in becoming a maintainer, please email me at
[alex@d2lang.com](mailto:alex@d2lang.com). High-quality maintenance and contributions
may be invited to enter into a paid contributor contract, funded by donations to
the non-profit.

If you'd like to donate to D2, please see [this page](/sponsor/) on how to do so and
what the fund is used for.

## Direction

D2 has accumulated a large backlog and roadmap, and I have some pretty cool ideas
for features. But first, a disclaimer:

I am very pro-AI usage. My contributions towards D2's development will all be made
with AI. I invite AI contributions, and will use AI to help me review your AI.

<!-- truncate -->

Up until now, D2 has been a project of no AI. Not by choice; it just wasn't good
enough until recently. Pre-good-AI days, I embedded a JavaScript runner in D2's Go
runtime to run some critical dependencies that were only available in JavaScript.
It was massive bloat, it was ugly, and slow, and there was no other way.
Post-good-AI, I just converted all of those JavaScript libraries to Go; it runs 9x
to 50x faster.

In this manner, D2 will evolve at a rate that is orders of magnitude faster than
it has. I of course know this is controversial and has
[downsides](https://neilalexander.dev/2026/06/30/flooding-contributions), and I'm not
recommending anything to anyone; I just wanted to be transparent about my plans to
the community and those who rely on D2. It's all open-source, so you may pin or
fork v0.7.1, which is untainted by AI.

End of AI disclaimer.

## What's next

Directionally, there's 2 things I'll prioritize:

1. Get rendering support from popular platforms
   1. Natively integrated onto GitHub, Notion, Linear, etc.
2. Be the most powerful harness for agents
   1. They're really good at making almost-perfect diagrams, but it's still too
      non-deterministic, uncustomizable, imprecise, etc. I think that'll last the
      foreseeable future, so you still want some text-based source to back the
      artifact. Kind of like HTML for web pages instead of drawing every pixel.

But I want to have fun with it along the way. Squeeze out every millisecond of
performance. Add an isometric renderer. Rewrite some subset to make a native
JavaScript version instead of having to pay the cost of Go WASM runtime.

## Non-goals

I want to avoid bloat. To be clear, just because AI will allow me to make a Swiss
Army knife of a diagramming tool, I'd much rather spend the tokens on depth and
quality of a small, curated feature set. I'll want to add some plugin/module
system to easily add on things that don't belong in D2 core. For example, I still
plan for D2 to focus on the software architecture diagram use case and won't be
adding e.g. Venn diagrams, even if it'd be trivial to do so.

I still don't see a place for LLMs integrated into diagramming tools. I think
models are smart enough to just look at some examples and then take your specs or
code or whatever you want and turn it into a `.d2` file. There doesn't need to be
yet another thinly tuned LLM interface for D2 to provide.

Since D2 is non-profit, we won't be supporting things that need servers. No MCP,
no API, no user accounts, no server rendering. D2 Studio will be purely
client-side, usable completely offline.

## More soon

That's all for now. I'll be making posts as TALA and D2 Studio are released.

Thank you to everyone who has engaged with us over the years, and especially
those who paid for the closed-source parts of it to fund its development. I'm
glad D2 has resonated with so many people and I still stumble upon it in blogs
and projects and mentions on the public internet and internal company channels.
It's always a leap of faith to adopt some new language with unknown motives and
continuity. I'm really happy about this direction for D2 and that the value of
this excellent IDE and layout algorithm can be shared with more people. I'm
excited for what's next.
