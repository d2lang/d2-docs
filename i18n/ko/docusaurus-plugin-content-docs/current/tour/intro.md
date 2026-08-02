---
sidebar_label: D2란?
pagination_next: tour/experience
---

import CodeBlock from '@theme/CodeBlock';
import Example from '@site/static/bespoke-d2/terminal-theme.d2';

# D2 둘러보기

**D2**는 텍스트를 다이어그램으로 변환하는 다이어그램 스크립트 언어입니다.
"D2"라는 이름은 **Declarative Diagramming(선언형 다이어그램)**의 약자입니다.
"Declarative(선언형)"라는 단어에서 알 수 있듯이, D2에서 다이어그램으로 표시하려는 내용을 작성하면, 그에 맞는 이미지를 생성합니다.

예를 들어, CLI를 다운로드 받아 `input.d2`란 이름의 파일을 만들고, 다음 실행문을 복사하여 실행하면 아래의 이미지를 얻을 수 있습니다.

```sh
d2 --theme=300 --dark-theme=200 -l elk --pad 0 ./input.d2
```

<div style={{width: "100%"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/terminal-theme.svg2')}}></div>

```d2
network: {
  cell tower: {
    satellites: {
      shape: stored_data
      style.multiple: true
    }

    transmitter

    satellites -> transmitter: send
    satellites -> transmitter: send
    satellites -> transmitter: send
  }

  online portal: {
    ui: {shape: hexagon}
  }

  data processor: {
    storage: {
      shape: cylinder
      style.multiple: true
    }
  }

  cell tower.transmitter -> data processor.storage: phone logs
}

user: {
  shape: person
  width: 130
}

user -> network.cell tower: make call
user -> network.online portal.ui: access {
  style.stroke-dash: 3
}

api server -> network.online portal.ui: display
api server -> logs: persist
logs: {shape: page; style.multiple: true}

network.data processor -> api server
```

## CLI 감시 모드

<img className="screenCap" width="100%" src={require('@site/static/img/screenshots/cli.gif').default}
alt="D2 CLI"/>

D2의 사용법을 알아보는 이 과정은 약 5~10분 안에 끝낼 수 있으며, 마지막 부분에는 참고를 위한 치트 시트를 다운로드 받을 수 있습니다.
기본적인 것만 원하는 경우 <a href="/tour/hello-world/">시작하기</a> 챕터를 참고하세요. 2분 정도 소요됩니다.

:::info
D2의 소스 코드는 다음에서 호스팅됩니다.
[https://github.com/d2lang/d2](https://github.com/d2lang/d2).

이 문서의 소스 코드는 다음과 같습니다.
[https://github.com/d2lang/d2-docs](https://github.com/d2lang/d2-docs).
:::
