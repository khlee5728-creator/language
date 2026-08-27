# AI 카툰 콩트 스토리보드 — W3~W14 (+W2 재생성)

> Plus 크레딧 지급(~8/27) 후 일괄 생성용 사전 제작 문서. 규칙은 `AI영상_제작가이드.md` §1.5·§2 준수.
> 작성: 2026-08-26 · 전 콩트는 오리지널 창작(교재 카툰 복제 아님)

## 공통 규격

- **고정 출연진**: 파랑 후드 남(EN) · 보라 티셔츠 남(FR/개념) · 민트 자켓 여(DE/개념) · 주황 스웨트셔츠 여(KO/개념) + 갈색 복슬 강아지
- **화풍**: Phase 1(W3~W7) = 한국 웹툰풍 2D / Phase 2(W9~W14) = 파스텔 폴리시드 3D
- **모델·비용**: 시안 = Nano Banana Pro 2cr → 시작프레임 i2v = Kling 3.0 **pro+sound 멀티샷** 25cr (대사 없는 콘셉트 연출은 Veo 3.1 22cr 가능)
- **컷 배분 규칙**: 한 단어 외침 1.5–2초 / 문장 컷 = 글자수÷12 + 리액션 1초 / **펀치라인 컷 ≥ 3초**
- **영상 내 텍스트 금지** — 말풍선은 슬라이드 HTML 큐(`shout`/`think`), 생성 후 OpenCV 컷 실측 → 큐 배치
- 파일명: `w{NN}_toon_{topic}.mp4` · 16:9 · 무자막 · 공원 앰비언스

### 시안 프롬프트 공통 머리말
- **P1(웹툰)**: `Modern Korean webtoon 2D animation still, full-bleed composition filling the entire 16:9 frame edge to edge — no borders, no margins, no letterboxing. Clean crisp lineart, vibrant flat colors with soft gradient shading, expressive faces, trendy casual outfits.` + 출연진 고정 묘사(파랑 후드 남/보라 티 남/민트 자켓 여/주황 스웨트 여/갈색 복슬 강아지) + `No text, no captions, no watermark.`
- **P2(3D)**: `Polished 3D animation still, full-bleed 16:9 — high-end animated-feature look, soft global illumination, warm pastel palette, gentle depth of field, cute stylized characters.` + 동일 출연진 + `No text, no captions, no watermark.`

### 영상 프롬프트 공통 꼬리말
`Preserve the exact art style, lineart/render, colors, and character designs of the reference image across all shots. Each spoken line is heard ONLY while its speaker is on screen, with clear mouth movement synced to the voice. Light park ambience under the voices. Absolutely no on-screen text, no subtitles, no captions, no watermark.`

### 생성 체크리스트 (매 주차)
1. 시안 생성(2cr) → 화풍·출연진 확인 → 2. i2v 멀티샷 생성(25cr) → 3. OpenCV 프레임 차분으로 컷 실측 → 4. 말풍선 큐 배치(대사=shout, 펀치라인=think, 컷 경계 ±0.15s 인셋) → 5. 노출 부족 시 `data-slow` → 6. 슬라이드 삽입·검증

### 예산 (1,000cr 기준)
| 항목 | 수량 | 크레딧 |
|---|---|---|
| W3~W14 신규 11편 (시안2+영상25) | 11 | 297 |
| W2 재생성 (강아지 컷 확장) | 1 | 25 |
| 리테이크 버퍼 (~40%) | — | ~130 |
| **소계** | | **~450** |
| 잔여 → 쇼츠(9:16) 변환·W1 인트로·다음 학기 | | ~550 |

---

## W2 재생성 스펙 (기존 컷 구조 유지 + 펀치라인 컷 확장)

- **파일**: `w02_toon_arbitrariness.mp4` 교체 · 시작프레임 재사용(job 720de8f0) · Kling pro+sound, **duration 12**
- 변경점: 마지막 강아지 컷을 **0.7초 → 3초**로. 프롬프트의 샷 배분만 수정:
  - Shot 1 와이드 1s → Shot 2~5 화자 클로즈업 각 2s ("dog!"/"chien!"/"Hund!"/"gae!") → **Shot 6 강아지 클로즈업 3s** (고개 갸웃→카메라 응시→꼬리)
- 프롬프트는 기존 멀티샷 프롬프트에서 `duration`과 샷 시간만 수정. 슬로모(`data-slow`) 제거하고 실컷으로 노출 확보.

---

## W3 — What Is Language? Part 2 · 동물의 의사소통 (P1 웹툰)

- **파일**: `w03_toon_beedance.mp4` (12초) · **삽입 위치**: The Birds and the Bees 슬라이드 뒤
- **개념**: 동물 신호는 고정·유한, 인간 언어는 창조적·무한
- **콩트**: 벌의 춤은 '꿀 위치'만 말한다. 강아지에게 오늘 하루를 물어보지만…

| 샷 | 길이 | 화면 | 대사(음성) | 말풍선 |
|---|---|---|---|---|
| 1 | 2s | 와이드: 넷이 꽃밭 옆 벌 한 마리를 관찰, 강아지도 곁에 | — | — |
| 2 | 2.5s | 벌 클로즈업: 8자 춤을 춤 | — | shout(벌 위): *waggle waggle* |
| 3 | 2.5s | 민트 클로즈업, 감탄하며 | "It says: nectar, 100 meters, that way!" | — (음성만) |
| 4 | 2s | 파랑 클로즈업, 강아지 쪽으로 몸 숙임 | "So… what did YOU do today?" | — |
| 5 | 3s | 강아지 클로즈업: 눈만 끔뻑, 꼬리 살랑 | — | think: *Bees report nectar. I keep my mysteries.* |

- **영상 프롬프트**: `Multi-shot 2D animation, five shots with clean cuts. Shot 1 (2s): wide shot, the four young adults and the fluffy brown puppy watch a single cartoon bee hovering by flowers in the park. Shot 2 (2.5s): close-up of the cute cartoon bee performing a figure-eight waggle dance in the air. Shot 3 (2.5s): close-up of the woman in the mint-green jacket, amazed, she says "It says: nectar, one hundred meters, that way!" in English. Shot 4 (2s): close-up of the man in the blue hoodie leaning down to the puppy, he asks "So… what did YOU do today?" in English. Shot 5 (3s): close-up of the fluffy brown puppy blinking slowly and wagging its tail, saying nothing.` + 공통 꼬리말
- **시안 프롬프트**(P1 머리말 +): `Wide shot in a sunny park: the four young adults crouch around flowers watching one cute cartoon bee in mid-air, the fluffy brown puppy sits beside them looking up at the bee.`

## W4 — Morphology Part 1 · 형태소 조립 (P1 웹툰)

- **파일**: `w04_toon_morphemes.mp4` (12초) · **삽입 위치**: Derivational·Inflectional 슬라이드 뒤
- **개념**: 단어는 형태소 블록의 조립 — un + lock + able
- **콩트**: 셋이 형태소를 하나씩 외치면 블록이 조립된다. 강아지는 응용 실패(?)

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 1.5s | 와이드: 셋이 큰 장난감 블록 3개를 들고 서 있음, 강아지 관람 | — | — |
| 2 | 1.5s | 보라 클로즈업, 첫 블록을 들어올림 | "un-!" | shout: un- |
| 3 | 1.5s | 민트 클로즈업, 둘째 블록 | "lock!" | shout: lock |
| 4 | 1.5s | 주황 클로즈업, 셋째 블록 | "-able!" | shout: -able |
| 5 | 3s | 와이드: 셋이 블록을 합체시키며 환호 | "Unlockable!" (합창) | shout(중앙): unlockable! |
| 6 | 3s | 강아지 클로즈업, 간식 캔 앞에서 시무룩 | — | think: *"Un-treat-able"? No. Every treat is treatable.* |

- **영상 프롬프트**: `Multi-shot 2D animation, six shots with clean cuts. Shot 1 (1.5s): wide shot in the park, three young adults each hold one big colorful toy block, the fluffy brown puppy watches. Shot 2 (1.5s): close-up of the man in the purple t-shirt raising his block, he shouts "un!" Shot 3 (1.5s): close-up of the woman in the mint jacket raising her block, she shouts "lock!" Shot 4 (1.5s): close-up of the woman in the orange sweatshirt raising her block, she shouts "able!" Shot 5 (3s): wide shot, the three snap the blocks together in the air and cheer together "Unlockable!" happily. Shot 6 (3s): close-up of the fluffy brown puppy sitting sulkily in front of a closed treat tin, ears drooping.` + 공통 꼬리말
- **시안**(P1 +): `Wide shot in a sunny park: three young adults each holding one big colorful blank toy block (no letters on blocks), the man in the blue hoodie stands aside smiling, the fluffy brown puppy watches curiously.`

## W5 — Morphology Part 2 · 복수형 블로킹 (P1 웹툰)

- **파일**: `w05_toon_plurals.mp4` (12초) · **삽입 위치**: 굴절·blocking(policeman→policemen) 슬라이드 뒤
- **개념**: 불규칙형이 규칙형을 막는다(blocking) — 그러나 헤드가 없으면 규칙형
- **콩트**: 복수형 스피드 퀴즈. 마지막 문제에서 모두가 갸웃

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 1.5s | 와이드: 퀴즈쇼처럼 마주 선 넷, 강아지가 심판석(?) | — | — |
| 2 | 2s | 파랑 클로즈업, 자신만만 | "One man, two men!" | shout: men! |
| 3 | 2s | 보라 클로즈업, 더 자신만만 | "One policeman, two policemen!" | shout: policemen! |
| 4 | 2.5s | 민트 클로즈업, 헷갈리기 시작 | "One walkman… two walk…men??" | shout: walk…men?? |
| 5 | 2s | 주황 클로즈업, 단호하게 정답 | "Walkmans!" | shout: walkmans! |
| 6 | 2s | 강아지 클로즈업, 심판처럼 앞발 들어 승인 | — | think: *Correct. No man inside a Walkman.* |

- **영상 프롬프트**: `Multi-shot 2D animation, six shots with clean cuts. Shot 1 (1.5s): wide shot, the four young adults stand in two facing pairs like a quiz battle in the park, the fluffy brown puppy sits between them like a referee. Shot 2 (2s): close-up of the man in the blue hoodie confidently saying "One man, two men!" Shot 3 (2s): close-up of the man in the purple t-shirt proudly saying "One policeman, two policemen!" Shot 4 (2.5s): close-up of the woman in the mint jacket getting confused, saying hesitantly "One walkman… two walk…men??" Shot 5 (2s): close-up of the woman in the orange sweatshirt firmly saying "Walkmans!" Shot 6 (2s): close-up of the fluffy brown puppy raising one front paw like a referee approving.` + 공통 꼬리말
- **시안**(P1 +): `Wide shot in a sunny park: the four young adults stand in two facing pairs like a friendly quiz battle, the fluffy brown puppy sits between them looking like a tiny referee.`

## W6 — Syntax Part 1 · 구조적 중의성 (P1 웹툰)

- **파일**: `w06_toon_ambiguity.mp4` (12초) · **삽입 위치**: PP 부착 중의성(수형도) 슬라이드 뒤
- **개념**: 같은 문장, 두 구조 — "I saw a dog with binoculars"
- **콩트**: 한 문장을 두 그림으로 상상 — 두 번째 해석이 화면에 실제로 등장

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 2.5s | 파랑 클로즈업, 쌍안경을 들고 | "I saw a dog with binoculars!" | — |
| 2 | 2.5s | 민트 클로즈업, 갸웃 | "You had the binoculars… right?" | shout: …right? |
| 3 | 3s | 와이드: 모두가 강아지를 돌아봄 | — | — |
| 4 | 4s | 강아지 클로즈업: **쌍안경을 목에 건 채** 시치미 | — | think: *Or… the dog had them. Syntax decides.* |

- **영상 프롬프트**: `Multi-shot 2D animation, four shots with clean cuts. Shot 1 (2.5s): close-up of the man in the blue hoodie holding small binoculars, he says "I saw a dog with binoculars!" Shot 2 (2.5s): close-up of the woman in the mint jacket tilting her head skeptically, she asks "You had the binoculars… right?" Shot 3 (3s): wide shot, all four young adults slowly turn to look at the puppy. Shot 4 (4s): close-up of the fluffy brown puppy sitting innocently with a tiny pair of binoculars hanging around its neck, looking away whistling-innocent.` + 공통 꼬리말
- **시안**(P1 +): `Wide shot in a sunny park: the man in the blue hoodie holds small binoculars mid-story, the other three listen, the fluffy brown puppy sits nearby with a tiny pair of binoculars hanging around its neck.`

## W7 — Syntax Part 2 · 의문문 만들기 (P1 웹툰)

- **파일**: `w07_toon_questions.mp4` (11초) · **삽입 위치**: 조동사 도치(Aux inversion) 슬라이드 뒤
- **개념**: 의문문은 단어 이동(구조 의존적 규칙)
- **콩트**: 평서문 → 의문문 변환 놀이, 강아지가 최대 수혜자

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 3s | 보라 클로즈업, 또박또박 | "You can pet the dog." | — |
| 2 | 3s | 주황 클로즈업, 앞 단어를 낚아채듯 손짓하며 | "CAN you pet the dog?" | shout: Can → you? |
| 3 | 2s | 와이드: 넷이 강아지 쪽으로 우르르 | — | — |
| 4 | 3s | 강아지 클로즈업, 배를 보이며 벌러덩 | — | think: *Statement or question — the answer is yes.* |

- **영상 프롬프트**: `Multi-shot 2D animation, four shots with clean cuts. Shot 1 (3s): close-up of the man in the purple t-shirt saying slowly and clearly "You can pet the dog." Shot 2 (3s): close-up of the woman in the orange sweatshirt making a playful grabbing gesture as if moving a word to the front, she says "CAN you pet the dog?" Shot 3 (2s): wide shot, all four rush happily toward the puppy. Shot 4 (3s): close-up of the fluffy brown puppy flopping over to show its belly, delighted.` + 공통 꼬리말
- **시안**(P1 +): `Wide shot in a sunny park: the man in the purple t-shirt speaking, the woman in the orange sweatshirt making a playful word-grabbing gesture, the other two smiling, the fluffy brown puppy sitting expectantly in front of them.`

---

## W9 — Semantics · 의미역 (P2 3D 시작)

- **파일**: `w09_toon_thetaroles.mp4` (12초) · **삽입 위치**: Thematic Roles 슬라이드 뒤
- **개념**: 행위자(Agent)·대상(Theme) — 문장 속 역할
- **콩트**: 간식 하나를 두고 '누가 Agent인가' 논쟁 · **화풍 전환 첫 편(중간고사 후 새 느낌)**

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 2s | 와이드(3D): 피크닉 매트, 접시 위 간식 하나, 모두 주시 | — | — |
| 2 | 3s | 파랑 클로즈업, 간식을 가리키며 | "The puppy eats the treat. Puppy = Agent!" | shout: Agent! |
| 3 | 3s | 민트 클로즈업, 접시를 가리키며 | "And the treat is the Theme." | shout: Theme! |
| 4 | 1.5s | 인서트: 접시가 어느새 비어 있음 | — | — |
| 5 | 2.5s | 강아지 클로즈업, 입가를 핥으며 | — | think: *Agent of eating. Always.* |

- **영상 프롬프트**: `Multi-shot polished 3D animation, five shots with clean cuts. Shot 1 (2s): wide shot on a picnic mat in a pastel park, one dog treat on a small plate, the four young adults and the fluffy brown puppy all stare at it. Shot 2 (3s): close-up of the man in the blue hoodie pointing at the puppy then the treat, saying "The puppy eats the treat. Puppy is the Agent!" Shot 3 (3s): close-up of the woman in the mint jacket pointing at the plate, saying "And the treat is the Theme." Shot 4 (1.5s): insert shot of the plate, now suddenly empty. Shot 5 (2.5s): close-up of the fluffy brown puppy licking its lips contentedly.` + 공통 꼬리말
- **시안**(P2 +): `Wide shot on a picnic mat in a pastel 3D park: one dog treat on a small plate at center, the four young adults sitting around it, the fluffy brown puppy staring intently at the treat.`

## W10 — Pragmatics · 간접화행 (P2 3D)

- **파일**: `w10_toon_speechacts.mp4` (12초) · **삽입 위치**: Speech Acts/간접화행 슬라이드 뒤
- **개념**: "Can you…?"는 능력 질문이 아니라 요청
- **콩트**: 가이드 §6의 소금 콩트 확정판 — 문자적 응답 vs 화용적 응답

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 2s | 와이드(3D): 야외 카페 테이블, 넷이 식사 중, 강아지는 테이블 아래 | — | — |
| 2 | 2.5s | 주황 클로즈업, 옆을 보며 공손히 | "Can you pass the salt?" | — |
| 3 | 3s | 보라 클로즈업, 소금통에 손 올린 채 해맑게 | "Yes, I can!" (그리고 가만히) | shout: Yes, I can! |
| 4 | 2s | 민트 클로즈업, 한숨 쉬며 소금을 대신 건넴 | — | shout: *sigh* |
| 5 | 2.5s | 강아지 클로즈업(테이블 아래), 체념한 표정 | — | think: *Humans never mean what they say.* |

- **영상 프롬프트**: `Multi-shot polished 3D animation, five shots with clean cuts. Shot 1 (2s): wide shot at an outdoor cafe table in a pastel park, the four young adults having lunch, the fluffy brown puppy sits under the table. Shot 2 (2.5s): close-up of the woman in the orange sweatshirt politely asking "Can you pass the salt?" Shot 3 (3s): close-up of the man in the purple t-shirt with his hand resting on the salt shaker, replying brightly "Yes, I can!" and then not moving at all. Shot 4 (2s): close-up of the woman in the mint jacket sighing and reaching over to pass the salt herself. Shot 5 (2.5s): close-up of the fluffy brown puppy under the table with a resigned deadpan expression.` + 공통 꼬리말
- **시안**(P2 +): `Wide shot at an outdoor cafe table in a pastel 3D park: the four young adults at lunch, a salt shaker at the center of the table, the fluffy brown puppy visible under the table.`

## W11 — Phonetics Part 1 · 조음 (P2 3D)

- **파일**: `w11_toon_articulation.mp4` (11초) · **삽입 위치**: 조음 위치·방법 슬라이드 뒤
- **개념**: 말소리는 입술·혀의 위치와 방법으로 만들어진다
- **콩트**: 조음 따라하기 수업 — 강아지의 조음기관은 하나뿐

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 2s | 와이드(3D): 넷이 발음 연습하듯 마주 봄, 강아지도 대열에 | — | — |
| 2 | 2s | 파랑 클로즈업, 입술 강조하며 | "P! P! Lips together!" | shout: p! |
| 3 | 2s | 민트 클로즈업, 혀끝 강조하며 | "T! T! Tongue tip!" | shout: t! |
| 4 | 2s | 보라 클로즈업, 목 뒤쪽 가리키며 | "K! K! Back of the tongue!" | shout: k! |
| 5 | 3s | 강아지 클로즈업, 심혈을 기울여 입을 열더니 | "Woof." | think: *My place of articulation: snout.* |

- **영상 프롬프트**: `Multi-shot polished 3D animation, five shots with clean cuts. Shot 1 (2s): wide shot in a pastel park, the four young adults face each other like a pronunciation class, the fluffy brown puppy sits in line with them. Shot 2 (2s): close-up of the man in the blue hoodie exaggerating his lips, saying "P! P! Lips together!" Shot 3 (2s): close-up of the woman in the mint jacket pointing at her tongue tip, saying "T! T! Tongue tip!" Shot 4 (2s): close-up of the man in the purple t-shirt pointing toward the back of his mouth, saying "K! K! Back of the tongue!" Shot 5 (3s): close-up of the fluffy brown puppy concentrating very hard, opening its mouth… and letting out a single proud "Woof."` + 공통 꼬리말
- **시안**(P2 +): `Wide shot in a pastel 3D park: the four young adults standing in a row like a pronunciation class exaggerating mouth shapes, the fluffy brown puppy sitting at the end of the row with its mouth open mid-woof.`

## W12 — Phonetics Part 2 · 운율 (P2 3D)

- **파일**: `w12_toon_prosody.mp4` (11초) · **삽입 위치**: 억양(Intonation) 슬라이드 뒤
- **개념**: 같은 문장도 억양에 따라 평서/의문이 된다
- **콩트**: 억양 실험 — 강아지는 하울링으로 화답

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 2.5s | 주황 클로즈업, 끝을 내리며 | "Dinner time.↘" | shout: Dinner time.↘ |
| 2 | 2.5s | 같은 주황 클로즈업, 끝을 올리며 | "Dinner time?↗" | shout: Dinner time?↗ |
| 3 | 2s | 와이드: 강아지가 벌떡 일어남 | — | — |
| 4 | 3s | 강아지 클로즈업, 하늘 향해 멜로디컬 하울링 | "Awoooo~" | think: *I only speak intonation.* |

- **영상 프롬프트**: `Multi-shot polished 3D animation, four shots with clean cuts. Shot 1 (2.5s): close-up of the woman in the orange sweatshirt saying "Dinner time." with falling intonation and a calm face. Shot 2 (2.5s): the same close-up framing, she says "Dinner time?" with rising intonation and raised eyebrows. Shot 3 (2s): wide shot in the pastel park, the fluffy brown puppy springs up excitedly. Shot 4 (3s): close-up of the fluffy brown puppy howling melodically toward the sky, "Awoooo".` + 공통 꼬리말
- **시안**(P2 +): `Wide shot in a pastel 3D park at golden hour: the woman in the orange sweatshirt speaking with expressive intonation, the other three watching, the fluffy brown puppy mid-jump with excitement.`

## W13 — Phonology Part 1 · 최소대립쌍 (P2 3D)

- **파일**: `w13_toon_minimalpairs.mp4` (12초) · **삽입 위치**: 최소대립쌍/음소 슬라이드 뒤
- **개념**: 모음 하나가 단어(의미)를 바꾼다 — ship/sheep
- **콩트**: 발음 하나 차이로 양이 등장하는 사태

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 2.5s | 파랑 클로즈업, 바다 쪽을 가리키며 | "Look! A ship!" | shout: ship! |
| 2 | 2.5s | 민트 클로즈업, 반대쪽을 가리키며 | "No — a sheep!" | shout: sheep! |
| 3 | 2.5s | 와이드: 두 사람 사이에 **진짜 양 한 마리**가 서 있음, 모두 경악 | — | — |
| 4 | 1.5s | 인서트: 양과 강아지가 마주 봄 | — | — |
| 5 | 3s | 강아지 클로즈업, 진지한 표정 | — | think: *One vowel. Whole different animal.* |

- **영상 프롬프트**: `Multi-shot polished 3D animation, five shots with clean cuts. Shot 1 (2.5s): close-up of the man in the blue hoodie pointing into the distance, saying "Look! A ship!" Shot 2 (2.5s): close-up of the woman in the mint jacket pointing the other way, saying "No — a sheep!" Shot 3 (2.5s): wide shot in the pastel park, a fluffy white cartoon sheep now stands between the four startled young adults. Shot 4 (1.5s): insert shot, the sheep and the fluffy brown puppy stare at each other face to face. Shot 5 (3s): close-up of the fluffy brown puppy with a very serious scholarly expression.` + 공통 꼬리말
- **시안**(P2 +): `Wide shot in a pastel 3D park: the four young adults startled, a fluffy white cartoon sheep standing in their middle, the fluffy brown puppy facing the sheep nose to nose.`

## W14 — Phonology Part 2 · 음소배열 제약 (P2 3D)

- **파일**: `w14_toon_phonotactics.mp4` (12초) · **삽입 위치**: 음소배열/가능한 단어 슬라이드 뒤
- **개념**: 가능한 비단어(blick) vs 불가능한 배열(*bnick)
- **콩트**: 신제품 이름 짓기 회의 — 어떤 이름은 '들리자마자' 탈락

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 1.5s | 와이드(3D): 넷이 강아지 간식 상자를 두고 회의 | — | — |
| 2 | 2.5s | 보라 클로즈업, 상자를 들고 자신 있게 | "Let's name it… Blick!" | shout: Blick! |
| 3 | 2s | 와이드: 셋이 고개 끄덕끄덕 | "Ooh." (웅성) | — |
| 4 | 2.5s | 주황 클로즈업, 더 자신 있게 | "Then… Bnick!" | shout: Bnick…?! |
| 5 | 1.5s | 와이드: 모두 흠칫, 강아지는 귀를 접음 | — | — |
| 6 | 2.5s | 강아지 클로즈업, 앞발로 귀를 막은 채 | — | think: *Even my ears reject \\*bnick.* |

- **영상 프롬프트**: `Multi-shot polished 3D animation, six shots with clean cuts. Shot 1 (1.5s): wide shot in a pastel park, the four young adults hold a meeting around a plain treat box, the fluffy brown puppy sits at the table edge. Shot 2 (2.5s): close-up of the man in the purple t-shirt lifting the box confidently, saying "Let's name it… Blick!" Shot 3 (2s): wide shot, the other three nod approvingly with a soft "Ooh." Shot 4 (2.5s): close-up of the woman in the orange sweatshirt saying even more confidently "Then… Bnick!" Shot 5 (1.5s): wide shot, everyone flinches, the puppy folds its ears back. Shot 6 (2.5s): close-up of the fluffy brown puppy covering its ears with both front paws.` + 공통 꼬리말
- **시안**(P2 +): `Wide shot in a pastel 3D park: the four young adults in a naming meeting around a plain blank treat box (no letters), the fluffy brown puppy at the table edge with one ear folded.`

---

## 변경 이력
| 날짜 | 버전 | 내용 |
|---|---|---|
| 2026-08-26 | 1.0 | W2 재생성 스펙 + W3~W14 11편 스토리보드·시안/영상 프롬프트·말풍선 스크립트·예산 |
