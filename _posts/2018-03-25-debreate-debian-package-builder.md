---
layout: post-work
title: "데브리에이트 (Debreate) - 데비안 패키지 빌더 (Debian Package Builder)"
date: 2018-03-25 21:07:00
image: https://yggdrasilstudio-cdn.sirv.com/lee_yunseok/2018/09/debreate_website.webp
description: '데비안 패키지 빌더'
main-class: Works
color: '#7A417A'
categories:
- Works
- Participative
twitter_text: '데비안 패키지 빌더'
introduction: '데브리에이트 (Debreate). 데브리에이트는 설치 가능한 데비안 패키지 (.deb)를 만드는 데 도움이 되는 유틸리티입니다. 프로젝트의 목표는 응용 프로그램, 아트웍, 미디어, 테마 등을 사용하기 쉬운 인터페이스로 패키징하는 데비안 기반의 리눅스(Linux) 배포판을...'
---

Official Website |Contributions
------------ |------------ 
[<i class="fab fa-github"></i> Debreate](https://antumdeluge.github.io/debreate-web/) |[<i class="fas fa-language"></i> 한국어 번역](https://github.com/AntumDeluge/debreate/pull/22)

#### 데브리에이트 (Debreate)
데브리에이트는 설치 가능한 [데비안 패키지 (.deb)](https://en.wikipedia.org/wiki/Deb_(file_format))를 만드는 데 도움이 되는 유틸리티입니다.

<iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/kx4D5eL6HKE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

프로젝트의 목표는 응용 프로그램, 아트웍, 미디어, 테마 등을 사용하기 쉬운 인터페이스로 패키징하는 데비안 기반의 리눅스(Linux) 배포판을 더욱 매력적으로 개발하는 것입니다.

현재는 스크립트 응용 프로그램이나 미디어와 같이 소스에서 컴파일 할 필요가 없는 패키지를 패키징 할 수있는 "바이너리" 패키징만 지원합니다. 그런 다음 이 패키지를 개인 배포용으로 사용할 수 있습니다.

[dh_make](http://packages.ubuntu.com/dh-make) & debuild ([devscripts](http://packages.ubuntu.com/devscripts) 패키지에서 사용 가능)와 같은 백엔드를 사용하여 소스 패키지를 작성하는 방법이 있습니다. 그러나 소스 패키징은 상당히 다를 수 있으며 패키지를 배포판의 공식 저장소 또는 [Launchpad](https://launchpad.net/) [PPA (Personal Package Archive)](https://en.wikipedia.org/wiki/Personal_Package_Archive)에 넣으려는 경우 필수입니다.