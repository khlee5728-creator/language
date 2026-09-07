/**
 * slides-quiz.js v2 — reveal.js용 인터랙티브 객관식 퀴즈 + 응답 기록(Supabase)
 *
 * 마크업:
 *   <div class="mcq" data-qid="w04-q1">
 *     <div class="mcq-q"><span class="qnum">Q1</span>질문 …</div>
 *     <div class="mcq-opts">
 *       <button class="mcq-opt" data-correct="true"><span class="opt-key">A</span>정답</button>
 *       <button class="mcq-opt"><span class="opt-key">B</span>오답</button>
 *     </div>
 *     <div class="mcq-explain"><span class="lbl">해설</span> …</div>
 *   </div>
 *
 * 기록: window.QUIZ_CONFIG(quiz-config.js)에 SUPABASE_URL·ANON_KEY가 있으면
 *   첫 클릭 시 학번을 1회 묻고(localStorage 저장), 선택 즉시 quiz_responses에 INSERT.
 *   실패분은 localStorage 큐에 두었다가 다음 기회에 재전송. 설정이 비어 있으면 기록 없이 동작.
 */
(function () {
  var CFG = window.QUIZ_CONFIG || {};
  var ENABLED = !!(CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY);
  var KEY_SID = 'tel_student_id', KEY_QUEUE = 'tel_quiz_queue';
  var week = (function () { var m = /week(\d\d)\.html/.exec(location.pathname); return m ? parseInt(m[1], 10) : 0; })();

  function store(k, v) { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function anonId() {
    var id = load('tel_anon_id');
    if (!id) { id = 'anon-' + Math.random().toString(36).slice(2, 8); store('tel_anon_id', id); }
    return id;
  }

  /* ── 전송 ── */
  /* 행 단위 INSERT. 409(이미 기록된 첫 시도)는 성공으로 간주. (ON CONFLICT 업서트는 RLS와 충돌해 사용하지 않음) */
  function postOne(row) {
    return fetch(CFG.SUPABASE_URL + '/rest/v1/quiz_responses', {
      method: 'POST',
      headers: {
        'apikey': CFG.SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + CFG.SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(row)
    }).then(function (r) { if (!r.ok && r.status !== 409) throw new Error('HTTP ' + r.status); });
  }
  function post(rows) { return Promise.all(rows.map(postOne)); }
  function flushQueue() {
    var q; try { q = JSON.parse(load(KEY_QUEUE) || '[]'); } catch (e) { q = []; }
    if (!q.length) return;
    store(KEY_QUEUE, null);
    post(q).catch(function () { enqueue(q); });
  }
  function enqueue(rows) {
    var q; try { q = JSON.parse(load(KEY_QUEUE) || '[]'); } catch (e) { q = []; }
    store(KEY_QUEUE, JSON.stringify(q.concat(rows).slice(-200)));
  }
  /* 이 브라우저에서 푼 문항 이력 — 나중에 학번을 입력하면 같은 답을 학번으로 다시 전송 */
  var KEY_HIST = 'tel_quiz_history';
  function history() { try { return JSON.parse(load(KEY_HIST) || '[]'); } catch (e) { return []; } }
  function remember(row) {
    var h = history().filter(function (r) { return !(r.week === row.week && r.qid === row.qid); });
    h.push({ week: row.week, qid: row.qid, choice: row.choice, is_correct: row.is_correct });
    store(KEY_HIST, JSON.stringify(h.slice(-200)));
  }
  function record(qid, choice, correct) {
    if (!ENABLED || !week) return;
    var row = { semester: CFG.SEMESTER || 'unknown', student_id: load(KEY_SID) || anonId(),
                week: week, qid: qid, choice: choice, is_correct: correct };
    remember(row);
    post([row]).catch(function () { enqueue([row]); });
  }
  function isAnon(s) { return !s || /^anon-/.test(s); }
  function setId(sid) {
    var prev = load(KEY_SID);
    store(KEY_SID, sid);
    updateBadge();
    if (!ENABLED || !isAnon(prev) || sid === prev) return;
    // 익명으로 풀었던 답을 학번으로 재전송(서버는 중복 무시)
    var rows = history().map(function (r) {
      return { semester: CFG.SEMESTER || 'unknown', student_id: sid, week: r.week, qid: r.qid, choice: r.choice, is_correct: r.is_correct };
    });
    if (rows.length) post(rows).catch(function () { enqueue(rows); });
  }

  /* ── 학번 입력 다이얼로그 ── */
  var dialog = null, pending = null;
  function askId(then, later) {
    if (dialog) return;
    pending = then;
    var cur = load(KEY_SID);
    dialog = document.createElement('div');
    dialog.className = 'qid-dialog';
    dialog.innerHTML =
      '<div class="qid-box">' +
      '<div class="qid-k">' + (week ? 'WEEK ' + week + ' · ' : '') + 'STUDENT ID</div>' +
      '<div class="qid-t">강의를 시작하기 전에 학번을 입력해 주세요.</div>' +
      '<div class="qid-s">이 덱의 연습문제 풀이 여부는 <b>학번으로만</b> 확인됩니다. 한 번 입력하면 이 브라우저에 저장되며, 이름은 수집하지 않습니다.' +
      (later ? ' 지금까지 익명으로 푼 답도 학번으로 함께 기록됩니다.' : '') + '</div>' +
      '<form class="qid-f"><input class="qid-in" inputmode="numeric" autocomplete="off" maxlength="12" placeholder="학번 7자리"' +
      (cur && !isAnon(cur) ? ' value="' + cur + '"' : '') + '>' +
      '<button type="submit" class="qid-ok">저장</button></form>' +
      (CFG.REQUIRE_ID && !later ? '' : '<button type="button" class="qid-skip">' + (later ? '닫기' : '나중에 입력하고 일단 풀기 (익명 기록)') + '</button>') +
      '</div>';
    document.body.appendChild(dialog);
    var input = dialog.querySelector('.qid-in');
    setTimeout(function () { input.focus(); }, 30);
    dialog.querySelector('.qid-f').addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!/^[A-Za-z0-9-]{4,12}$/.test(v) || /^anon-/.test(v)) { input.classList.add('bad'); input.focus(); return; }
      setId(v); close();
    });
    var skip = dialog.querySelector('.qid-skip');
    if (skip) skip.addEventListener('click', function () { if (!later) store(KEY_SID, anonId()); updateBadge(); close(); });
    // reveal 키 조작이 입력창에 먹지 않도록
    dialog.addEventListener('keydown', function (e) { e.stopPropagation(); });
  }
  function close() {
    var d = dialog; dialog = null;
    if (d && d.parentNode) d.parentNode.removeChild(d);
    var fn = pending; pending = null;
    if (fn) fn();
  }

  /* ── 학번 상태 배지 (연습문제 슬라이드에서만 표시) ── */
  var badge = null;
  function updateBadge() {
    if (!badge) return;
    var sid = load(KEY_SID);
    badge.innerHTML = isAnon(sid)
      ? '<span class="qb-k">STUDENT ID</span><span class="qb-v qb-anon">미입력 — 풀이 여부가 확인되지 않습니다</span><button type="button" class="qb-btn">학번 입력</button>'
      : '<span class="qb-k">STUDENT ID</span><span class="qb-v">' + sid + '</span><button type="button" class="qb-btn">변경</button>';
    badge.querySelector('.qb-btn').addEventListener('click', function () { askId(null, true); });
  }
  function mountBadge() {
    if (!ENABLED || !document.querySelector('.mcq') || !window.Reveal) return;
    badge = document.createElement('div');
    badge.className = 'qid-badge';
    document.body.appendChild(badge);
    updateBadge();
    function toggle() {
      var cur = Reveal.getCurrentSlide && Reveal.getCurrentSlide();
      badge.classList.toggle('show', !!(cur && cur.querySelector('.mcq')));
    }
    Reveal.on('ready', toggle);
    Reveal.on('slidechanged', toggle);
    if (Reveal.isReady && Reveal.isReady()) toggle();
  }

  /* ── 채점 ── */
  function answer(mcq, opts, opt) {
    if (mcq.classList.contains('answered')) return;
    mcq.classList.add('answered');
    var correct = opt.dataset.correct === 'true';
    opts.forEach(function (o) {
      o.disabled = true;
      if (o.dataset.correct === 'true') o.classList.add('correct');
    });
    if (!correct) opt.classList.add('wrong');
    var ex = mcq.querySelector('.mcq-explain');
    if (ex) ex.classList.add('show');
    var keyEl = opt.querySelector('.opt-key');
    record(mcq.dataset.qid, keyEl ? keyEl.textContent.trim().charAt(0) : '?', correct);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.mcq').forEach(function (mcq) {
      var opts = mcq.querySelectorAll('.mcq-opt');
      opts.forEach(function (opt) {
        opt.addEventListener('click', function () {
          if (mcq.classList.contains('answered')) return;
          if (ENABLED && !load(KEY_SID)) { askId(function () { answer(mcq, opts, opt); }); return; }
          answer(mcq, opts, opt);
        });
      });
    });
    if (ENABLED) {
      flushQueue(); window.addEventListener('online', flushQueue); mountBadge();
      // 강의 시작 시 학번 입력 — 연습문제가 있는 덱을 열면 첫 화면에서 한 번 묻는다
      if (!load(KEY_SID) && document.querySelector('.mcq')) setTimeout(function () { askId(null, false); }, 400);
    }
  });
})();
