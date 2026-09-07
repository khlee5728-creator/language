# 영어학 특강 (Topics in English Linguistics) — 작업 표준

경기대학교 2026-2학기 · 교재 *An Introduction to Language* 11th ed. (Fromkin·Rodman·Hyams, Ch.1–6)
공개 배포: https://khlee5728-creator.github.io/language/ (repo: khlee5728-creator/language, **public**)

이 문서는 이 저장소에서 작업하는 모든 세션이 지켜야 할 표준이다. 아래 규칙과 어긋나는 요청이
들어오면 실행 전에 충돌을 알릴 것.

## 1. 절대 규칙 (안전선)

- **push는 사용자가 명시적으로 요청할 때만.** 커밋도 요청 기반. 어떤 작업 완료도 push 승인을 함의하지 않는다.
- **시험·평가 자료는 원격에 절대 반영 금지.** `.gitignore`가 1차 방어(`exams/`, `*중간고사*`, `*기말고사*`, `*시험*`, `*정답*` 등)하지만, 스테이징 전 `git status`에서 시험 관련 파일이 없는지 항상 육안 확인한다. repo가 public임을 기억할 것.
- **교재 원문 축자 복제 금지.** 공개 자료에는 짧은 섹션 제목·예문+출처 표기만 허용, 본문 설명은 자체 표현으로 재구성. 출처 표기는 복제 허가가 아니다. 연습문제 번호 인용은 실물에서 검증된 것만(현재 유일: Ch.1 p.28 Ex.2).
- **교재 카툰(Herman, Peanuts 등)·기존 캐릭터·특정 작가 화풍 모사 금지** — 오리지널 창작만.

## 2. 인용 정책

- 쪽수는 **인쇄 교재의 쪽 번호**로 표기한다 (학생은 PDF가 아니라 인쇄본을 본다).
- PDF↔인쇄 쪽 매핑: 인쇄 p.1–26 → PDF 인덱스 +21, p.27/28 → PDF 50/51, p.29+ → +25.
- 페이지 인용을 새로 달 때는 scratchpad 추출본(`textbook_chN_bookA-B.txt`, `BOOK PAGE N` 마커)이나
  원본 PDF에서 검증 후 표기. 추정 인용 금지.

## 3. 에디토리얼 디자인 시스템 (전 덱 공통)

에셋: `slides/assets/editorial-theme.css` + `slides-editorial.js`(레일·킥커·폴리오 주입) +
`slides-media.css/js`(TTS·영상·자막) + reveal.js 5.1.0 CDN, 스테이지 960×700, `center:false`.

- **헤더/타이틀은 교재 섹션 제목 그대로(verbatim).** 임의 요약·의역 금지. 히어로 워드(개념어 초대형 타이포) 금지 — 교재 정합성이 우선.
- **섹션 완전성**: 주차 범위의 교재 섹션은 하나도 건너뛰지 않는다. 덱 신설·개편 시 챕터 헤딩 목록을 추출해 체크리스트로 대조.
- **킥커 문법**: 내용 `CH.n P.{시작쪽} · {직상위 섹션}` / 미디어 `… · FIGURE|CARTOON|VIDEO` / 퀴즈 `CH.n · PRACTICE|EXERCISE nn` / 요약 `CH.n · SUMMARY` / 목차 `WEEK n · CONTENTS · CH.n PP.a–b` / 교재 밖 보충 `ENRICHMENT · BEYOND THE TEXTBOOK`. 구분자는 ` · `.
- **목차 슬라이드**: 책 차례식(`recap tight` + `.pg` 시작 쪽수).
- **폴리오**: `N / total` (slides-editorial.js 자동) — 코스명 등 다른 텍스트 금지.
- **챕터 악센트**: W1 `#2b3a67` · Ch.1 `#7a2e2e` · Ch.2 `#2e5941` · Ch.3 `#4a2e5c` · Ch.4 `#8a5a20` · Ch.5 `#24513f` · Ch.6 `#6e1f28`.
- 이모지·색 상자·그라데이션 금지. 헤어라인과 타이포그래피로만 위계 표현.
- **서체 역할**: Playfair Display=제목 · Lora=영문 본문/예문(예문·인용은 이탤릭) · Space Grotesk=킥커/라벨/번호 · Noto Serif KR=국문.
  국문 혼용 블록(.lead/.def/.tr/.mcq-opt/.mcq-explain/.recap)은 `'Lora','Noto Serif KR'` 순으로 지정해 영문은 항상 Lora로 찍히게 한다(굵기 400 통일). 영문에 Noto Serif KR을 직접 지정하지 않는다.
- **국문 부연(.ko-supp) 규칙**: 본문은 영어가 기본이고 국문은 토글로 숨길 수 있으므로, 국문 줄은 **바로 위 영문의 요지 한 문장(의역)**으로 한정한다.
  영문에 없는 보충·심화 내용을 국문에만 두지 않는다(필요하면 영문 본문 또는 발표자 노트로). 국문 대응 용어는 괄호 병기 "파생(derivation)".
  예외로 허용: 목차·다음 주 범위·쪽수·카툰 출처 같은 메타 안내.
- **대시 규칙**: 제목·라벨·버튼 구분자 ` · ` / "용어: 설명"은 콜론 / 삽입·부연은 쉼표(대등절은 세미콜론) / 국문은 콜론·마침표(국문에 em dash 금지) / 범위는 en dash(pp.1–15) / 어두 연쇄 표기는 하이픈(nk-).
  em dash( — )는 **진짜 끊김·수사적 전환에만, 슬라이드당 최대 1개**. 예외: 서지 표기(11TH ED. — 저자), 카툰 대사·자막 큐 원문.

## 4. 미디어 표준

### AI 카툰 영상 (상세: docs/AI영상_제작가이드.md)
- 고정 출연진: 파랑 후드 남(갈색 머리)·보라 티 남(은발)·민트 자켓 여(단발)·주황 스웨트 여(긴 머리)·갈색 토이푸들. 화풍: W3–W7 한국 웹툰 2D / W9–W14 파스텔 3D.
- **시안은 반드시 기준 프레임을 참조 이미지로** 생성(P1: W2 시작프레임 job `720de8f0-…` / P2: W9 시안 job `8e15f312-…`). 참조 없이 만들면 캐릭터가 달라진다(W11 사고 전례).
- **컷 경계는 OpenCV 프레임 차분, 발화 구간은 오디오 RMS로 실측**(scratchpad `contact_sheet.py`, `measure_speech.py`). 화면 추정 금지.
- **자막 표준**: 들리는 대사는 `.cue.sub`에 **말한 문장 그대로** 전사 + 키워드 `<b>` 강조 + 필요 시 `.gl` 주석. 말풍선(shout/think)은 **무성 채널 전용**(강아지 think 펀치라인, 동물 SFX). 음성과 다른 텍스트를 화면에 띄우지 않는다.
- 노출 부족 시 `data-slow`(슬로모) — 완전 정지(hold)는 금지. 대사 길이∝노출: 최소 max(1.6s, 글자수÷12s).
- 재생은 수동 ▶ Play(자동재생 금지), 소리 기본 ON(차단 시 음소거 폴백). **1회 재생 후 자동 종료** — `loop` 속성 금지(슬로모 배속은 ended 시 원복, Play 재클릭 시 처음부터).
- **AI 생성 표시 의무**: 카툰 영상마다 "AI-generated animation & voices" 크레딧 — slides-media.js가 자동 주입(v10)하므로 개별 덱에 넣지 않는다.

### 외부 강연 영상 (TED)
- **조건부 표준: 주차당 최대 1편, 교재 주제 직결 + 공식 임베드 확인될 때만.** 억지 채움 금지(W6·W7·W14는 의도적 공백).
- 패턴: `embed.ted.com` iframe + "Watch with subtitles (EN·한국어) · ted.com ↗" 새 탭 버튼 + `video-print-note` + 발표자 노트에 수업 시청 추천 구간.
- 임베드는 자막 제어 불가(파라미터 무시) — 자막 필요 시 ted.com 새 탭이 유일한 방법.
- TED-Ed(유튜브 호스팅)는 임베드 차단(오류 153) — 링크 전용 슬라이드로만.
- 삽입 전 슬러그·임베드 URL이 200인지 검증한다.

## 5. 검증 의무

덱을 수정하면 `/verify-decks`(.claude/skills/verify-decks)를 실행해 통과시킨 뒤 보고한다.
통과 기준: 세로 오버플로우 0(MCQ 해설 열림 포함) · 가로 넘침 0 · 영상 메타데이터 로드 · 큐 존재.
커스텀 CSS/JS 수정 시 참조하는 모든 덱의 `?v=N`을 올린다(브라우저 캐시).

## 6. 기술 노트 (함정 목록)

- 로컬 서버: `preview_start`의 "English Linguistics"(launch.json, python http.server 8130).
  **Range 미지원 → 영상 시킹 불가** — 위치 확인은 실재생 또는 OpenCV 프레임으로.
- 숨김 브라우저 팬: 스크롤 후 리페인트 안 됨(빈 스크린샷) → body zoom 축소 캡처나 JS 기하값으로 검증.
  백그라운드 탭은 setTimeout 스로틀링 → 순회 스캔은 대기 없는 동기 루프로.
- `preload="metadata"`는 `loadeddata`를 안 쏨 → `loadedmetadata` + readyState로 판정.
- Higgsfield 프리셋 알림 → 안내된 `declined_preset_id`로 즉시 재제출.

## 7. 문서 맵

| 문서 | 내용 |
|---|---|
| `docs/TRD.md` | 기술 아키텍처·에디토리얼 시스템 명세 |
| `docs/AI영상_제작가이드.md` | 영상 파이프라인·화풍·자막/말풍선·파일 규격 |
| `docs/AI영상_스토리보드_W3-W14.md` | 클립별 샷 테이블·프롬프트·변경 이력 |
| `docs/PRD.md` | 과목·산출물 요구사항 |
