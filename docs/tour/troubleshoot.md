# Troubleshooting

* [It won't compile a specific label or value](#it-wont-compile-a-specific-label-or-value)
* [The text is rendered too wide/long](#the-text-is-rendered-too-widelong)
* [Connections look cluttered](#connections-look-cluttered)
* [Reserved keywords as regular keys](#reserved-keywords-as-regular-keys)
* [My diagram is breaking with HTML in Markdown](#my-diagram-is-breaking-with-html-in-markdown)
* [My SVG isn't interactive when I embed into HTML](#my-svg-isnt-interactive-when-i-embed-into-html)
* [Non-ASCII text breaks stuff](#non-ascii-text-breaks-stuff)

## It won't compile a specific label or value

It probably has some reserved characters, wrap it around `'` or `"`.

```d2
"x(int y)": "[]int"
'$dollarbills$'
```

## The text is rendered too wide/long

Add newlines.

```d2
x: When you go out to buy,\ndon't show your silver.
```

## Connections look cluttered

If you have a highly connected diagram with many connections on shapes with short labels,
you will get better results by manually settings widths and heights on them. By default,
D2 adds a minimal amount of padding to shapes past the label dimensions. When a shape has
many connections, increasing dimensions will give it more surface area for the connections
to route aesthetically to.

## Reserved keywords as regular keys

If you'd like to use a reserved keyword as a key, just quote it:

```d2
x: {
  "width": width
}
```

## My diagram is breaking with HTML in Markdown

Your HTML must be semantic to be parsed in SVG XML correctly, e.g. use `<br/>` instead of `<br>`.

## My SVG isn't interactive when I embed into HTML

There's a few different ways to embed SVG into HTML, each with tradeoffs. If you use plain
`<img>` tags, interactivity is blocked. Here are two good resources to learn more:

1. tldr:
   [https://docs.asciidoctor.org/asciidoc/latest/macros/image-svg/#options-for-svg-images](https://docs.asciidoctor.org/asciidoc/latest/macros/image-svg/#options-for-svg-images)
2. The official W3 spec:
   [https://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html#SVG_in_HTML](https://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html#SVG_in_HTML)

## Non-ASCII text breaks stuff

D2 works with any language, but sometimes non-ASCII characters look like reserved characters when they're not.

```d2
hello世界：مرحبا بالعال
```

The character `：` is not the same as the ASCII `:`, and so it won't register as a label. For foreign language diagrams, please take care to use the ASCII versions of special characters like `:`, `;`, `.`, among others.
