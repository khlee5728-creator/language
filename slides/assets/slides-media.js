/**
 * slides-media.js — 멀티미디어 모듈
 *  1) .say-btn[data-say][data-lang]  : Web Speech API 발음 재생
 *  2) .media-anim                    : CSS 애니메이션 재생/일시정지/리플레이
 *     - .media-btn.anim-replay[data-target] : 처음부터 다시 재생
 *     - .media-btn.anim-toggle[data-target] : 재생/일시정지 토글
 *     - .media-anim[data-auto="1"]  : 슬라이드 진입 시 자동 재생 (reveal.js 연동)
 * 외부 의존성 없음(재생용 Web Speech API는 브라우저 내장).
 */
(function () {
  'use strict';

  /* ── 1. 발음 재생 (speechSynthesis) ───────────────────── */
  var supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  var voices = [];
  function loadVoices() { try { voices = window.speechSynthesis.getVoices() || []; } catch (e) { voices = []; } }
  if (supported) {
    loadVoices();
    if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function pickVoice(lang) {
    if (!lang || !voices.length) return null;
    var pref = lang.toLowerCase();
    var exact = voices.filter(function (v) { return v.lang && v.lang.toLowerCase() === pref; });
    if (exact.length) return exact[0];
    var base = pref.split('-')[0];
    var loose = voices.filter(function (v) { return v.lang && v.lang.toLowerCase().indexOf(base) === 0; });
    return loose.length ? loose[0] : null;
  }

  function speak(btn) {
    if (!supported) return;
    var text = btn.getAttribute('data-say');
    if (!text) return;
    var lang = btn.getAttribute('data-lang') || 'en-US';
    try { window.speechSynthesis.cancel(); } catch (e) {}
    document.querySelectorAll('.say-btn.speaking').forEach(function (b) { b.classList.remove('speaking'); });
    var u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    var v = pickVoice(lang);
    if (v) u.voice = v;
    u.rate = parseFloat(btn.getAttribute('data-rate') || '0.95');
    btn.classList.add('speaking');
    u.onend = function () { btn.classList.remove('speaking'); };
    u.onerror = function () { btn.classList.remove('speaking'); };
    window.speechSynthesis.speak(u);
  }

  document.querySelectorAll('.say-btn').forEach(function (btn) {
    if (!supported) {
      btn.disabled = true;
      btn.title = '이 브라우저는 음성 합성을 지원하지 않습니다';
      return;
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); speak(btn); });
  });

  /* ── 2. 애니메이션 제어 ────────────────────────────────── */
  function restart(el) {
    el.classList.remove('play');
    void el.offsetWidth;            /* reflow로 애니메이션 리셋 */
    el.classList.add('play');
  }

  document.querySelectorAll('.anim-replay').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var t = document.querySelector(btn.getAttribute('data-target'));
      if (t) restart(t);
    });
  });

  document.querySelectorAll('.anim-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var t = document.querySelector(btn.getAttribute('data-target'));
      if (!t) return;
      var playing = t.classList.toggle('play');
      btn.setAttribute('aria-pressed', String(playing));
      btn.textContent = playing ? 'Pause' : 'Play';
    });
  });

  /* ── 3. AI 생성 영상 + 말풍선 오버레이 동기화 ──────────────
     .video-scene 안의 <video>가 로드되면 .has-video 부여(폴백 숨김).
     .cue[data-start][data-end]는 video.currentTime에 맞춰 표시/숨김. */
  document.querySelectorAll('.video-scene').forEach(function (scene) {
    var video = scene.querySelector('video');
    if (!video) return;
    function markReady() { scene.classList.add('has-video'); }
    /* preload="metadata"에서는 loadeddata가 안 오므로 loadedmetadata + readyState 즉시 검사 병행 */
    if (video.readyState >= 1) markReady();
    video.addEventListener('loadedmetadata', markReady);
    video.addEventListener('loadeddata', markReady);
    video.addEventListener('error', function () { scene.classList.remove('has-video'); });
    /* 재생 컨트롤 버튼: ▶/⏸ 토글 · ⏹ 정지(처음으로) · 🔊 소리 (기본은 무음 자동재생) */
    var stage = scene.querySelector('.video-stage');
    if (stage) {
      var ppBtn = document.createElement('button');
      ppBtn.className = 'media-btn vid-sound-btn';
      function syncPP() { ppBtn.textContent = video.paused ? 'Play' : 'Pause'; }
      ppBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (video.paused) {
          var p = video.play();
          if (p && p.catch) {
            p.catch(function () {
              /* 소리 재생이 차단된 환경이면 무음으로 폴백 */
              video.muted = true;
              syncSound();
              try { video.play(); } catch (err) {}
            });
          }
        } else { video.pause(); }
      });
      video.addEventListener('play', syncPP);
      video.addEventListener('pause', syncPP);
      syncPP();

      var stopBtn = document.createElement('button');
      stopBtn.className = 'media-btn vid-sound-btn';
      stopBtn.textContent = 'Stop';
      stopBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        video.pause();
        try { video.currentTime = 0; } catch (err) {}
        video.playbackRate = 1;   /* 슬로모 구간에서 정지해도 배속 복원 */
      });

      var sbtn = document.createElement('button');
      sbtn.className = 'media-btn vid-sound-btn';
      function syncSound() { sbtn.textContent = video.muted ? 'Sound on' : 'Mute'; }
      sbtn.addEventListener('click', function (e) {
        e.stopPropagation();
        video.muted = !video.muted;
        syncSound();
      });
      syncSound();

      var wrap = document.createElement('div');
      wrap.className = 'media-controls';
      wrap.appendChild(ppBtn);
      wrap.appendChild(stopBtn);
      wrap.appendChild(sbtn);
      stage.insertAdjacentElement('afterend', wrap);
    }
    var cues = scene.querySelectorAll('.cue');
    video.addEventListener('timeupdate', function () {
      var t = video.currentTime;
      cues.forEach(function (c) {
        var a = parseFloat(c.getAttribute('data-start') || '0');
        var b = parseFloat(c.getAttribute('data-end') || '1e9');
        var show = t >= a && t < b;
        c.classList.toggle('on', show);
        /* ── 공통 규칙: 대사 길이에 비례한 노출 ──
           긴 대사 말풍선은 data-slow="배속" 으로 해당 구간을 슬로우모션 재생.
           움직임이 유지되어 정지(끊김)처럼 보이지 않는다. 예: data-slow="0.3"
           → 1.1초 컷이 약 3.7초 동안 노출. 구간을 벗어나면 1배속 복원. */
        var slow = parseFloat(c.getAttribute('data-slow') || '0');
        if (slow > 0) {
          if (show && !c._slowing) { c._slowing = true; video.playbackRate = slow; }
          else if (!show && c._slowing) { c._slowing = false; video.playbackRate = 1; }
        }
      });
    });
  });

  function videosIn(el) { return el ? el.querySelectorAll('.video-scene video') : []; }

  /* 슬라이드 진입 시 data-auto 애니메이션 자동 재생 + 이탈 시 음성 정지 */
  function onSlideChanged(event) {
    if (supported) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    document.querySelectorAll('.say-btn.speaking').forEach(function (b) { b.classList.remove('speaking'); });
    /* 다른 슬라이드의 영상은 정지 */
    document.querySelectorAll('.video-scene video').forEach(function (v) { try { v.pause(); } catch (e) {} });
    var slide = event && event.currentSlide;
    if (!slide) return;
    slide.querySelectorAll('.media-anim[data-auto="1"]').forEach(restart);
    /* 영상은 자동 재생하지 않음 — ▶ Play 버튼으로 수동 시작(수업 흐름 제어, 소리 포함 재생 가능) */
  }
  if (window.Reveal && typeof window.Reveal.on === 'function') {
    window.Reveal.on('slidechanged', onSlideChanged);
    window.Reveal.on('ready', onSlideChanged);
  } else {
    /* reveal 미로딩 환경(인쇄 등): 전부 재생 상태로 */
    document.querySelectorAll('.media-anim').forEach(function (el) { el.classList.add('play'); });
  }
})();
