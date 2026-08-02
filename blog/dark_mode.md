---
date: 2023-03-04
title: Dark-mode responsive diagrams
description: How diagrams in D2 are responsive to dark mode
slug: dark-mode
tags: [dark mode, show-and-tell]
image: https://raw.githubusercontent.com/d2lang/d2-docs/master/static/img/blog/dark_mode.png
hide_table_of_contents: false
---
import WebPImage from '@site/src/components/WebPImage';

I want to briefly highlight a cool new feature in D2, which is that you can set both a
light theme *and* a dark theme for diagrams in D2.

```
d2 --theme=0 --dark-theme=200 input.d2
```

How does this work? How can a diagram have two themes?

<!-- truncate -->

Try opening up your system preferences and toggling between light and dark mode.

<div dangerouslySetInnerHTML={{__html: require('@site/static/blog/dark_mode/main.svg2')}}></div>


> [Playground link to modify diagram](https://play.d2lang.com/?script=jFRNj9MwEL3Pr3h0D4C0CWWPFqyQQEJcuBRx2ovrTJuwrh153C0r2v-Oxk6_BBJcImfy5uu9F5cqrRJpkJMNMtrEIdNJC4Mu7gLREMZtNth3dwTc4NMdxKVhzAT07H1Ec49dTL6j_QTWiIubcfCsx7j8wS4L0XQw-EWA20qOG9SN6EDkVR7knjcli3-OMWVO7cfFAmsOnGyOiTqbHv8JomP8fKpNEysH-iacwdb1UAYegnUupm4Ia-SIYiC4WN41DSjiGsQn6wk4EAFXLc1_4go1Irq_iMG-noEiRPP17bEOUJWZ3czn81kJlWLAhw13g8WrMfGKk1S3N-KUEgOl5_Wpxp9Vz3VXq9VsCh7o-NxfcKSjytOaoE-DfZ83vgDfqUHgvBV5P5s6zNC2Ld7cV8CLpsGX1SQ8eitXat-iaS6AJYZd3PoOS4YdRx2gO4P-1m6avOTWqEHi7jSG7jItXf97g7v5vEhyOBmxvfLglZ90cVp8_6x0caVvkna0a9Yal1BNPYLPH5zI1QeSbPPgDL71gxzJ6SJLeJnhehvWXK13-xCW7OxWGEOlTxfU4cq15Z-Le8tMFz9xHwM_d7w7h0-XocHSW_dIB_odAAD__w%3D%3D&layout=elk&)

> Note: playground does not have support to set a dark theme yet


What you should have seen is the above diagram adapting to your preference. If you didn't
want to follow along, here's two PNGs of what it would've transitioned between:

<WebPImage src={require('@site/static/blog/dark_mode/permalight.png').default} webpSrc={require('@site/static/blog/dark_mode/permalight.webp').default} alt="d2 cheat sheet" style={{width:'50%'}}/>
<WebPImage src={require('@site/static/blog/dark_mode/permadark.png').default} webpSrc={require('@site/static/blog/dark_mode/permadark.webp').default} alt="d2 cheat sheet" style={{width:'50%'}}/>

This means that if your website already supports a responsive experience for visitors that
prefer light mode and dark mode, it takes zero extra work to include a D2 diagram that'll
adapt to light preferences. The alternative method used across the web currently is to
include two diagrams -- and toggle which one gets shown with media queries.

This is currently a new feature, and we are working on adding more themes and considering
including it by default.

How does this work? The diagram actually is a high level overview of it. All the shapes
and connections are color coded, which takes into account their depth, shape type, and a
few other factors. The themes then provide a color for that color code in CSS. Since
classes are secondary to attributes and styles, any explicitly set styles are not
overwritten. The dark mode theme simply applies a different set of colors to the color
codes with a media query.

Shoutout to first-time contributor
[https://github.com/vfosnar](https://github.com/vfosnar), who came up with the idea and
juggled commits in between high school exams to implement this &lt;3.
