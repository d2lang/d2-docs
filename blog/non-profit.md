---
date: 2026-09-05
title: D2 is non-profit
description: D2 is becoming an independent, donation-funded open-source project fiscally sponsored by Hack Club.
slug: d2-non-profit
tags: [announcement, community]
hide_table_of_contents: false
---

Hello, I'm happy to share the news that D2 is now fiscally sponsored by
[Hack Club](https://hackclub.com/)!

The project was born and thus far developed as an open-core arm of a for-profit
company. The development of open-source D2 was funded by the closed-source IDE
(D2 Studio) and proprietary layout algorithm (TALA). The company is shutting down,
and D2 will continue as an independent, completely open-source, non-profit project
through Hack Club.

I will continue to maintain and improve D2. But my time commitment will be limited.
It's not my primary focus anymore, but I remain committed to its continued
development and am excited for the roadmap ahead.
If you have interest in becoming a maintainer, please email me at
[alex@d2lang.com](mailto:alex@d2lang.com). High-quality maintenance and contributions
may be invited to enter into a paid contributor contract, funded by donations to
the non-profit.

<!-- truncate -->

## What's next

D2 thus far has been a product of handcrafted code. That era is over. This next
phase of D2 will be driven by AI. By this, I mean that all of my contributions will
use AI. I welcome AI contributions and will use AI to review your AI, etc. The
exception is writing -- I will author all blog posts and comms without AI.

In this manner, D2 will evolve at a rate that is orders of magnitude faster than
it has. Models will find ways to squeeze every millisecond of performance in a way
I could not. It'll make into reality the features that were daydreams pre-AI
because of limited engineering bandwidth, e.g. an isometric renderer, transpilers
from other diagramming languages, etc.

If you've invested a tiny part of your stack into D2, I hope this is received with
optimism more than concern. I wrote code ~every day for 10+ years, and have not
written any in the past year even though I'm working with software every day.
I know where the limitations are and have no intention of the project devolving
into slop.

I of course know this is somewhat controversial and has
[downsides](https://neilalexander.dev/2026/06/30/flooding-contributions), and I'm not
recommending anything to anyone; I just wanted to be transparent about my plans to
the community and those who rely on D2.

Some top of mind goals:

1. Get rendering support from popular platforms
   1. Natively integrated onto GitHub, Notion, Linear, etc.
2. Cut a stable 1.0 with formalized grammar/featureset
3. Be the most powerful harness for agents
   1. They're really good at making almost-perfect diagrams, but it's still too
      non-deterministic, uncustomizable, imprecise, etc. I think that'll last the
      foreseeable future, so you still want some text-based source to back the
      artifact. Kind of like HTML for web pages instead of drawing every pixel.

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
no API, no user accounts, no server rendering, no multiplayer. D2 Studio will be purely
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

If you'd like to donate to D2, please see [this page](https://d2lang.com/sponsor/)
on how to do so and what the fund is used for.
