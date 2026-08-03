---
sidebar_label: 아이콘, 이미지
---

import CodeBlock from '@theme/CodeBlock';
import Icons1 from '@site/static/d2/icons-1.d2';
import IconPlacement from '@site/static/d2/icon-placement.d2';
import IconsImage from '@site/static/d2/icons-image.d2';

# 아이콘

:::tip
저희는 여러분들이 이 언어를 좀 더 쉽게 시작할 수 있도록 소프트웨어 아키텍처 다이어그램에서 흔히 볼 수 있는 아이콘 모음을 무료로 호스팅하고 있습니다: [https://icons.d2lang.com](https://icons.d2lang.com).
:::

아이콘과 이미지는 개발 시 작성하는 다이어그램의 필수 요소입니다.

값으로 어떤 URL이든 쓸 수 있습니다.

```d2
my network: {
  icon: https://icons.d2lang.com/infra/019-network.svg
}
```

<div style={{width: "200px", margin: "0 auto 20px auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/icons-1.svg2')}}></div>

:::info
연결에 적용 가능한 아이콘이 곧 개발 될 예정입니다.
:::

:::info
D2 CLI를 로컬에서 사용하시나요? `icon: ./my_cat.png`와 같이 로컬 이미지를 지정해 가져올 수 있습니다.
:::

아이콘은 자동으로 배치됩니다.
레이아웃 엔진에 따라 고려 사항이 다르지만 일반적으로 레이블 존재 여부, 컨테이너인지 여부 등이 아이콘의 배치를 방해하지 않도록 합니다.
다음 다이어그램에서 왼쪽 상단의 컨테이너 아이콘과 중앙에 컨테이너가 아닌 아이콘이 어떻게 배치되는지 확인해보세요.

```d2
vpc: VPC 1 10.1.0.0./16 {
  icon: https://icons.d2lang.com/aws%2F_Group%20Icons%2FVirtual-private-cloud-VPC_light-bg.svg

  style: {
    stroke: green
    font-color: green
    fill: white
  }

  az: Availability Zone A {
    style: {
      stroke: blue
      font-color: blue
      stroke-dash: 3
      fill: white
    }

    firewall: Firewall Subnet A {
      icon: https://icons.d2lang.com/aws%2FNetworking%20&%20Content%20Delivery%2FAmazon-Route-53_Hosted-Zone_light-bg.svg

      style: {
        stroke: purple
        font-color: purple
        fill: "#e1d5e7"
      }

      ec2: EC2 Instance {
        icon: https://icons.d2lang.com/aws%2FCompute%2F_Instance%2FAmazon-EC2_C4-Instance_light-bg.svg
      }
    }
  }
}
```

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/icon-placement.svg2')}}></div>

:::info
아이콘은 뒤에 소개될 [`near` 키워드](/tour/positions/)로 배치할 수 있습니다.
:::

## `shape: image`을 추가해 독립형 아이콘 만들기

```d2
server: {
  shape: image
  icon: https://icons.d2lang.com/tech/022-server.svg
}

github: {
  shape: image
  icon: https://icons.d2lang.com/dev/github.svg
}

server -> github
```

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/icons-image.svg2')}}></div>
