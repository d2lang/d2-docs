import AnnotationExample from '@site/src/components/AnnotationExample';

# Annotations

:::warning
Annotations are in alpha and may change. If you have feedback, [open a GitHub issue](https://github.com/d2lang/d2/issues/new).
:::

An `annotation` draws a pen mark and a note over a shape or a connection. It never
changes the layout. With [animation](./animation.md), marks are drawn and erased
as [steps](./steps.md) change.

<AnnotationExample name="quorum" width={738} height={508} alt="A write reaches a primary database and is copied to two replicas. Pen marks and captions follow the story: a highlight, two traces, an arrow to the slow replica, a loop round the two copies that have the write, and a cross on the slow connection." />

## Syntax

```d2-incomplete
api.annotation: p99 is 900 ms {
  shape: circle
  near: top-center
  style.stroke: "#E8590C"
  style.font-color: black
}
```

The value is the note, in [Markdown](./text.md). Every key inside is optional.

## Marks

`shape` picks the mark. Without it, D2 picks one that suits the target.

### Circle

The default for a shape.

<AnnotationExample name="circle" width={236} height={134} alt="A hand-drawn ring round a shape, with a note beside it." open />

### Box

<AnnotationExample name="box" width={263} height={119} alt="A hand-drawn frame round a shape, with a note beside it." open />

### Underline

The default for [`shape: text`](./text.md). On other shapes it goes under the label.

<AnnotationExample name="underline" width={270} height={121} alt="A scribbled underline beneath a line of text, with a note below it, and another beneath the label inside a shape." open />

### Brace

The default for a [container](./containers.md).

<AnnotationExample name="brace" width={351} height={263} alt="A curly brace under a container, with a note at its point." open />

### Cross

<AnnotationExample name="cross" width={205} height={119} alt="Two strokes cross out a shape and run past its corners." open />

### Highlight

<AnnotationExample name="highlight" width={224} height={152} alt="A yellow highlighter stroke over a shape's label, with a note beside the shape." open />

### Arrow

The note goes where there is room. An arrow joins it to the target.

<AnnotationExample name="arrow" width={290} height={167} alt="A note stands off from a shape, and a hand-drawn arrow points from the note to the shape." open />

### Lasso

One loop round every shape that a [class](./classes.md) or a [glob](./globs.md) gives it to.

<AnnotationExample name="lasso" width={796} height={291} alt="One hand-drawn loop holds three of five shapes. It bends inward to leave out a shape that is not in the class." open />

## Connections

A connection takes `trace`, `cross`, `highlight` or `arrow`. `trace` is the default.
`highlight` runs over the connection's label.

<AnnotationExample name="connections" width={403} height={478} alt="Four connections. One is traced with a translucent stroke, one is crossed out, one has its label highlighted, and one has an arrow pointing at it." open />

## Notes

### Markdown

<AnnotationExample name="markdown" width={297} height={134} alt="A note with bold text and inline code beside a ringed shape." open />

### Position

`near` takes `top-center`, `bottom-center`, `center-left` or `center-right`.
Without it, the note goes where it covers the least.

<AnnotationExample name="near" width={904} height={203} alt="Four ringed shapes, each with its note on a different side: left, above, below and right." open />

### No note

<AnnotationExample name="bare" width={119} height={119} alt="A frame drawn round a shape, with no note." open />

## Color

`style.stroke` is the pen. `style.font-color` colors the note alone.

<AnnotationExample name="color" width={459} height={160} alt="A purple ring, a green frame with a green note, and a blue trace with a black note." open />

## Captions

An `annotation` on the board is its caption. A link to a shape marks that shape.
Put a key that has a space in it in angle brackets: `[the balancer](<load balancer>)`.

<AnnotationExample name="caption" width={560} height={327} alt="A caption under a diagram. The three shapes it names are set in bold in the sentence and ringed in the diagram." open />

## Globs

A [glob](./globs.md) with a filter marks every shape that matches.

<AnnotationExample name="glob" width={389} height={454} alt="Two cylinders are each ringed and noted as stateful. The other shapes are not marked." open />

## Steps

An annotation lasts for one board. A [step](./steps.md) inherits shapes and
connections, not annotations. One that a class or a glob gives a shape holds on
every board.

<AnnotationExample name="steps" width={621} height={170} alt="Three boards in turn. Each has one mark and one note, on a different shape each time." open />

## Animation

With [`animate-duration`](./animation.md#configuration), a step's marks are drawn
and the previous step's are erased. Each step is held long enough to read its text.

<AnnotationExample name="binary-search" width={744} height={228} alt="A binary search over ten sorted numbers. A yellow pen rings each middle element in turn and the half that is ruled out dims, until the answer is boxed." />

## Sketch

<AnnotationExample name="sketch" width={714} height={432} alt="A sketch-mode diagram of DNS resolution with a box round the resolver, a note, and three crossed-out connections above a caption." />
