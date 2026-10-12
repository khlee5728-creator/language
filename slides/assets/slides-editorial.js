/**
 * slides-editorial.js — 에디토리얼 공통 장식 주입 + 휴대폰 가로 전체화면 버튼 (v3)
 * 각 <section>에 레일·세로 러닝헤드·킥커·쪽번호를 자동 삽입한다.
 *  - <body data-rail="WEEK 2 · WHAT IS LANGUAGE?" data-course="Topics in English Linguistics">
 *  - <section data-kicker="2.2 — ARBITRARINESS"> → 상단 킥커
 *  - <section data-no-rail> → 레일 생략(표지 등)
 */
(function () {
  'use strict';
  var body = document.body;
  var railText = body.getAttribute('data-rail') || '';
  var secs = document.querySelectorAll('.reveal .slides > section');
  var total = secs.length;

  secs.forEach(function (sec, i) {
    if (!sec.hasAttribute('data-no-rail')) {
      var rail = document.createElement('div');
      rail.className = 'ed-rail';
      sec.appendChild(rail);
      if (railText) {
        var rt = document.createElement('div');
        rt.className = 'ed-railtxt';
        rt.textContent = railText;
        sec.appendChild(rt);
      }
    }
    var kick = sec.getAttribute('data-kicker');
    if (kick) {
      var k = document.createElement('div');
      k.className = 'ed-kicker';
      k.textContent = kick;
      sec.insertBefore(k, sec.firstChild);
    }
    var pn = document.createElement('div');
    pn.className = 'ed-pagenum';
    pn.textContent = (i + 1) + ' / ' + total;
    sec.appendChild(pn);
  });
})();

/* v3 · 가로 전체화면 버튼: 터치 기기 + 세로 + 폭 600px 미만(휴대폰 세로)에서만 표시.
   전체화면 진입 후 가로로 고정하므로 휴대폰의 회전 잠금이 켜져 있어도 동작한다.
   전체화면·방향 고정을 지원하지 않는 브라우저(아이폰 Safari 등)에서는 버튼을 만들지 않는다. */
(function () {
  'use strict';
  var de = document.documentElement;
  var ori = window.screen && screen.orientation;
  if (!de.requestFullscreen || !ori || typeof ori.lock !== 'function') return;
  var mq = window.matchMedia('(pointer: coarse) and (orientation: portrait) and (max-width: 599px)');

  var st = document.createElement('style');
  st.textContent = '.land-btn{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:9999;' +
    'display:none;align-items:center;font:600 11px "Space Grotesk","Noto Sans KR",sans-serif;letter-spacing:.12em;' +
    'background:var(--ed-paper,#f8f6f0);color:var(--ed-ink,#1c1a17);border:1px solid var(--ed-ink,#1c1a17);' +
    'border-radius:0;padding:8px 16px;cursor:pointer}' +
    '@media print{.land-btn{display:none!important}}';
  document.head.appendChild(st);

  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'land-btn';
  b.textContent = '가로 전체화면';
  b.title = '가로 전체화면으로 보기 (뒤로 가기로 종료)';
  b.addEventListener('click', function () {
    de.requestFullscreen({ navigationUI: 'hide' })
      .then(function () { return ori.lock('landscape'); })
      .catch(function () {});
  });

  function sync() { b.style.display = (mq.matches && !document.fullscreenElement) ? 'inline-flex' : 'none'; }
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) { try { ori.unlock(); } catch (e) {} }
    sync();
  });
  if (mq.addEventListener) mq.addEventListener('change', sync); else mq.addListener(sync);
  document.body.appendChild(b);
  sync();
})();
