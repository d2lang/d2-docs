# Roadmap

import WebPImage from '@site/src/components/WebPImage';

:::info TLDR
[https://github.com/d2lang/d2/issues?q=is%3Aopen+is%3Aissue+label%3Afeature](https://github.com/d2lang/d2/issues?q=is%3Aopen+is%3Aissue+label%3Afeature)
:::

D2's long-term goal is to significantly reduce the amount of time and effort it takes to
create and maintain high-quality diagrams for every software team. This is a large,
ambitious undertaking that will take many (more) years to get right, and won't ever truly
be "done". It's important to focus on what's most impactful towards increasing its
utility, in more use cases, especially in these early stages. The top priorities today:

1. Expand coverage of layouts it can handle.
1. Minimize the effort required for aesthetically pleasing diagrams.
1. Support integration with popular developer tools.

For each of these, there are survey questions that are used to measure progress.

## Layouts

In some instances, you need a diagram to match the exact image in your head. These
workflows will always require a design tool, with a drag-and-drop GUI. In other cases, you
don't care about exact match, or you can't even picture the end result. The requirements
for these types of diagrams are more relaxed --  it only needs to satisfy a set of
constraints. These are the types of diagrams that an algorithm can get right --
"automatable". The vast majority of software engineering diagrams are automatable.

<div style={{
  display: "flex",
  alignItems: "center",
}}>
  <WebPImage src={require('@site/static/img/screenshots/freeform.png').default} webpSrc={require('@site/static/img/screenshots/freeform.webp').default} alt="freeform diagram example. Source: https://vickiboykis.com/2022/11/18/some-notes-on-the-stable-diffusion-safety-filter/" width="50%"/>
  <WebPImage src={require('@site/static/img/screenshots/automatable.png').default} webpSrc={require('@site/static/img/screenshots/automatable.webp').default} alt="automatable diagram example" width="50%" />
</div>

<div style={{
  color: "grey",
  display: "flex",
  alignItems: "center",
  marginBottom: "3rem",
}}>
  <div style={{width: "50%", textAlign: "center"}}>Not automatable. Precise placements,
  unique shapes.</div>
  <div style={{width: "50%", textAlign: "center"}}>Automatable. You could show these
  relationships in 100 different ways that look good.</div>
</div>

Currently, D2 can handle a subset of automatable diagrams well, and increasing coverage is
a priority. The primary lever, of course, is layout engines. These are the algorithms that
take shapes, labels, icons, connections and hints as input, and lay it out in such a way
that is "legible".

There are two components to diagram legibility.

1. Visual legibility. Minimal noise, clean, aligned, no unnecessary connection crossings,
  etc. There is no obvious improvement to be made, like swapping two shapes such that
  they're both closer to their respective neighbors.
2. Semantic legibility. If your coworker were to draw the same model, would the model be
  more understandable to you even if it were visually messier?

Visual legibility is what algorithms are good at, and they should always outperform
humans. The gap increases as diagrams get larger -- it's impossible for me and you to
eyeball 20 swaps that end up reducing overall edge distance by 4 pixels.

Semantic legibility is the bigger challenge. Most layout engines stick to a simple "type"
of diagram, like hierarchical. But how often do you want your software architecture to be
hierarchical? Rarely, and laying it out that way changes the semantics.

### How success is measured

- Visual: Can you spot any obvious improvements to be made?
- Semantic: Turing test -- can you tell the layout was the work of an algorithm vs your
  coworker?

D2 uses Dagre by default. Though it is among the best open-source layout engines (used by
MermaidJS, perhaps the most popular text-to-diagram tool currently), it still leaves much
to be desired. Dagre is unfortunately unmaintained, and only produces hierarchical
layouts. Even if it were to be revived, the research papers it's based off of will not
evolve out of hierarchical layouts. It also doesn't support containers, which is a
non-starter for software architecture diagrams (D2 has shimmed support for it [2]).

### Plan

1. Integrate with special-purpose layout engines which are "solved". For example, there's
no improvements to be made to a sequence diagram layout engine. Likewise for a git-commit
timeline, or radial layouts, among others.
1. We are developing a new general-purpose layout engine from scratch [3], testing
exclusively on software architecture diagrams. It can support multiple sub-types in one
diagram, e.g. part of the diagram is a tree, but not all of it has to be. It handles
containers and clusters very well, moves labels and icons to avoid collisions, and much
more.

## Aesthetics

Documentation is only useful if it's consumed, and beautiful diagrams are consumed far
more than ugly ones. For algorithm-generated diagrams to be a suitable replacement to
hand-made, it must be at least as aesthetic. To be consistently preferable to hand-made
ones [4], it must be aesthetic out of the box. Customization should then be graduated
levels of how much effort you want to expend. Least effort: choose from pre-made themes
designed by professional designers. More effort: make and edit your own themes. Most
effort: custom-style everything. Most engineers are satisfied at the first and second
levels, but D2 must have good support for granular customization.

### How success is measured

- If you're making a diagram for a large audience (e.g. a blog, company all-hands), would
  you use D2 to make it?

One deciding factor is the time it takes to get to a presentable diagram. Presentable
doesn't mean full of vibrant colors and shadows and design fluff. It does mean consistent
colors that increase clarity, on-brand palette of company colors, distinct shapes and
arrows -- properties that make a professional diagram you'd be proud of presenting.

Another consideration is how customizable the aesthetics are, and how much effort that
customization takes. I wish the bar here could be that customizing via text can get better
than the GUI, but I don't believe this to be a possible outcome. If you want a slightly
different shade of green, are you going to edit the hex code by typing it? Or would you
rather point and click from a gradient. If you want to change the style of 3 objects
you're looking at, you can text-search for the names of each of those 3 objects and change
them individually. But most of us would rather use the superior input device for precision
targeting -- a mouse.

While getting the customization experience to be GUI-level is merely aspirational, D2 can
aim to be at least as good as an existing, battle-tested text-based styling language: CSS.

### Plan

1. Continue building language features to make customization easier. D2 supports
[glob targeting](/tour/globs) (e.g. `x.*.style.fill: red` to make every child of a container
red) and [classes](/tour/classes) (define styles once, reuse as classes). Its catalog of
shape and connection types needs to expand.
1. Continue investing in themes. Theming is how engineers make beautiful diagrams without
designing. D2 needs to extend what themes can latch onto. Not just colors, but fonts,
background styles (dotted, grids, colors), every aspect of the diagram. They should be
able to target granularly, e.g. for cylinder shapes 2 container-levels deep, use these
styles. And, there should be easy ways to create and modify themes.
1. Curate a set of high-quality, consistent icons to bundle with D2.

## Developer Tooling

The better support a dev tool has for existing workflows and familiar tools, the more
useful it is. D2 has official Vim and VSCode extensions. Features within the language
exist solely for bettering editor environments, such as autoformat and being able to parse
broken syntax and output multiple, human-readable error messages.

To further support composability, D2 has a built-in API for manipulating the AST at a
high-level (more intelligent than just CRUD on AST nodes). This lets anyone build up and
edit a diagram programmatically. The goal isn't to enable a specific use case, but rather
unforeseen ones for the infinite workflows out there.

D2's plugin system further makes the language extensible. These allow you to add "hooks"
to stages of D2 compilation. For example, while not core to D2, a hypothetical set of
plugins can add a styled border, add your signature/credits, make everything [look
hand-drawn](https://github.com/d2lang/d2/pull/91), then increase contrast for
accessibility.

### How success is measured

- Does writing and reading D2 in your environment feel "complete"?
- Is it flexible and extendible enough to be used in unforeseen ways?

Completeness: I could not tell you any improvement to Vim's Go plugin if you asked me to
name one [5]. It feels complete. However, there are plenty of plugins/extensions I've used
which felt lacking, e.g. the syntax highlighting only identified some basic tokens and
stopped there.

Extensibility: A hallmark of a good developer tool is when its modularity enables
unplanned usage.


### Plan

1. D2's plugin system is still in its early stages, and should allow deeper hooks into
   parts of compilation.
1. Complete editor integrations. Currently, syntax highlighting is supported. But a
   feature-complete integration for VSCode for example would allow rendering to its
   built-in browser, autoformat, call out to LSP functions to refactor, and more.
1. Build out imports/exports. D2 exports to [SVG, PNG, PDF, PPTX, GIF, and ASCII](/tour/exports).
   It should have a transpiler to import other popular text-to-diagram languages. It
   should take in CSVs of schemas to make ERDs.
1. Build a configurable linter.

## Your feedback

If you have any suggestions or feedback, we'd love to hear from you! Please open an issue
on [Github](https://github.com/d2lang/d2).

## Notes

[0] Many other domains are also majority capturable by algorithms, like trees for HR
diagrams. Other domains like biology, the majority of diagrams are custom-drawn.

[1] Some diagrams will always require manual labor. For example, if you want to have a
translucent blueprint of an airplane and overlay shapes and lines on specific parts. Good
GUI diagram-makers will always be necessary.

[2] MermaidJS seems to have implemented support for containers as well, but it's not
widely released and their live editor still won't allow it.

[3] [TALA](/tour/tala) is open-source and bundled with D2 as of v0.9.0.

[4] If you still miss the hand-drawn aesthetic, D2 has just the thing:
https://github.com/d2lang/d2/pull/492

[5] Actually, gopls single-handedly brings my machine back to 2005 speeds with how much
CPU it consumes. Not the fault of vim-go though!
