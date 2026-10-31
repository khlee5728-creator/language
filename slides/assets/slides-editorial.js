/**
 * slides-editorial.js — 에디토리얼 공통 장식 주입 + 휴대폰 가로 전체화면 버튼 + 섹션 위계 표시 (v6)
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

/* v5 · 섹션 위계 표시(번호 없음). 표시가 있는 덱에서만 동작한다.
   - 내용 슬라이드 킥커는 쪽수만(CH.n P.x), <section data-path="Pragmatics › Implicature">의 상위 섹션 경로를
     킥커 같은 줄에 교재 제목 그대로 이어 붙인다(슬라이드 높이 변화 없음). 킥커가 없으면 제목 위에 둔다.
     경로가 길어 두 줄이 되면 맨 위 섹션부터 '…'로 접는다(전체 경로는 마우스를 올리면 보임).
   - 목차 <ol class="recap tight outline"> + <li class="lv2|lv3"> → 하위 섹션을 들여 쓰고 순번은 숨김 */
(function () {
  'use strict';
  var st = document.createElement('style');
  st.textContent =
    '.ed-path{font:italic 400 17px/1.3 "Lora",serif;color:var(--ed-muted,#8d8574);margin:-6px 0 6px}' +
    '.ed-kicker .ed-path{display:inline;margin:0 0 0 16px;font:italic 400 15.5px/1 "Lora",serif;letter-spacing:0;text-transform:none}' +
    '.ed-path .sep{font-style:normal;margin:0 .45em;opacity:.7}' +
    '.recap.outline li{padding-left:0;counter-increment:none}' +
    '.recap.outline li::before{content:none}' +
    '.recap.outline li.lv2{padding-left:30px;font-size:17.5px}' +
    '.recap.outline li.lv3{padding-left:60px;font-size:16.5px}' +
    '.recap.outline li.lv2 b,.recap.outline li.lv3 b{font-weight:400}';
  document.head.appendChild(st);
  document.querySelectorAll('.reveal .slides > section[data-path]').forEach(function (sec) {
    var h2 = sec.querySelector('h2');
    var parts = sec.getAttribute('data-path').split('›').map(function (s) { return s.trim(); }).filter(Boolean);
    if (!h2 || !parts.length) return;
    var kicker = sec.querySelector('.ed-kicker');
    var d = document.createElement(kicker ? 'span' : 'div');
    d.className = 'ed-path';
    parts.forEach(function (p, k) {
      if (k) { var s = document.createElement('span'); s.className = 'sep'; s.textContent = '›'; d.appendChild(s); }
      d.appendChild(document.createTextNode(p));
    });
    if (kicker) { kicker.appendChild(d); d.title = parts.join(' › '); } else h2.parentNode.insertBefore(d, h2);
  });
  // 킥커 줄이 두 줄로 넘치면 맨 위 상위 섹션부터 '…'로 접는다(보이는 슬라이드에서만 잴 수 있음)
  function fit(sec) {
    var p = sec && sec.querySelector('.ed-kicker .ed-path');
    if (!p || p.getAttribute('data-fit') || !p.getClientRects().length) return;
    while (p.getClientRects().length > 1 && p.querySelectorAll('.sep').length > 1) {
      var first = p.firstChild;
      if (first.nodeType === 3 && first.nodeValue === '…') { p.removeChild(first); p.removeChild(p.firstChild); }
      p.removeChild(p.firstChild); p.removeChild(p.firstChild);
      var s = document.createElement('span'); s.className = 'sep'; s.textContent = '›';
      p.insertBefore(s, p.firstChild); p.insertBefore(document.createTextNode('…'), s);
    }
    p.setAttribute('data-fit', '1');
  }
  if (window.Reveal && Reveal.on) {
    var run = function () {
      var go = function () {
        fit(Reveal.getCurrentSlide());
        if (Reveal.isPrintView && Reveal.isPrintView()) document.querySelectorAll('.reveal .slides section').forEach(fit);
      };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
    };
    Reveal.on('ready', run); Reveal.on('slidechanged', run);
    if (Reveal.isReady && Reveal.isReady()) run();
  }
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
