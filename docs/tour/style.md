import CodeBlock from '@theme/CodeBlock';
import StylesOpacity from '@site/static/d2/styles-opacity.d2';
import StylesStroke from '@site/static/d2/styles-stroke.d2';
import StylesFill from '@site/static/d2/styles-fill.d2';
import StylesFillTransparent from '@site/static/d2/styles-fill-transparent.d2';
import StylesFillPattern from '@site/static/d2/styles-fill-pattern.d2';
import StylesStrokeWidth from '@site/static/d2/styles-stroke-width.d2';
import StylesStrokeDash from '@site/static/d2/styles-stroke-dash.d2';
import StylesBorderRadius from '@site/static/d2/styles-border-radius.d2';
import Pill from '@site/static/d2/pill.d2';
import StylesShadow from '@site/static/d2/styles-shadow.d2';
import Styles3d from '@site/static/d2/styles-3d.d2';
import StylesMultiple from '@site/static/d2/styles-multiple.d2';
import StylesDoubleBorder from '@site/static/d2/styles-double-border.d2';
import StylesFont from '@site/static/d2/styles-font.d2';
import StylesFontSize from '@site/static/d2/styles-font-size.d2';
import StylesFontColor from '@site/static/d2/styles-font-color.d2';
import StylesTableColor from '@site/static/d2/styles-table-color.d2';
import StylesAnimated from '@site/static/bespoke-d2/styles-animated.d2';
import StylesTextDecoration from '@site/static/d2/styles-text-decoration.d2';
import StylesTextTransform from '@site/static/d2/styles-text-transform.d2';
import StylesRoot from '@site/static/d2/styles-root.d2';

# Styles

If you'd like to customize the style of a shape, the following reserved keywords can be
set under the `style` field.

Below is a catalog of all valid styles, applied individually to this baseline diagram.

<div style={{width: "400px", margin: "20px auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-base.svg2')}}></div>

:::note
The following SVGs are rendered with `direction: right`, but omitted from the shown scripts for
brevity.
:::

:::tip
Want to change the default styles for shapes and/or connections? See [globs to change defaults](/tour/globs/#changing-defaults).
:::

## Style keywords

- [opacity](#opacity)
- [stroke](#stroke)
- [fill](#fill) (shape only)
- [fill-pattern](#fill-pattern) (shape only)
- [stroke-width](#stroke-width)
- [stroke-dash](#stroke-dash)
- [border-radius](#border-radius)
- [shadow](#shadow) (shape only)
- [3D](#3d) (rectangle/square only)
- [multiple](#multiple) (shape only)
- [double-border](#double-border) (rectangles and ovals)
- [font](#font)
- [font-size](#font-size)
- [font-color](#font-color)
- [animated](#animated)
- [bold, italic, underline](#bold-italic-underline)
- [text-transform](#text-transform)
- [root](#root)

## Opacity

Float between `0` and `1`.

<CodeBlock className="language-d2">
    {StylesOpacity}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-opacity.svg2')}}></div>

## Stroke

CSS color name, hex code, or a subset of CSS gradient strings.

<CodeBlock className="language-d2">
    {StylesStroke}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-stroke.svg2')}}></div>

<br/>

For `sql_table`s and `class`es, `stroke` is applied as `fill` to the body (since `fill` is
already used to control header's `fill`).

<div style={{width: "600px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-table-stroke.svg2')}}></div>

## Fill

CSS color name, hex code, or a subset of CSS gradient strings.

<CodeBlock className="language-d2">
    {StylesFill}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-fill.svg2')}}></div>

<br/>

For `sql_table`s and `class`es, `fill` is applied to the header.

<div style={{width: "600px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-table-fill.svg2')}}></div>

Want transparent?

<CodeBlock className="language-d2">
    {StylesFillTransparent}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-fill-transparent.svg2')}}></div>

## Fill Pattern

Available patterns:

- `dots`
- `lines`
- `grain`
- `none` (for cancelling out ones set by certain themes)

<CodeBlock className="language-d2">
    {StylesFillPattern}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-fill-pattern.svg2')}}></div>

## Stroke Width

Integer between `1` and `15`.

<CodeBlock className="language-d2">
    {StylesStrokeWidth}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-stroke-width.svg2')}}></div>

## Stroke Dash

Integer between `0` and `10`.

<CodeBlock className="language-d2">
    {StylesStrokeDash}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-stroke-dash.svg2')}}></div>

## Border Radius

Integer between `0` and `20`.

<CodeBlock className="language-d2">
    {StylesBorderRadius}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-border-radius.svg2')}}></div>

:::info
`border-radius` works on connections too, which controls how rounded the corners are. This
only applies to layout engines that use corners (e.g. ELK), and of course, only has effect
on connections whose routes have corners.
:::

Specifying a very high value creates a "pill" effect.

<CodeBlock className="language-d2">
    {Pill}
</CodeBlock>

<div style={{width: "200px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/pill.svg2')}}></div>

## Shadow

`true` or `false`.

<CodeBlock className="language-d2">
    {StylesShadow}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-shadow.svg2')}}></div>

## 3D

`true` or `false`.

<CodeBlock className="language-d2">
    {Styles3d}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-3d.svg2')}}></div>

## Multiple

`true` or `false`.

<CodeBlock className="language-d2">
    {StylesMultiple}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-multiple.svg2')}}></div>

## Double Border

`true` or `false`.

<CodeBlock className="language-d2">
    {StylesDoubleBorder}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-double-border.svg2')}}></div>

## Font

Currently the only option is to specify `mono`. More coming soon.

<CodeBlock className="language-d2">
    {StylesFont}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-font.svg2')}}></div>

## Font Size

Integer between `8` and `100`.

<CodeBlock className="language-d2">
    {StylesFontSize}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-font-size.svg2')}}></div>

## Font Color

CSS color name, hex code, or a subset of CSS gradient strings.

<CodeBlock className="language-d2">
    {StylesFontColor}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-font-color.svg2')}}></div>

<br/>

For `sql_table`s and `class`es, `font-color` is applied to the header text only (theme
controls other colors in the body).

<div style={{width: "600px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-table-color.svg2')}}></div>

## Animated

`true` or `false`. To send a dot or image along a connection, [animate its icon](./animation.md#animate-connection-icons).

<CodeBlock className="language-d2">
    {StylesAnimated}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-animated.svg2')}}></div>

## Bold, italic, underline

`true` or `false`.

<CodeBlock className="language-d2">
    {StylesTextDecoration}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-text-decoration.svg2')}}></div>

## Text transform

`text-transform` changes the casing of labels.

- `uppercase`
- `lowercase`
- `title`
- `none` (used for negating caps lock that special themes may apply)

<CodeBlock className="language-d2">
    {StylesTextTransform}
</CodeBlock>

<div style={{width: "400px", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-text-transform.svg2')}}></div>

## Root

Some styles are applicable at the root level. For example, to set a diagram background
color, use `style.fill`.

Currently the set of supported keywords are:

- `fill`: diagram background color
- `fill-pattern`: background fill pattern
- `stroke`: frame around the diagram
- `stroke-width`
- `stroke-dash`
- `double-border`: two frames, which is a popular framing method

<CodeBlock className="language-d2">
    {StylesRoot}
</CodeBlock>

<div style={{width: "400px", margin: "20px auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/styles-root.svg2')}}></div>

:::info
All diagrams in this documentation are rendered with `pad=0`. If you're using `stroke` to
create a frame for your diagram, you'll likely want to add some padding.
:::
