---
layout: post
title: "[서버] 오토셋 (AutoSet) MySQL 서버 서비스 제어 실패 오류 해결방법"
date: 2018-08-24 01:40:48
image: 'https://yggdrasilstudio-cdn.sirv.com/lee_yunseok/2018/08/AutoSet_2018-08-24_19-41-48.webp'
description: '국산 웹 개발 환경 구축 프로그램 오토셋 오류 해결'
main-class: Info
color: '#FF8000'
tags:
- MySQL
- 서버
- 아파치
- 오류
- 오토셋
categories:
- Info
- Software
twitter_text: '국산 웹 개발 환경 구축 프로그램 오토셋 오류 해결'
introduction: '국산 웹 개발 환경 구축 프로그램 오토셋 오류 해결. MySQL 서버의 서비스(Autoset10_MySQL) 제어를 실패했습니다. 서버를 시작하지 못했습니다. 오토셋(AutoSet) 사용중 MySQL 시작을 눌렀을 때 위와 같은 오류가 발생할 때가 있다. 이럴 때는 설치 경로(AutoSet10\server\MyS...'
---

### 오토셋(AutoSet)이란?

> _AutoSet은 쉽고 빠르게 웹 개발 환경, 운영 환경을 구축하기 위해 만들어진 프로그램입니다. 개발/운영을 위한 웹 서버(Apache HTTP Server)와 PHP, MySQL, CUBRID 설치를 위해 투자하는 시간을 절약하실 수 있습니다. 신속하게 기반 시스템을 설치 할 수 있도록 패키지가 구성되어 있으며, 사용자가 선택적으로 필요한 요소를 설치할 수 있도록 제공하고 있습니다. 3분만 투자하세요. 그러면 초보도 내 컴퓨터에서 홈페이지를 만들고, 운영 할 수 있는 환경이 만들어 집니다.<br />[– AutoSet Developer Group](http://autoset.net/)_

오토셋은 쉬운 웹 개발 환경 구축에 종종 사용되는 한국어로 된 프로그램으로 주로 워드프레스(WordPress)나 익스프레스엔진(XpressEngine) 등의 CMS 기반 웹사이트 개발에 주로 쓰이곤 한다. 매우 간단하게 웹서버와 MySQL을 제어할 수 있게 해준다.
    
### MySQL 서버의 서비스 제어 실패 오류

![AutoSet MySQL 서버 서비스 제어 실패 오류 발생](https://yggdrasilstudio-cdn.sirv.com/lee_yunseok/2018/08/AutoSet_2018-08-24_19-41-48.webp)

> _MySQL 서버의 서비스(Autoset10_MySQL) 제어를 실패했습니다. 서버를 시작하지 못했습니다.<br />- 프로그램 오류 메시지_

오토셋(AutoSet) 사용중 MySQL 시작을 눌렀을 때 위와 같은 오류가 발생할 때가 있다. 이럴 때는 설치 경로(AutoSet10\server\MySQL5\)에서 my.ini 파일을 수정해야 한다. my.ini 파일을 텍스트 편집기로 열어 맨 아래 줄 아래에 다음 명령줄을 추가한다. 10.7.0 버전을 기준으로 서른여섯 번째 줄에 입력하게 될 것이다.
    
{% highlight  bash %}
innodb_force_recovery=1
{% endhighlight %}
    
파일을 저장한 후 MySQL 시작을 눌러 작동하는지 확인한다. 확인이 완료된 후 my.ini 파일에서 조금 전에 추가한 명령줄의 숫자값을 0으로 수정하고 저장한다.
        
{% highlight  bash %}
innodb_force_recovery=0
{% endhighlight %}

쉽게 설명하기 위해 갈무리(스크린샷)를 몇 장 준비했으므로 만약 위 과정의 이해가 잘 안 되는 경우에는 아래를 참고하면 된다.
    
![Autoset my.ini 파일 텍스트 에디터로 수정](https://yggdrasilstudio-cdn.sirv.com/lee_yunseok/2018/08/notepad_2018-08-24_19-43-14.webp)

![정상적으로 작동하는 Autoset﻿](https://yggdrasilstudio-cdn.sirv.com/lee_yunseok/2018/08/AutoSet_2018-08-24_19-44-14.webp)

![AutoSet MySQL 서버 정상 작동 확인후 my.ini 파일을 수정](https://yggdrasilstudio-cdn.sirv.com/lee_yunseok/2018/08/notepad_2018-08-24_19-44-31.webp)

### my.ini 파일을 찾기 어려울 때

MySQL 서버의 서비스 제어 실패 오류 발생시 수정해야 할 my.ini 파일이 어디에 있는지 찾기 어려운 사람이 분명 있을 거라 생각하기 때문에 아래에 찾는 순서를 적어둔다. 혹시라도 파일을 못 찾겠다면 아래를 참고하도록 하자.
    
1. 프로그램의 메뉴에서 제어 > 홈 디렉토리 열기
2. 파일 탐색기가 열리면 한 단계 위로 이동
3. server > MySQL5 폴더로 이동
4. my.ini 파일을 텍스트 에디터로 열고 수정 및 저장
5. 프로그램에서 MySQL 시작을 누르고 결과확인
6. my.ini 파일 재수정 및 저장