---
sidebar_label: What is D2
pagination_next: tour/experience
---
import CodeBlock from '@theme/CodeBlock';
import Example from '@site/static/bespoke-d2/terminal-theme.d2';

# D2 Tour

**D2** is a diagram scripting language that turns text to diagrams. It stands for
**Declarative Diagramming**. Declarative, as in, you describe what you want diagrammed, it
generates the image.

For example, download the CLI, create a file named `input.d2`, copy paste the following,
run this command, and you get the image below.

```sh
d2 --theme=300 --dark-theme=200 -l elk --pad 0 ./input.d2
```

<div style={{width: "100%"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/terminal-theme.svg2')}}></div>

<CodeBlock className="language-d2">
    {Example}
</CodeBlock>

## Using the CLI watch mode

<img className="screenCap" width="100%" src={require('@site/static/img/screenshots/cli.gif').default}
alt="D2 CLI"/>

You can finish this tour in about 5-10 minutes, and at the end, there's a cheat sheet you
can download and refer to. If you want just the bare essentials, <a
href="/tour/hello-world/">Getting Started</a> takes
~2 mins.

:::info
The source code for D2 is hosted here:
[https://github.com/d2lang/d2](https://github.com/d2lang/d2).

The source code for these docs are here:
[https://github.com/d2lang/d2-docs](https://github.com/d2lang/d2-docs).
:::

:::info
For each D2 snippet, you can hover over it to open directly in the Playground and tinker.

There's some exceptions like snippets that use imports.
:::
