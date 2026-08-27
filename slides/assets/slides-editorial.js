/**
 * slides-editorial.js — 에디토리얼 공통 장식 주입 (v1)
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
