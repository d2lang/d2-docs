---
date: 2025-08-02
---

import CodeBlock from '@theme/CodeBlock';
import Example from '@site/static/d2/ascii-ex.d2';

# ASCII output

In the latest release of D2 (0.7.1), we introduce ASCII outputs.

Any output file with extension `txt` will use the ASCII renderer to write to it.

```shell
d2 in.d2 out.txt
```

<!-- truncate -->

Here is an example of their rendering from the [D2 Vim extension](https://github.com/d2lang/d2-vim). The user opens a `.d2` file and opens a preview window, which updates upon every save.

![D2 Vim preview](/blog/ascii/preview.gif)

## Code documentation

Perhaps the most useful place for ASCII diagrams is in the source code comments. Small
simple diagrams next to functions or classes can serve to be much clearer than describing
a flow.

Here again the Vim extension demonstrates a functionality to write some d2 code and
replace the selection with the ASCII render.

![D2 Vim replace](/blog/ascii/replace.gif)

## Unicode and standard ASCII

The default character set of ASCII renders is unicode, which has nicer box-drawing
characters. If you'd like true ASCII for maximum portability, you can specify this with
the flag `--ascii-mode=standard`.

## Limitations

:::info Alpha
Note that the ASCII renderer should be considered in alpha stage. There will be many
corner cases, areas of improvements, and outright bugs. If you enjoy using it, we'd
appreciate you taking the time to file any issues you run into:
[https://github.com/d2lang/d2/issues](https://github.com/d2lang/d2/issues).
:::

The ASCII renderer is a downscale of the layout determined by the ELK layout engine with
some post-processing to further compact it.

- No styles are supported
    - Some will never be, e.g. `animated` and `font` don't make sense in ASCII.
    - Some may in the future with limited scope, e.g. colors when rendered to terminal.
      - By extension, themes are moot
    - Some should be considered TODOs, e.g. `double-border` and `multiple`
- Uneven spacing
  - Sometimes the downscaling results in a box with uneven spacing, e.g. a rectangle with
width 5 and the label is 2 chars. Due to discrete coordinate space in ASCII renders, some
outputs may look less even than their SVG counterparts.
- Certain things just can't render
    - Special text, e.g. Markdown, Latex, Code
    - Images and icons
    - UML classes and SQL tables
    - Right now these aren't special-handled -- whether removing them from the diagram or
using some placeholder is the right choice is tbd.
- Not all shapes are supported
  - Here's what all the shapes render as in ASCII. Some of these, like cloud and circle,
  have curves that don't translate well to ASCII. We render these as a rectangle and add
  a little icon for what it's supposed to represent in the top-left. These are subject to
change. For now we recommend rendering without custom shapes.

```txt
                                                      ┌────────┐         ***
                  ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╱   ╱‾‾‾‾‾‾‾‾‾╱╲    │callout │     ****   ****     ╱‾‾‾‾‾‾‾‾‾╲
 ┌──────────┐    ╱               ╱   │         │  │   └────────┘  ***  diamond  *** ╱           ╲
 │rectangle │   ╱ parallelogram ╱    │   queue │  │        │ ╱      ****     ****   ╲  hexagon  ╱
 │          │  ╱_______________╱      ╲________ ╲╱         │╱           *****        ╲_________╱
 └──────────┘
       │                 │                  │              │              │                │
       ▼                 ▼                  ▼              ▼              │                ▼
  ┌─────────┐      ┌──────────┐        ┌────┐        ╱‾‾‾‾‾‾‾‾‾‾‾╱        ▼          ┌☁─────────┐
  │         │      │ document │        │    └────┐  ╱           ╱    ┌⬭────────┐     │          │
  │ square  │      │     .-`-.│        │ package │ │ stored_data     │  oval   │     │  cloud   │
  │         │       `-.-`              └─────────┘  ╲           ╲    │         │     │          │
  │         │                                        ╲___________╲   └─────────┘     │          │
  └─────────┘            │                  │              │              │          └──────────┘
       │                 │                  │              │              │
       ▼                 ▼                  ▼              ▼              │
   ┌─────┐          .-‾‾‾‾-.          ╲‾‾‾‾‾‾‾ ╲         ╱‾‾╲             ▼
   │     ╲┐        │╲-____-╱│          ╲        ╲        ╲__╱        ┌⬭────────┐
   │ page │        │        │           ╲        ╲      ╱‾‾‾‾╲       │         │
   │      │        │        │           ╱ step   ╱      ‾‾‾‾‾‾       │ circle  │
   └──────┘        │cylinder│          ╱        ╱       person       │         │
                   │        │         ╱_______ ╱                     │         │
                    ╲-____-╱                                         └─────────┘
```

## Try it yourself

This is live now in the D2 Playground. Try opening the below code block (click top right
of it).

<CodeBlock className="language-d2" expandeable={true} ascii={true}>
    {Example}
</CodeBlock>
