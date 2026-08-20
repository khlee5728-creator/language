/**
 * slides-ko-toggle.js — 한국어 부연 설명 On/Off 토글
 * 우상단에 버튼을 주입하고, .reveal 에 .hide-ko 클래스를 토글한다.
 * 선택 상태는 localStorage('koHidden')에 기억.
 * 영어가 기본 언어이며, .ko-supp 로 감싼 한국어만 숨김/표시된다.
 */
(function () {
  'use strict';
  var reveal = document.querySelector('.reveal');
  if (!reveal) return;

  var hidden = localStorage.getItem('koHidden') === '1';

  var btn = document.createElement('button');
  btn.className = 'ko-toggle-btn';
  btn.title = '한국어 설명 켜기/끄기';

  function apply() {
    reveal.classList.toggle('hide-ko', hidden);
    btn.classList.toggle('off', hidden);
    btn.setAttribute('aria-pressed', String(!hidden));
    btn.innerHTML = '\uAC00 \uD55C\uAD6D\uC5B4 ' + (hidden ? 'OFF' : 'ON');
  }

  btn.addEventListener('click', function () {
    hidden = !hidden;
    localStorage.setItem('koHidden', hidden ? '1' : '0');
    apply();
  });

  document.body.appendChild(btn);
  apply();
})();
