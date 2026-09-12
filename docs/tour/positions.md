import CodeBlock from '@theme/CodeBlock';
import WebPImage from '@site/src/components/WebPImage';
import NearConstant from '@site/static/d2/near-constant.d2';
import NearContainer from '@site/static/d2/near-container.d2';
import NearExplanation from '@site/static/d2/near-explanation.d2';
import NearLabelIcon from '@site/static/d2/near-label-icon.d2';
import BorderLabel from '@site/static/d2/border-label.d2';
import TooltipNear from '@site/static/d2/tooltip-near.d2';

# Positions

In general, positioning is controlled entirely by the layout engine. It's one of the
primary benefits of text-to-diagram that you don't have to manually define all the
positions of objects.

However, there are occasions where you want to have some control over positions.
Currently, there are two ways to do that.

## Near

D2 allows you to position items on set points around your diagram.

:::info Possible values
`top-left`, `top-center`, `top-right`,

`center-left`, `center-right`,

`bottom-left`, `bottom-center`, `bottom-right`
:::

Let's explore some use cases:

### Giving your diagram a title

<CodeBlock className="language-d2">
    {NearConstant}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/near-constant.svg2')}}></div>

### Creating a legend

<CodeBlock className="language-d2">
    {NearContainer}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/near-container.svg2')}}></div>

### Longform description or explanation

<CodeBlock className="language-d2">
    {NearExplanation}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/near-explanation.svg2')}}></div>

## Label and icon positioning

The `near` can be nested to `label` and `icon` to specify their positions.

<CodeBlock className="language-d2">
    {NearLabelIcon}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/near-label-icon.svg2')}}></div>

### Outside and border

When positioning labels and icons, in addition to the values that `near` can take
elsewhere, an `outside-` prefix can be added to specify positioning outside the bounding
box of the shape.

`outside-top-left`, `outside-top-center`, `outside-top-right`,

`outside-left-center`, `outside-right-center`,

`outside-bottom-left`, `outside-bottom-center`, `outside-bottom-right`


Note that `outside-left-center` is a different order than `center-left`.

You can also add `border-x` prefix to specify the label being on the border.

<CodeBlock className="language-d2">
    {BorderLabel}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/border-label.svg2')}}></div>

## Tooltip near

Usually, `tooltip` is a on-hover effect. However, if you specify a `near` field, it will
permanently show.

<CodeBlock className="language-d2">
    {TooltipNear}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/tooltip-near.svg2')}}></div>

## Near objects

:::info
Works in TALA only. We are working on shims to make this possible in other layout engines.
:::

You can also set `near` to the absolute ID of another shape to hint to the layout engine
that they should be in the vicinity of one another.

```d2
vars: {
  d2-config: {
    layout-engine: tala
  }
}
aws: {
  load_balancer -> api
  api -> db
}
gcloud: {
  auth -> db
}

gcloud -> aws

explanation: |md
  # Why do we use AWS?
  - It has more uptime than GCloud
  - We have free credits
| {
  near: aws
}
```

Notice how the text is positioned near the `aws` node and not the `gcloud` node.

<WebPImage src={require('@site/static/img/screenshots/text-2.png').default} webpSrc={require('@site/static/img/screenshots/text-2.webp').default} alt="text near example" width={800}/>

## Top and left

On the TALA engine, you can also directly set the `top` and `left` values for objects, and
the layout engine will only move other objects around it. Both values must be set together.

For example, this locks `x` in place while TALA positions `y` around it:

```d2
x: {
  top: 100
  left: 100
}
x -> y
```

Run with TALA:

```shell
d2 --layout=tala input.d2 output.svg
```
