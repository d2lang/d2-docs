# Design decisions

import WebPImage from '@site/src/components/WebPImage';

The following are design decisions that guide the development of D2. We've tried our best
to avoid the mistakes of the past and take inspiration from the most successful modern
programming and configuration languages.

Design decisions inherently mean tradeoffs, some of which you may disagree with. But, if
you're a programmer, D2 is built for you, and we believe you'll find the sum of these
decisions to be a language that makes you feels at home.

These will inevitably evolve as the language continues to evolve.

## Readability > prototyping speed

Both readability and prototyping speed are important, but when a decision is one or the
other, D2 usually favors readability.

Most of the time, it's not either/or. Good programming language features usually result in
higher vectors in both directions. D2's syntax is light and designed such that autofmt
always gets it right for you, consistent across projects.

Hopefully you'll find a good balance between ease of use, prototyping speed, and
readability, in that order. What D2 specifically avoids is terse, compact syntax that
inhibits all three.

For example, here's two ways to define a cylinder.

D2:

```d2
A: Christmas {shape: cylinder}
```

Mermaid:

```
A[(Christmas)]
```

D2's is a little less compact but a lot more readable. It's also more writeable, by which
I mean you don't forget that a cylinder is called a cylinder, but it's easy to forget that
`[(x)]` is a cylinder.

## Warnings > errors

D2 will compile whenever possible. For example, say you apply a class that doesn't exist,
or add a style that has no effect on a particular shape. If the user error is one that D2
can ignore, it will compile successfully and, at most, warn. There's nothing more annoying
than commenting out some code while debugging, and getting a stop-the-world error message
that you have an unused variable.

## Good defaults

Default, zero-customization D2 should produce good diagrams. That requires being
opinionated on what a good default should be. For example, D2 ships with a default theme.
Instead of keeping things open-ended with monochrome shapes, pleasant colors are the
default.

## Optimized for desktops and servers

D2 has a robust CLI with a built-in watch mode, maintained `man` page, and allows reading
from stdin and writing to stdout. Images and fonts are by default embedded into the
diagram so that exported diagrams are standalone -- they'll look the same everywhere. D2
supports a wide variety of formats like PPT and GIF. It allows imports, such that you can
modularize your diagram into multiple files. There's a language API to programmatically
edit and write D2.

D2 also runs in browsers and Node.js through
[D2.js](https://github.com/d2lang/d2/tree/master/d2js/js#readme), a JavaScript library
powered by WebAssembly.

## Singular use case: documenting software

D2 is focused on being useful to software engineers for documenting software. We are not a
general-purpose visualization tool. Other languages may support mind maps, Gantt charts,
Sankey, venn diagrams, and have the capability to draw a map of the United States. D2 does
none of those and will not support these.

In D2, these are considered bloat. Stretching a language thin across such a large surface
area of different diagram types essentially splits it into N different mini-DSLs within a
DSL. Syntax can hardly evolve when it has to support N completely different diagram types.
And it's counter to the original purpose of a DSL which is to make a subset task more
convenient.

## Design the system, not the diagram

The purpose of D2 is to describe the system you're documenting. The language should make a
clear separation between design of the system and design of the diagram.

Consider what it takes to customize styles in a Graphviz diagram:

```
digraph "Linux_kernel_diagram" {
	fontname="Helvetica,Arial,sans-serif"
	node [fontname="Helvetica,Arial,sans-serif"]
	edge [fontname="Helvetica,Arial,sans-serif"]
	graph [
		newrank = true,
		nodesep = 0.3,
		ranksep = 0.2,
		overlap = true,
		splines = false,
	]
	node [
		fixedsize = false,
		fontsize = 24,
		height = 1,
		shape = box,
		style = "filled,setlinewidth(5)",
		width = 2.2
	]
	edge [
		arrowhead = none,
		arrowsize = 0.5,
		labelfontname = "Ubuntu",
		weight = 10,
		style = "filled,setlinewidth(5)"
	]
```

Imagine if you couldn't separate HTML and CSS and it all had to be inlined.

Of course, good aesthetics are essential to good documentation. D2 certainly prioritizes
aesthetics, but it must be decoupled with the content.

D2 is the only language that allows you to define just nodes and edges, and import all the
styles in a separate file, and swap out that file for different aesthetics.

## Whiteboard-fit

While "graph" and "diagram" are often interchangeable terms, for D2's purposes, a diagram
is a simplified representation that can fit on a large whiteboard. After a certain number
of nodes and edges, e.g. 1000 nodes, the representation becomes more like a graph from
graph theory than a software architecture diagram. Their use case is less understanding
each individual shape and connection and more seeing the general patterns. D2 is not
designed for this use case. There are much better tools for that.


<WebPImage src={require('@site/static/img/screenshots/graph.png').default} webpSrc={require('@site/static/img/screenshots/graph.webp').default} width={300} alt="graph example"/>
