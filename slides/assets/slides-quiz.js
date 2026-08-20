/**
 * slides-quiz.js — reveal.js용 인터랙티브 객관식 퀴즈
 * (Current Affairs 프로젝트 quiz 엔진 차용·경량화)
 *
 * 사용법:
 *   <div class="mcq">
 *     <div class="mcq-q"><span class="qnum">1</span>질문 …</div>
 *     <div class="mcq-opts">
 *       <button class="mcq-opt" data-correct="true"><span class="opt-key">A</span>정답</button>
 *       <button class="mcq-opt"><span class="opt-key">B</span>오답</button>
 *     </div>
 *     <div class="mcq-explain"><span class="lbl">해설</span> …</div>
 *   </div>
 */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.mcq').forEach(function (mcq) {
    var opts = mcq.querySelectorAll('.mcq-opt');
    opts.forEach(function (opt) {
      opt.addEventListener('click', function () {
        if (mcq.classList.contains('answered')) return;
        mcq.classList.add('answered');
        opts.forEach(function (o) {
          o.disabled = true;
          if (o.dataset.correct === 'true') o.classList.add('correct');
        });
        if (opt.dataset.correct !== 'true') opt.classList.add('wrong');
        var ex = mcq.querySelector('.mcq-explain');
        if (ex) ex.classList.add('show');
      });
    });
  });
});
