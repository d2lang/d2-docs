# Fonts

D2 uses 4 font families:

- [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro) for the majority of
  text, including labels, Markdown, etc.
- [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro) for code blocks and
  text in Class shape.
- A blend of [Architect's Daughter](https://fonts.google.com/specimen/Architects+Daughter)
  and [Fuzzy Bubbles](https://fonts.google.com/specimen/Fuzzy+Bubbles) for `sketch` mode
  text.

Currently on the CLI, you can customize fonts by replacing Source Sans Pro with your own
TTF files through the following flags:

- `--font-regular`
- `--font-italic`
- `--font-bold`
- `--font-semibold`

These should point to a `.ttf` file, for example:

```shell
d2 --font-regular=./helvetica-regular.ttf input.d2
```

It's advisable to supply either none or all of the fonts, for consistency. If you supply
one but not all of the fonts, it will fall back to Source Sans Pro for the missing styles.
For example, if you give a `--font-regular`, `--font-bold`, and `--font-semibold`, then the
italic will remain as Source Sans Pro Italic.

## Mono fonts

If you'd like to customize the mono fonts:

- `--font-mono`
- `--font-mono-italic`
- `--font-mono-bold`
- `--font-mono-semibold`

## Sketch font

In sketch mode, if you supply a font, it will replace the default hand-drawn font family
instead of Source Sans Pro.
