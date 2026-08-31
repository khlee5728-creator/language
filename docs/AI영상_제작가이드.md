# AI 영상 제작 가이드 — 강의 슬라이드용 애니메이션

> 강의 슬라이드에 삽입할 **실제 애니메이션 퀄리티**의 카툰 콩트를 AI 영상 도구로 제작하는 가이드.
> 생성한 mp4를 `slides/assets/media/`에 넣으면 슬라이드가 자동으로 영상을 사용한다(없으면 SVG 카툰으로 폴백).

- 문서 버전: 1.0 (2026-08-21)
- 파이프라인: 스토리보드 → AI 영상 생성(무텍스트) → mp4 저장 → 슬라이드가 자동 인식 + 말풍선 HTML 오버레이 동기화

---

## 1. 도구 추천 (2026-08 기준 — 정책은 수시로 바뀌므로 사용 직전 재확인)

> ⚠️ **무료 검증 경로는 사실상 소멸**(사용자 확인, 2026-08):
> - AI Studio **Veo 무료 쿼터 없음**. Veo는 유료 Pro 등급까지 "Made with Veo" 워터마크.
> - **Kling 무료 500크레딧으로는 영상 생성 불가**(요금제 업그레이드 요구).
> → 공짜 화풍 검증은 포기하고, 아래처럼 **저비용 유료로 검증+제작을 한 번에**.

### 진행 순서 (2026-08-23 Higgsfield MCP 실측 기준)
| 순서 | 할 일 | 비용 |
|---|---|---|
| 0 | **Higgsfield MCP 3일 무료 체험** — Plus급 100크레딧(≈ Kling 3.0 영상 20개). 화풍 검증+W2 제작까지 가능. ⚠️ MCP 전용·카드 필요·**3일 후 미취소 시 $49/월 자동 결제**("cancel auto-renewal"로 언제든 취소) | $0 |
| 1 | 계속 쓰려면 **Plus $49/월(1,000크레딧 ≈ Kling 영상 200개)** — 13개 주차 클립+리테이크에 충분. $19 Starter는 MCP 기준 존재하지 않음(블로그 정보 오류) | $49 |
| 2 | 제작 완료 후 해지 | — |

- Claude에 Higgsfield MCP 연결 시 **생성→다운로드→슬라이드 배치까지 Claude가 직접 수행** 가능(프롬프트 복붙 불필요). content-factory류 스킬은 SNS 양산용이라 설치 불필요.
- 대안: ChatGPT Plus 기구독자는 Sora(sora.com) 무추가비용 / 정밀 제어 필요 시 Runway.

## 1.5 화풍 규칙 (2026-08-24 확정)

- **이미지 우선 워크플로**: 화풍 시안을 이미지 모델(Nano Banana Pro, 2cr/장)로 먼저 확정 →
  그 이미지를 `start_image`로 프리미엄 모델 i2v(Veo 3.1 8초 = 22cr). 리테이크는 이미지 단계에서 해결.
- **파트 기반 혼합**: **Phase 1(W2–7) = 웹툰 스타일**(한국 웹툰풍 2D, 20대 캐릭터) /
  **Phase 2(W9–14) = 폴리시드 3D**(파스텔 3D 애니메이션풍). 허브의 Phase 구분과 일치.
- **고정 출연진**: 두 화풍 모두 같은 캐릭터 구성 유지 — 파랑·보라·초록(민트)·주황 옷 4인 + 갈색 강아지.
  화풍이 바뀌어도 "우리 수업 캐릭터" 정체성 유지.
- 확정 시안·프레임: scratchpad의 `styleA_3d.png`(Phase 2 기준), `styleB_fullbleed.png`(Phase 1 기준, W2 사용).
- 프리셋 추천 알림이 뜨면 `declined_preset_id`로 literal 재시도.

## 2. 제작 원칙 (중요)

1. **영상 안에 글자를 넣지 않는다.** AI는 텍스트가 뭉개진다. 말풍선·자막은 슬라이드가 HTML로 얹는다(선명 + 수정 가능 + 한국어 토글 유지). 프롬프트에 항상 `no text, no captions, no watermark` 포함.
2. **오리지널 캐릭터만.** 교재 만화(Herman, Peanuts 등)나 기존 캐릭터·특정 작가 화풍 모사 금지 — 저작권.
3. **캐릭터 일관성**: 여러 컷이 필요하면 ① 먼저 이미지 AI로 캐릭터 시트(정면·측면) 1장 생성 → ② 각 컷을 그 이미지 기반 **image-to-video**로 생성.
4. **한 클립 = 한 장면 8–10초.** 길게 만들지 말고 장면당 1클립. 복잡한 연출은 실패율이 높다.
5. **1회 재생 후 자동 종료 (2026-08-31 확정)**: `<video>`에 `loop`를 넣지 않는다 — 수업 중 무한 반복은 산만함(사용자 결정). slides-media.js v9가 종료 시 슬로모 배속을 원복하고, ▶ Play 재클릭 시 처음부터 재생된다. 마지막 프레임이 정지 화면으로 남으므로 **엔딩 컷은 정지해도 어색하지 않은 포즈**(강아지 표정 등)로 설계.
6. **대사가 있으면 멀티샷**: 여러 캐릭터가 말하는 장면은 와이드샷 1컷에 몰지 말고
   **화자별 클로즈업 컷으로 분할**(Kling 3.0 멀티샷 + 오디오 싱크). 각 대사는 해당 화자가
   화면에 있을 때만 들리도록 프롬프트에 명시. 입모양 싱크(`mouth movement synced`)도 명시.
7. **대사 길이 ∝ 노출 시간 (공통 규칙)** — 모든 영상·모든 캐릭터에 적용:
   - **생성 단계**: 프롬프트의 샷 시간 배분을 대사 길이에 비례시킨다.
     한 단어 외침 컷 ≈ 1.5–2초, 문장 컷 ≈ **글자수 ÷ 12 + 리액션 1초**.
     (예: 43자 문장 → 발화·읽기 3.6초 + 리액션 = 4.5초 컷) 총 길이가 부족하면
     duration을 늘리거나(Kling 3–15초) 대사를 줄인다. 말하는 동안 입모양·제스처가 유지되어야 한다.
   - **재생 단계(안전장치)**: 말풍선 노출 시간 ≥ max(1.6초, 글자수÷12초).
     영상 컷이 이미 짧게 나왔다면 말풍선에 `data-slow="배속"`(예: 0.3)을 주면 그 구간만
     **슬로우모션**으로 재생되어 읽을 시간을 확보한다(slides-media.js 내장, 구간 이탈 시 1배속 복원).
     움직임이 유지되므로 정지처럼 끊겨 보이지 않는다 — 쇼츠의 스피드램프 연출과 동일한 문법.
     ⚠️ 완전 정지(hold) 방식은 영상이 끊긴 것처럼 보여 폐기함(2026-08-25 사용자 피드백).
8. **자막 표준 (2026-08-28 확정)** — 텍스트 채널은 역할별로 셋:
   - **자막(`.cue.sub`)**: 들리는 대사는 **말한 문장 그대로(verbatim)** 하단 자막으로 전사.
     학습 키워드(형태소·이동·조음 위치)는 자막 안에서 `<b>` 강조, 보조 주석은 `<span class="gl">`
     (예: `<b>CAN</b> you pet the dog? + gl "AUX INVERSION"`). 음성≠텍스트 불일치 금지 —
     표기법 요약("Can → you?")이나 의역을 자막에 쓰지 않는다.
   - **말풍선(shout/think)**: **무성 채널 전용** — 강아지 펀치라인(think), 동물 SFX(벌 waggle 등).
     음성이 있는 대사에 말풍선을 달면 '들리는 것≠보이는 것'이라 오류처럼 보임(2026-08-28 사용자 피드백).
   - **싱크는 실측**: 컷 경계는 OpenCV 프레임 차분, **발화 구간은 오디오 파형(RMS)으로 실측**
     (`measure_speech.py` — imageio-ffmpeg로 오디오 추출→발화 세그먼트 검출). 화면 추정 금지.
     자막 노출은 발화 구간에 ±0.2s 여유, 최소 max(1.6s, 글자수÷12s).

## 3. 파일 규격

- 포맷: **mp4 (H.264)**, 권장 1280×720 이상, 8–15초, **20MB 이하**
- 오디오 트랙 포함 권장(Veo 3.1은 앰비언스·대사 자동 생성). 슬라이드는 **무음 자동재생**(브라우저 정책)이 기본이고, 영상 아래 자동 생성되는 **🔊 Sound On 버튼**으로 수업 중 소리를 켠다.
- 에셋(slides-media.css/js) 수정 시 덱의 링크 버전 파라미터(`?v=N`)를 올려 캐시 무효화.
- 저장 위치: `slides/assets/media/`
- 파일명 규칙: `w{주차}_{용도}.mp4` — 예: `w02_toon_arbitrariness.mp4`
- 슬라이드 동작: 해당 파일이 있으면 영상 자동 사용, 없으면 기존 SVG 카툰 표시(자동 폴백)

## 4. W2 카툰 "One Dog, Four Names" — 스토리보드 & 프롬프트

### 스토리보드 (10초, 1클립)
| 시간       | 장면                                               | 오버레이(슬라이드가 얹음)                                      |
| -------- | ------------------------------------------------ | --------------------------------------------------- |
| 0–2.5s   | 파스텔톤 공원, 갈색 강아지가 화면 중앙으로 총총 걸어옴. 네 사람이 반원으로 서 있음 | —                                                   |
| 2.5–6.5s | 네 사람이 차례로 강아지를 향해 몸을 기울이며 부르는 제스처                | 말풍선 dog! → chien! → Hund! → 개!                      |
| 6.5–10s  | 강아지가 카메라를 보며 고개를 갸웃, 꼬리 흔들기                      | 생각 풍선 "Call me anything — just call me for dinner." |

### 생성 프롬프트 (영어 그대로 입력 — Veo·Sora·Kling 공용)
```
2D flat vector cartoon, soft pastel colors, rounded shapes, educational
animation style. A minimal park scene with a clean solid light background.
A cute round brown puppy trots to the center. Four friendly cartoon people
(diverse, simple rounded designs, solid-color clothes: blue, purple, green,
orange) stand in a loose semicircle around the puppy. One by one, each
person leans toward the puppy and gestures warmly as if calling it, left to
right in sequence. Then the puppy tilts its head, looks at the camera, and
wags its tail happily. Smooth gentle motion, 24fps feel, soft easing,
consistent character design throughout. No text, no captions, no watermark,
no speech bubbles.
```

- 톤 조정: 더 고급 화풍을 원하면 `2D flat vector cartoon` 대신 `polished 2D animation, studio-quality, subtle shading` 으로.
- 실패 시 리테이크 팁: "four people" 인원이 틀어지면 `exactly four people` 강조. 강아지가 이상하면 클립을 둘로 분할(사람 컷/강아지 컷).

### 캐릭터 시트(선택 — 여러 컷 제작 시)
이미지 AI(예: Gemini/GPT 이미지 생성)에:
```
Character sheet, front and side view: a cute round brown cartoon puppy,
2D flat vector style, soft pastel palette, simple rounded shapes, white
background, no text.
```
→ 이 이미지를 각 영상 생성의 참조 이미지(image-to-video)로 사용.

## 5. 삽입 방법 (제작 후 할 일 — 이게 전부)

1. 생성한 영상을 `slides/assets/media/w02_toon_arbitrariness.mp4` 로 저장
2. 슬라이드 새로고침 → 영상이 자동으로 SVG 카툰을 대체하고, 말풍선 오버레이가 영상 시간에 맞춰 등장
3. 말풍선 타이밍이 영상과 어긋나면: 슬라이드 HTML의 `data-start`/`data-end` 값(초)만 수정

## 6. 다른 주차 확장 아이디어
| 주차 | 클립 아이디어 |
|---|---|
| W3 | 벌이 8자 춤을 추고 다른 벌들이 날아가는 장면 · 앵무새가 말을 따라하는 장면 |
| W4–5 | 레고 블록처럼 형태소 블록이 조립되어 단어가 되는 장면 |
| W6–7 | 나무가 자라며 가지에 단어가 열리는 수형도 메타포 |
| W10 | 카페에서 "Can you pass the salt?"에 소금을 건네는(vs 
"Yes"라고만 답하는) 화행 콩트 |
| W11–12 | 입·혀 단면 애니메이션 (단, 정확성 필요 — 벡터 도표와 병행) |

---
## 변경 이력
| 날짜 | 버전 | 내용 |
|---|---|---|
| 2026-08-23 | 1.3 | Higgsfield MCP 실측 반영: Starter 부재·Plus $49/1,000cr(Kling ≈5cr/영상), MCP 3일 무료 체험(100cr, 자동갱신 주의) 경로 추가. MCP 연결 시 Claude가 생성~배치 직접 수행 |
| 2026-08-22 | 1.2 | Kling 무료 크레딧도 영상 생성 불가 확인(사용자) → 무료 검증 단계 폐기. Higgsfield Starter($19)로 시작해 필요 시 Plus 업그레이드하는 단계적 유료 경로로 재편 |
| 2026-08-22 | 1.1 | 도구 추천 정정: AI Studio Veo 무료 쿼터 소멸 확인(사용자) → 무료 검증은 Kling 중심, 제작 스프린트는 Higgsfield Plus 기본 추천. Veo 워터마크 주의 추가 |
| 2026-08-21 | 1.0 | 최초 작성 — 도구 추천, 제작 원칙, W2 스토리보드·프롬프트, 삽입 규약 |
