# TRD — 강의 자료 제작 기술 명세

> **Technical Requirements Document**
> PRD의 요구사항을 구현하기 위한 **기술 스택·파일 구조·자산 규약**을 정리한다.
> 향후 다른 교재·과목 프로젝트는 이 문서를 기준으로 동일한 구조를 재현한다.
> 프로젝트 진행에 따라 주요 변경 사항을 계속 업데이트한다.

- **문서 버전**: 1.0
- **최초 작성**: 2026-07-03
- **최종 수정**: 2026-07-03

---

## 1. 기술 스택 (Tech Stack)

| 영역 | 선택 | 비고 |
|------|------|------|
| 슬라이드 프레임워크 | **reveal.js 5.1.0** (CDN) | 빌드 불필요, 브라우저에서 바로 재생 |
| 테마 | reveal.js `white.css` + 커스텀 테마 | `--slide-accent` 변수로 주차별 색상 |
| 폰트 | Google Fonts — Inter, Noto Sans KR | 영어 본문 + 한국어 부연 |
| 도표 | 인라인 **SVG / CSS** | 교재 스캔 대신 자체 재현 (저작권) |
| 인터랙션 | 바닐라 JS (의존성 없음) | 퀴즈·토글·PDF 자체 구현 |
| 교재 추출 | Python + **pypdf** | 텍스트 추출 시 UTF-8 파일로 우회(cp949 콘솔 회피) |
| 배포 | GitHub Pages | 정적 호스팅 |

## 2. 파일 구조 (Repository Layout)

```
프로젝트루트/
├── index.html                  # 강의 허브 (15주 카드)
├── 강의계획서.html               # 강의계획서
├── docs/
│   ├── PRD.md                  # 제품 요구사항 (이 프로젝트 기준 문서)
│   └── TRD.md                  # 기술 명세 (본 문서)
├── slides/
│   ├── week01.html ~ weekNN.html
│   └── assets/                 # 저장소 자체 완결 (외부 폴더 의존 없음)
│       ├── linguistics-theme.css   # 디자인 시스템 (주차별 색상 변수 기반)
│       ├── slides-print.js         # PDF 내보내기 버튼
│       ├── slides-quiz.css / .js   # 인터랙티브 MCQ 엔진
│       └── slides-ko.css / -ko-toggle.js  # 한국어 On/Off 토글
└── (교재 PDF, 강의계획서 원본 등 — .gitignore로 배포 제외 관리)
```

- **원칙**: 슬라이드가 참조하는 모든 자산은 `slides/assets/`에 복사해 저장소 내에서 완결.
  다른 프로젝트의 폴더에 링크하지 않는다.

## 3. 슬라이드 HTML 골격 (Boilerplate)

새 주차 슬라이드는 아래 골격을 복제해 시작한다.

### `<head>` — 필수 링크 순서
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/theme/white.css" />
<link rel="stylesheet" href="assets/linguistics-theme.css" />
<link rel="stylesheet" href="assets/slides-quiz.css" />
<link rel="stylesheet" href="assets/slides-ko.css" />   <!-- 한국어 토글 -->
<style> :root { --slide-accent: #RRGGBB; } /* 주차별 색상 */ </style>
```

### `</body>` 직전 — 필수 스크립트 순서
```html
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.js"></script>
<script> Reveal.initialize({ hash:true, slideNumber:'c/t', progress:true,
         center:false, transition:'slide', transitionSpeed:'fast', plugins:[] }); </script>
<a class="home-btn" href="../index.html" title="강의 목록으로">← 목록</a>
<script src="assets/slides-print.js"></script>
<script src="assets/slides-quiz.js"></script>
<script src="assets/slides-ko-toggle.js"></script>   <!-- 반드시 body 끝 -->
```

## 4. 자산 규약 (Asset Contracts)

### 4.1 한국어 토글 — `slides-ko.css` + `slides-ko-toggle.js`
- 한국어 부연은 `.ko-supp`로 감싼다 (인라인 `<span>` 또는 블록 `<p>/<div>`).
  - 관례: 한국어 부연 앞에 `※` 접두를 붙여 보조 텍스트임을 표시.
- 토글 버튼이 `.reveal`에 `.hide-ko`를 걸면 `.reveal.hide-ko .ko-supp { display:none }`.
- 선택 상태는 `localStorage('koHidden')`에 기억.
- 인쇄 시(`@media print`)에는 한국어를 항상 표시, 토글 버튼은 숨김.

### 4.2 인터랙티브 MCQ — `slides-quiz.css` + `slides-quiz.js`
마크업 구조:
```html
<div class="mcq">
  <div class="mcq-q"><span class="qnum">1</span>질문 …</div>
  <div class="mcq-opts">
    <button class="mcq-opt" data-correct="true"><span class="opt-key">A</span>정답</button>
    <button class="mcq-opt"><span class="opt-key">B</span>오답</button>
  </div>
  <div class="mcq-explain"><span class="lbl">Explanation</span> 해설 …</div>
</div>
```
- JS가 클릭 리스너를 붙여 정답/오답 표시(`.correct`/`.wrong`), 옵션 비활성화, 해설 노출(`.show`).

### 4.3 PDF 내보내기 — `slides-print.js`
- PDF 저장 버튼을 주입, `?print-pdf` 오버레이 처리.

### 4.4 디자인 시스템 — `linguistics-theme.css`
- 제공 클래스: `title-slide`, `week-badge`, `agenda-list`, `def-box`(`.term`),
  `two-col`, `example-box`, `summary-box`(`.key`), `next-week-banner`(`.label`),
  `practice-header`, `card`, `summary-grid/-item`, `assignment-box`, `home-btn`, `pdf-btn`.
- 주차별 색상은 `--slide-accent` 하나만 바꾸면 전체 반영.

## 5. 교재 PDF 처리 (Textbook Extraction)

- 도구: Python 3.x + `pypdf`.
- **쪽번호 정책(중요)**: 강의자료의 모든 페이지 인용은 **인쇄 교재에 찍힌 쪽번호** 기준으로 통일한다(학생은 인쇄본 사용). PDF 인덱스나 순차 번호를 그대로 쓰지 않는다.
- **페이지 매핑은 러닝헤더 파싱으로 검증**: PDF에 정크 페이지가 삽입돼 오프셋이 구간별로 달라질 수 있다(적용 사례: 인쇄 p.1–26은 pdf=페이지+21, p.29부터 pdf=페이지+25 — 중간에 정크 4장). 각 페이지 텍스트의 러닝헤더에서 인쇄 쪽번호를 정규식으로 파싱해 매핑 테이블을 만들고, 챕터 시작 페이지로 검증한 뒤 추출한다.
- **인용 형식**: `(cf. textbook Ch.N, pp.a–b)` 개념 참조. **연습문제 번호(Ex.N)는 추출본에서 실물 확인된 경우에만 표기**(허위 번호 금지).
- **인코딩 주의**: Windows 콘솔 cp949 문제 → 추출 텍스트를 UTF-8 파일로 쓴 뒤 읽는다.
- 추출 결과는 개념 정리·MCQ 재구성의 **참고용**으로만 사용, 원문 복제 금지(PRD §4.2).

## 6. Git & 배포 규약 (중요)

- **push는 사용자가 명시적으로 요청할 때만.** 자동 push 금지.
- **시험/평가 자료는 원격 저장소에 절대 push하지 않는다.** 로컬 관리 또는 `.gitignore`.
- 대용량 교재 PDF 등 배포 불필요 파일은 `.gitignore`로 제외.
- 커밋 메시지는 저장소 스타일을 따름.

**적용 사례 원격 정보**
- Remote: `https://github.com/khlee5728-creator/language.git` (main)
- Pages: `https://khlee5728-creator.github.io/language/`

## 7. 신규 주차 제작 체크리스트 (Checklist)

1. [ ] 교재 해당 페이지 범위 확인 + pypdf로 개념 추출(참고용).
2. [ ] `weekNN.html` 골격 복제, `--slide-accent` 색상 지정, `lang="en"`.
3. [ ] 본문을 **영어 기본**으로 작성, 한국어 부연은 `.ko-supp`(+`※`)로.
4. [ ] 도표가 필요하면 **SVG/CSS로 자체 재현**(스캔 금지).
5. [ ] Practice MCQ + 교재 기반 **재구성** Exercises MCQ 추가(참조 표기).
6. [ ] 발표자 노트(`<aside class="notes">`)는 한국어로.
7. [ ] head에 `slides-ko.css`, body 끝에 `slides-ko-toggle.js` 포함 확인.
8. [ ] `index.html` 카드에 링크 + "✓ 슬라이드 완료" 배지 연결.
9. [ ] 브라우저에서 재생·토글·퀴즈·PDF 동작 확인.
10. [ ] (요청 시에만) commit & push — 시험 자료 제외.

---

## 변경 이력 (Changelog)
| 날짜 | 버전 | 변경 내용 |
|------|------|-----------|
| 2026-08-20 | 1.1 | §5 쪽번호 정책 신설: 인쇄 교재 쪽번호 기준 통일, 러닝헤더 파싱 매핑 검증, Ex.N 검증 시에만 표기 |
| 2026-07-03 | 1.0 | 최초 작성. 스택·파일구조·자산규약·체크리스트 정립 |
