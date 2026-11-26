---
pagination_next: tour/style
---
import CodeBlock from '@theme/CodeBlock';
import WebPImage from '@site/src/components/WebPImage';
import TerminalTheme from '@site/static/bespoke-d2/terminal-theme.d2';

# Themes

D2 comes with many themes that make your diagram look professional and ready to insert
into blogs and wikis.

Starting in v0.10.0, diagrams and CLI flags accept theme names as well as numeric IDs.
For example, `theme-id: Terminal` selects theme 300. Names are case-insensitive and
hyphens can replace spaces, so `dark-theme-id: dark mauve` and `--dark-theme Dark-Mauve`
both select theme 200.

<WebPImage width={700} src={require('@site/static/img/screenshots/themes/theme_overview.png').default} webpSrc={require('@site/static/img/screenshots/themes/theme_overview.webp').default} alt="D2 theme choices"/>
<WebPImage width={400} src={require('@site/static/img/screenshots/themes/theme_2.png').default} webpSrc={require('@site/static/img/screenshots/themes/theme_2.webp').default} alt="mixed berry blue theme"/>
<WebPImage width={400} src={require('@site/static/img/screenshots/themes/theme_3.png').default} webpSrc={require('@site/static/img/screenshots/themes/theme_3.webp').default} alt="vanilla nitro cola theme"/>

### They apply to special shapes like tables too

# Rendered with theme "Grape soda"

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/theme-table.svg2')}}></div>

# Rendered with theme "Vanilla nitro cola"

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/theme-table-2.svg2')}}></div>

## Setting theme on the CLI

To specify the theme used, you can set the flag `-t, --theme`.

```shell
d2 -t 101 input.d2
```

You can also use an environment variable.

```shell
D2_THEME=101 d2 input.d2
```

To see which themes are available, run

```shell
d2 themes
```

## Dark theme

Dark themes are not set by default, so your diagram will look the same regardless of
whether the user's system preferences are light or dark.

:::info
All diagrams in these docs have a dark theme. Try toggling your system preference between
light and dark and see how it changes.
:::

If you'd like your diagram to adapt and switch to a dark theme when the user's system
preference is dark, you can do so by specifying the following flag.

```shell
d2 --dark-theme 200 input.d2
```

Like regular themes, this can also be set with an environment variable.

```shell
D2_DARK_THEME=200 d2 input.d2
```

:::info
The themes are catalogued separately into light and dark, but there's nothing stopping you
from passing a dark theme ID to `theme` for your diagram to always be dark (or vice versa,
to give a surprise to dark mode users).
:::

An example of a dark theme (this one's an image not an SVG, so it won't change according
to your system preference).
<WebPImage width={600} src={require('@site/static/img/screenshots/themes/dark.png').default} webpSrc={require('@site/static/img/screenshots/themes/dark.webp').default} alt="dark theme"/>

## Special themes

Certain, special themes do more than just color.

For example, when you apply the `Terminal` theme, the following attributes are set as
default:
- Caps lock on all labels
- No border radius
- Monospaced font
- `fill-pattern` set to `dots` for all containers
- Most outer container has `double-border` set to `true`

<div style={{width: "100%", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/terminal-theme.svg2')}}></div>

Source code for the above diagram (rendered with ELK) is as follows. Notice that many of
the properties apparent in the diagram do not appear in the source, such as the casing of
the labels, because the special theme uses different defaults.

<CodeBlock className="language-d2">
    {TerminalTheme}
</CodeBlock>

## Customizing themes

You can override theme values to customize existing themes or replace them entirely with
your own theme.

This is controlled by two [configuration variables](/tour/vars/#configuration-variables):

- `theme-overrides`: replaces color codes for theme
- `dark-theme-overrides`: replaces color codes for dark theme

Adding this snippet to the above code results in the following diagram.

```d2-incomplete
vars: {
  d2-config: {
    theme-overrides: {
      B1: "#2E7D32"
      B2: "#66BB6A"
      B3: "#A5D6A7"
      B4: "#C5E1A5"
      B5: "#E6EE9C"
      B6: "#FFF59D"

      AA2: "#0D47A1"
      AA4: "#42A5F5"
      AA5: "#90CAF9"

      AB4: "#F44336"
      AB5: "#FFCDD2"
    }
  }
}
```

<div style={{width: "100%", margin: "0 auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/theme-override.svg2')}}></div>

### Color codes

<WebPImage width={700} src={require('@site/static/img/color-code.png').default} webpSrc={require('@site/static/img/color-code.webp').default} alt="D2 color codes"/>

:::info
Not all color codes are currently used right now, but that may change in the future for
new things that come to D2.
:::
