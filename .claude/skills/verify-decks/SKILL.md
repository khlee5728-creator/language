---
name: verify-decks
description: 강의 슬라이드 덱(slides/week*.html)의 표준 검증 스위트를 실행한다. 덱을 수정·신설했을 때, 배포(푸시) 전, 또는 사용자가 "덱 검증"·"슬라이드 검사"를 요청할 때 사용. 세로/가로 오버플로우·MCQ 해설·영상 로드·큐·TED 임베드를 일괄 점검하고 표 형식으로 보고한다.
---

# verify-decks — 덱 일괄 검증

수정된 덱(인자로 특정 주차를 받으면 그 덱만, 없으면 변경된 덱 전부 또는 전체 13덱)을
브라우저에서 열어 아래 항목을 검사하고, 실패 항목은 수정 후 재검증하여 **전부 통과 상태로 보고를 끝낸다**.

## 절차

1. **서버**: `preview_start`의 `{name: "English Linguistics"}` (launch.json, 포트 8130).
   이미 떠 있으면 재사용. Bash로 서버를 띄우지 말 것.
2. **캐시**: 커스텀 CSS/JS를 수정한 경우 덱의 `?v=N` 버전이 올라갔는지 먼저 확인.
   덱 URL에도 `?t=임의값`을 붙여 HTML 캐시를 우회한다.
3. **덱마다** `navigate` → 2.5s 대기 → 아래 스캔 JS 실행 (Reveal 로드 확인 포함).

## 스캔 JS (표준형 — 백그라운드 탭 스로틀링 대비 동기 루프)

```js
(() => {
  const secs=[...document.querySelectorAll('.reveal .slides > section')];
  const stage=document.querySelector('.reveal .slides').clientHeight;      // 700
  const sr=document.querySelector('.slides').getBoundingClientRect().right;
  const oV=[],oH=[]; let media={video:0,cues:0,ted:0,tedlink:0};
  for(let i=0;i<secs.length;i++){
    const s=secs[i];
    s.querySelectorAll('.mcq-explain').forEach(e=>e.classList.add('show')); // 해설 열린 상태 포함
    if(s.scrollHeight>stage) oV.push(i+1);
    s.querySelectorAll('.mcq-explain').forEach(e=>e.classList.remove('show'));
    if([...s.querySelectorAll('p,div,ul,ol,h2,table')].some(el=>el.getBoundingClientRect().right>sr+3)) oH.push(i+1);
    media.video+=s.querySelectorAll('.video-scene video').length;
    media.cues+=s.querySelectorAll('.cue').length;
    media.ted+=s.querySelectorAll('iframe[src*="embed.ted.com"]').length;
    media.tedlink+=s.querySelectorAll('a[href*="ed.ted.com"]').length;
  }
  return JSON.stringify({total:secs.length,oV,oH,media});
})()
```

주의: `getBoundingClientRect` 가로 검사는 현재 슬라이드가 아닌 섹션에서는 Reveal 변환의 영향을
받을 수 있다. 가로 이상이 의심되면 해당 슬라이드만 `Reveal.slide(i)` 후 재측정로 확정한다.
비동기 순회(`await setTimeout`)는 백그라운드 탭에서 1s+ 스로틀링되어 타임아웃되므로 쓰지 않는다.

## 영상 검사 (video-scene이 있는 덱)

해당 슬라이드에서:
```js
// metadata 로드 + 길이 (preload=metadata는 loadeddata를 쏘지 않음)
await new Promise(res=>{ if(v.readyState>=1) return res(v.duration);
  v.addEventListener('loadedmetadata',()=>res(v.duration),{once:true}); v.load(); setTimeout(()=>res(-1),4000); });
```
- duration이 기대값(파일 실측)과 일치하는지, `.cue.sub`/`.cue.think` 개수가 맞는지 확인.
- python 서버는 Range 미지원이라 **시킹 불가** — 큐 타이밍 확인이 필요하면 muted 실재생으로.

## 통과 기준

| 항목 | 기준 |
|---|---|
| 세로 오버플로우 | 0건 (MCQ 해설 열림 포함, scrollHeight ≤ 700) |
| 가로 넘침 | 0건 (stage 우측 경계 +3px 초과 요소 없음) |
| 영상 | metadata 로드 성공, duration 일치, 큐 존재 |
| TED | 임베드 iframe 존재(해당 덱), 링크 슬라이드는 a[href] 존재 |

## 보고 형식

덱별 한 줄 표: `덱 | 슬라이드 수 | 오버플로우 | 미디어(영상/큐/TED) | 판정`.
실패가 있었으면 원인과 수정 내용을 함께 기록. 수정한 경우 재스캔 결과가 최종 판정이다.
