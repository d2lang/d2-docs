import CodeBlock from '@theme/CodeBlock';
import Grid from '@site/static/d2/grid.d2';
import Grid2 from '@site/static/d2/grid-2.d2';
import Grid3 from '@site/static/d2/grid-3.d2';
import Grid4 from '@site/static/d2/grid-4.d2';
import GridDimensions from '@site/static/d2/grid-dimensions.d2';
import GridFill from '@site/static/d2/grid-fill.d2';
import GridNestedGrid from '@site/static/d2/grid-nested-grid.d2';
import Table from '@site/static/d2/table.d2';

# 그리드 다이어그램

그리드 다이어그램을 사용하면 구조화된 그리드에 객체를 표시할 수 있습니다.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid.svg2')}}></div>

:::info
위 다이어그램의 소스코드는 페이지 하단에 있습니다.
:::

다음 두 개의 키워드만으로 이 모든 걸 할 수 있습니다.

- `grid-rows`
- `grid-columns`

`grid-rows`만 설정했을 경우:

```d2
grid-rows: 3
Executive
Legislative
Judicial
```

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-2.svg2')}}></div>

`grid-columns`만 설정했을 경우:

```d2
grid-columns: 3
Executive
Legislative
Judicial
```

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-3.svg2')}}></div>

`grid-rows`와 `grid-columns`를 동시에 설정했을 경우:

```d2
grid-rows: 2
grid-columns: 2
Executive
Legislative
Judicial
```

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-4.svg2')}}></div>

## 너비와 높이

독특한 구성을 원한다면 `width` 또는 `height`를 사용해 보세요.

```d2
grid-rows: 2
Executive
Legislative
Judicial
The American Government.width: 400
```

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-dimensions.svg2')}}></div>

각 행 내에서 객체가 어떤 식으로 균등하게 분포되는지 확인해 보세요.

## 셀 확장

행이나 열 중 하나에 대해서만 너비나 높이를 정의하면 해당 객체가 확장됩니다.

```d2
grid-rows: 3
Executive
Legislative
Judicial
The American Government.width: 400
Voters
Non-voters
```

`Voters`와 `Non-voters`가 공간을 어떻게 채우는지 확인해보세요.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-fill.svg2')}}></div>

## Dominant direction

행과 열을 모두 적용하면 먼저 정의된 방향을 기준으로 셀이 먼저 채워집니다.
이 방향을 "Dominant direction"이라 합니다.

예시:

```d2
grid-rows: 4
grid-columns: 2
```

`grid-rows`가 먼저 정의되므로 객체는 가로 방향으로 먼저 채워집니다.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-row-dominant.svg2')}}></div>

반대의 경우는 다음과 같습니다.

```d2
grid-columns: 2
grid-rows: 4
```

아래와 같이 다른 방향으로 채워질 것입니다.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-column-dominant.svg2')}}></div>

:::info
위의 애니메이션은 D2만으로 구현되었습니다.
즉, 그리드 다이어그램의 구성 과정을 애니메이션화 할 수 있습니다.
이 [코드](https://github.com/d2lang/d2-docs/blob/f5c762223ce192338d9d7865df3ca8533d683cdc/static/bespoke-d2/grid-row-dominant.d2)와 함께 `animate-interval` 플래그를 사용하세요.
이에 대한 자세한 내용은 뒤에 나오는 [composition](/tour/composition/) 섹션에서 확인하세요.
:::

## 그리드 간격 크기 조절

다음 3가지 키워드를 사용하여 그리드의 간격 크기를 제어할 수 있습니다.

- `vertical-gap`
- `horizontal-gap`
- `grid-gap`

`grid-gap` 설정은 `vertical-gap`과 ​​`horizontal-gap`을 동시에 설정하는 것과 같습니다.

`vertical-gap` 또는 `horizontal-gap`으로 `grid-gap`을 재정의할 수 있습니다.

특히 `grid-gap: 0`은 몇 가지 흥미로운 구성을 만들 수 있습니다.

### 이를 통해 다음과 같이 일본의 지도도 만들 수 있습니다.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/japan.svg2')}}></div>

> [소스 코드](https://github.com/d2lang/d2/blob/master/docs/examples/japan-grid/japan.d2)

### 또는 테이블형 데이터에도 저장 가능합니다.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/table.svg2')}}></div>

```d2
# 객체가 행 중심 순서로 작성되도록 지정됩니다.
grid-rows: 2
grid-columns: 4
grid-gap: 0

classes: {
  header: {
    style.underline: true
  }
}

Element.class: header
Atomic Number.class: header
Atomic Mass.class: header
Melting Point.class: header

Hydrogen
1
"1.008"
"-259.16"

Carbon
6
"12.011"
3500

Oxygen
8
"15.999"
"-218.79"
```

## 연결

D2의 일반 객체처럼 그리드와 다른 객체를 연결할 수 있습니다.
그리드 내의 객체에 대한 연결은 곧 제공될 예정입니다.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-connected.svg2')}}></div>

> [소스 코드](https://github.com/d2lang/d2-docs/blob/eda2d8739ce21c656e7608be48cb9067df36eb53/static/d2/grid-connected.d2)

## 중첩

D2의 현재 버전에서는 그리드 다이어그램 내에 또다른 그리드 다이어그램을 중첩할 수 있습니다.
다른 유형의 중첩도 곧 제공될 예정입니다.

```d2
grid-gap: 0
grid-columns: 1
header
body: "" {
  grid-gap: 0
  grid-columns: 2
  content
  sidebar
}
footer
```

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-nested-grid.svg2')}}></div>

## 소스 코드

다음은 이 페이지 상단의 이미지에 대한 소스 코드입니다.

```d2
grid-rows: 5
style.fill: black

classes: {
  white square: {
    label: ""
    width: 120
    style: {
      fill: white
      stroke: cornflowerblue
      stroke-width: 10
    }
  }
  block: {
    style: {
      text-transform: uppercase
      font-color: white
      fill: darkcyan
      stroke: black
    }
  }
}

flow1.class: white square
flow2.class: white square
flow3.class: white square
flow4.class: white square
flow5.class: white square
flow6.class: white square
flow7.class: white square
flow8.class: white square
flow9.class: white square

dagger engine: {
  width: 800
  class: block
  style: {
    fill: beige
    stroke: darkcyan
    font-color: blue
    stroke-width: 8
  }
}

any docker compatible runtime: {
  width: 800
  class: block
  style: {
    fill: lightcyan
    stroke: darkcyan
    font-color: black
    stroke-width: 8
  }
  icon: https://icons.d2lang.com/dev%2Fdocker.svg
}

any ci: {
  class: block
  style: {
    fill: gold
    stroke: maroon
    font-color: maroon
    stroke-width: 8
  }
}
windows.class: block
linux.class: block
macos.class: block
kubernetes.class: block
```
