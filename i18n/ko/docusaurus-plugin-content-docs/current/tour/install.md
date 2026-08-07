---
pagination_next: tour/hello-world
---

# 설치하기

:::tip
[여기](https://github.com/d2lang/d2/blob/master/docs/INSTALL.md)에 Mac, Windows 및 Linux에서의 다양하고 자세한 설치 지침이 있습니다.
이 페이지는 그에 대한 요약 버전입니다.
:::

## 스크립트로 설치하기

권장되는 설치 방법은 설치 스크립트를 실행해 설치하는 것입니다.
이 스크립트는 당신의 기기에서 가장 적합한 설치 방법을 찾아낼 것입니다.
예를 들어 기기에 설치된 패키지 관리자를 통해 D2를 사용할 수 있는 경우, 해당 패키지 관리자를 사용합니다.

```shell
# With --dry-run the install script will print the commands it will use
# to install without actually installing so you know what it's going to do.
curl -fsSL https://d2lang.com/install.sh | sh -s -- --dry-run
# If things look good, install for real.
curl -fsSL https://d2lang.com/install.sh | sh -s --
```

지침에 안내된 내용을 따라주세요.
지침을 따라 설치를 완료했다면 `d2 version`을 실행하여 설치가 성공적이었는지 테스트해주세요.

제거를 원하는 경우:

```shell
curl -fsSL https://d2lang.com/install.sh | sh -s -- --uninstall
```

## 소스 파일로 설치하기

소스 파일로 설치할 수도 있습니다.

```shell
go install github.com/d2lang/d2@latest
```

:::info
[Github 릴리스 페이지](https://github.com/d2lang/d2/releases)에서 OS에 맞게 미리 컴파일된 바이너리 파일을 다운로드할 수도 있습니다.
:::

# 사용해보기

```shell
echo 'x -> y' > input.d2
d2 -w input.d2 out.svg
```

`input.d2`를 변경할 때마다 자동으로 새로고침되는 로컬 웹 브라우저가 실행되어야 합니다. 이제 가이드를 따라가면서 `input.d2`를 수정해보세요.
