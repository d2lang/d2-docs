import CodeBlock from '@theme/CodeBlock';
import VarsIntro from '@site/static/d2/vars-intro.d2';
import VarsNested from '@site/static/d2/vars-nested.d2';
import VarsScoped from '@site/static/d2/vars-scoped.d2';
import VarsEscaped from '@site/static/d2/vars-escaped.d2';
import VarsSpread from '@site/static/d2/vars-spread.d2';
import VarsConfig from '@site/static/d2/vars-config.d2';

# Variables & Substitutions

`vars` is a special keyword that lets you define variables. These variables can be
referenced with the substitution syntax: `${}`.

<CodeBlock className="language-d2">
    {VarsIntro}
</CodeBlock>

<div style={{width: 400}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/vars-intro.svg2')}}></div>

## Variables can be nested

Use `.` to refer to nested variables.

<CodeBlock className="language-d2">
    {VarsNested}
</CodeBlock>

<div style={{width: 200}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/vars-nested.svg2')}}></div>

## Variables are scoped

They work just like variable scopes in programming. Substitutions can refer to variables
defined in a more outer scope, but not a more inner scope. If a variable appears in two
scopes, the one closer to the substitution is used.

<CodeBlock className="language-d2">
    {VarsScoped}
</CodeBlock>

<div style={{width: 600}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/vars-scoped.svg2')}}></div>

## Single quotes bypass substitutions

<CodeBlock className="language-d2">
    {VarsEscaped}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/vars-escaped.svg2')}}></div>

## Spread substitutions

If `x` is a map or an array, `...${x}` will spread the contents of `x` into either a map
or an array.

<CodeBlock className="language-d2">
    {VarsSpread}
</CodeBlock>

<div style={{width: 400}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/vars-spread.svg2')}}></div>

## Configuration variables

Some configurations can be made directly in `vars` instead of using flags or environment
variables.

<CodeBlock className="language-d2">
    {VarsConfig}
</CodeBlock>

This is equivalent to calling the following with no `vars`:
```shell
d2 --layout=elk --theme=4 --dark-theme=200 --pad=0 --sketch --center input.d2
```

<div style={{width: 400}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/vars-config.svg2')}}></div>

:::info Precedence
For top-level settings such as `theme-id` and `pad`, flags and environment variables take precedence.

In other words, if you call `D2_PAD=2 d2 --theme=1 input.d2`, it doesn't matter what
`theme-id` and `pad` are set to in `input.d2`'s `d2-config`; it will use the options from
the command.
:::

`animate-interval` sets the playback interval for all boards.
`animate-duration` sets the transition time for steps. It also controls pencil shading
and text decorations between layers and scenarios. See the [animation configuration](./animation.md#configuration).

### Output scale and SVG appendix

On D2's development branch (`master`), you can set `scale` and `force-appendix`
in the diagram. These source options will be available in the next release.

```d2
vars: {
  d2-config: {
    scale: 0.5
    force-appendix: true
  }
}

checkout: Checkout API {
  tooltip: Validates orders before payment
}
```

`scale: 0.5` renders at half size. Use `-1` for automatic sizing, which lets an SVG
fit its container. `force-appendix: true` adds numbered notes for links and tooltips
to SVG exports, including animated boards. PNG exports already include the notes.
To export the same diagram at its natural size without the SVG appendix, run
`d2 --scale=1 --force-appendix=false input.d2 output.svg`.

:::info `data`
`data` holds key-value pairs that applications embedding D2 can read. Starting in v0.9.1,
you can also set [Dagre](./dagre.md#spacing) and [ELK](./elk.md#algorithms) layout options here.
These values take precedence over the corresponding CLI flags. This example sets the space
between adjacent ELK layers to 100 pixels.

```d2
vars: {
  d2-config: {
    layout-engine: elk
    data: {
      elk-nodeNodeBetweenLayers: 100
    }
  }
}

a -> b
```
:::
