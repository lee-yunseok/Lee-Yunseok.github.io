---
layout: post
title: "[워드프레스] 구텐베르그 (Gutenberg) 3.7.0과 Yoast SEO 충돌 문제"
date: 2018-09-02 06:13:26
image: https://yggdrasilstudio-cdn.sirv.com/lee_yunseok/2018/09/wordpress_gutenberg_editor_crash_with_yoast_seo.webp
description: '구텐베르그 3.7.0 버전 업데이트로 인한 에디터 사용불가 문제 해결방법'
main-class: Info
color: '#FF8000'
tags:
- SEO
- 구텐베르그
- 오류
- 워드프레스
- 웹개발
categories:
- Info
- Open Source
twitter_text: '구텐베르그 3.7.0 버전 업데이트로 인한 에디터 사용불가 문제 해결방법'
introduction: '워드프레스의 에디터 플러그인 구텐베르그. 3.7.0 업데이트 이후 Yoase SEO 8.1과 충돌해 구글의 크롬 브라우저에서 getCollectionByRoute TypeError가 발생했다...'
---

### 구텐베르그, Yoast SEO와의 충돌로 사용불가

2018년 9월 2일 새벽 워드프레스의 에디터 플러그인 **구텐베르그가 3.7.0 업데이트 이후 Yoase SEO 8.1과 충돌**해 구글의 크롬 브라우저에서 getCollectionByRoute TypeError가 발생했다.  
    
TypeError: Cannot read property 'getCollectionByRoute' of undefined 메시지를 화면에 출력하며 **에디터 자체를 사용할 수 없게 되는 문제**로, 주인장의 경우 새 글을 추가하거나 저장된 글을 편집하려고 하면 위 오류 메시지가 출력됐다.
        
무슨 일인지 알아보기 위해 [Yoast.com의 깃허브(GitHub)](https://github.com/Yoast/wordpress-seo/issues/10867)를 방문해 이슈를 둘러봤고 아주 쉽게 동일한 케이스를 찾을 수 있었다.
            
또한, Yoast.com의 엔지니어 알렉산더 보테람(Alexander Botteram)이 **Yoast SEO의 다음 릴리즈까지 임시로 문제를 해결할 수 있는 파일을 공유**하고 있는 것을 확인했다.
                
![﻿Crash the Wordpress Gutenberg Editor with Yoast Seo](https://yggdrasilstudio-cdn.sirv.com/lee_yunseok/2018/09/wordpress_gutenberg_editor_crash_with_yoast_seo.webp)

[여기](https://github.com/Yoast/wordpress-seo/issues/10867#issuecomment-417696845)를 누르거나 위 스크린샷, 또는 캡션을 누르면 해당 코멘트가 새 창으로 연결되며, 파란색으로 쓰여진 **enqueue-wp-api.zip**을 눌러 파일을 내려받아 **워드프레스의 플러그인으로 추가**하면 에디터 사용불가 문제가 해결된다.
    
위 방법은 임시방편으로 Yoast SEO의 다음 릴리즈에서는 필요가 없어지므로 플러그인으로 설치한 파일을 제거해야 함을 기억해야 한다.