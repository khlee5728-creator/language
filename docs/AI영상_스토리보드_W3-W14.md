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
- **개념**: 동물 신호는 고정·유한(벌춤은 꿀 위치·품질만, 교재 p.18), 인간 언어는 창조적·무한
- **콩트**: 벌의 춤은 '꿀 위치'만 말한다. 강아지가 원툴 크리에이터를 평가한다

| 샷 | 길이 | 화면 | 대사(음성) | 말풍선 |
|---|---|---|---|---|
| 1 | 1.5s | 와이드: 넷이 꽃밭 옆 벌 한 마리를 관찰, 강아지도 곁에 | — | — |
| 2 | 2s | 벌 클로즈업: 8자 춤을 춤 | — | shout(벌 위): *waggle waggle* |
| 3 | 3.5s | 민트 클로즈업, 감탄하며 | "Nectar! 100 meters, that way!" | — (음성만) |
| 4 | 2s | 파랑 클로즈업, 강아지 쪽으로 몸 숙임 | "So… what did YOU do today?" | — |
| 5 | 3s | 강아지 클로즈업: 눈만 끔뻑, 꼬리 살랑 | — | think: *One topic: nectar. My guy needs new content.* |

  - 펀치라인 의도: 강아지가 벌을 '콘텐츠 원툴 크리에이터'처럼 평가 — "폐쇄적·고정 신호 체계"라는 교재 논지를 정확히 짚으면서 콘텐츠 문화 개그로 전달 (기존 *I keep my mysteries*는 '말 안 하는 선택'처럼 읽혀 논지와 어긋나 교체)
- **영상 프롬프트**: `Multi-shot 2D animation, five shots with clean cuts. Shot 1 (1.5s): wide shot, the four young adults and the fluffy brown puppy watch a single cartoon bee hovering by flowers in the park. Shot 2 (2s): close-up of the cute cartoon bee performing a figure-eight waggle dance in the air. Shot 3 (3.5s): close-up of the woman in the mint-green jacket, amazed, she says "Nectar! One hundred meters, that way!" in English. Shot 4 (2s): close-up of the man in the blue hoodie leaning down to the puppy, he asks "So… what did YOU do today?" in English. Shot 5 (3s): close-up of the fluffy brown puppy blinking slowly and wagging its tail, saying nothing.` + 공통 꼬리말
- **시안 프롬프트**(P1 머리말 +): `Wide shot in a sunny park: the four young adults crouch around flowers watching one cute cartoon bee in mid-air, the fluffy brown puppy sits beside them looking up at the bee.`

## W4 — Morphology Part 1 · 접두사 파생 "unfollow" (P1 웹툰)

- **파일**: `w04_toon_unfollow.mp4` (12초) · **삽입 위치**: Derivational·Inflectional 슬라이드 뒤
- **개념**: 접두사 un-·re-는 동사에 붙어 의미를 뒤집거나 반복한다 — 파생의 생산성 (un-+동사 p.45, re- 생산 규칙 p.62)
- **콩트**: 인스타 언팔·재팔 서사를 형태소 3개로 압축 — 접두사가 붙을 때마다 관계가 뒤집힌다
- ⚠️ 주의: **unlockable은 쓰지 않는다** — 교재에서 unlockable은 위계구조의 '구조적 중의성' 예시(p.51–52)로 **W5 진도 범위**. W4에서 소진 금지

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 1.5s | 와이드: 보라가 앞장서 걷고 민트가 뒤따라 걸음, 나머지 관람, 강아지도 관람 | — | — |
| 2 | 1.5s | 보라 클로즈업, 자신만만하게 앞서 걸으며 | "Follow!" | shout: follow |
| 3 | 2s | 민트 클로즈업, 획 돌아서며 단호하게 | "UN-follow!" | shout: **un**-follow! |
| 4 | 2.5s | 보라 충격 리액션 → 민트가 머쓱하게 슬금슬금 돌아오며 | "…Re-follow." | shout: **re**-follow… |
| 5 | 1.5s | 와이드: 넷이 웃음 터짐 | — | — |
| 6 | 3s | 강아지 클로즈업, 파랑 다리에 딱 붙어 앉아 올려다봄 | — | think: *Humans un-follow. Dogs just follow.* |

  - 펀치라인 의도: un-은 동사에 붙어 행위를 되돌린다는 규칙 + 개의 무조건 충성 개그. SNS 언팔/재팔 드라마라 20대 공감 극대화
- **영상 프롬프트**: `Multi-shot 2D animation, six shots with clean cuts. Shot 1 (1.5s): wide shot in the park, the man in the purple t-shirt walks ahead proudly and the woman in the mint jacket walks right behind him, the other two and the fluffy brown puppy watch. Shot 2 (1.5s): close-up of the man in the purple t-shirt striding confidently, he says "Follow!" Shot 3 (2s): close-up of the woman in the mint jacket spinning away dramatically, she says firmly "UN-follow!" Shot 4 (2.5s): the man in the purple t-shirt gasps in shock, then the woman in the mint jacket sheepishly shuffles back beside him, muttering "…Re-follow." Shot 5 (1.5s): wide shot, all four burst out laughing. Shot 6 (3s): close-up of the fluffy brown puppy sitting pressed against the blue-hoodie man's leg, gazing up loyally.` + 공통 꼬리말
- **시안**(P1 +): `Wide shot in a sunny park: the man in the purple t-shirt striding ahead proudly, the woman in the mint jacket right behind him mid-turn as if about to walk away, the other two watching amused, the fluffy brown puppy sitting pressed against the blue-hoodie man's leg.`

## W5 — Morphology Part 2 · 복수형 블로킹 (P1 웹툰)

- **파일**: `w05_toon_plurals.mp4` (12초) · **삽입 위치**: 굴절·blocking(policeman→policemen) 슬라이드 뒤
- **개념**: 불규칙형이 규칙형을 막는다(blocking) — 그러나 헤드가 없으면 규칙형 (walkman→walkmans는 교재 p.57의 실제 예시)
- **콩트**: 복수형 스피드 퀴즈. '워크맨이 뭔지 모른다'는 세대 자조 개그가 중간에 터진다

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 2s | 파랑 클로즈업(바로 퀴즈 시작), 자신만만 | "One man, two men!" | shout: men! |
| 2 | 2.5s | 보라 클로즈업, 더 자신만만 | "Policeman, policemen!" | shout: policemen! |
| 3 | 2.5s | 민트 클로즈업, 진심으로 갸웃하며 | "What IS a walkman?" | shout: what IS a walkman?? |
| 4 | 2s | 주황 클로즈업, 단호하게 정답 | "Walkmans! Duh." | shout: walkmans! |
| 5 | 3s | 강아지 클로즈업, 심판처럼 앞발 들어 승인 | — | think: *Ancient iPod. No man inside. Walkmans.* |

  - 메타 개그 의도: 2026년 대학생은 워크맨을 모른다 → 그 자체를 웃음 포인트로("What IS a walkman?"). 주황의 "Duh."는 설명 안 해주는 데드팬, 정작 설명은 강아지 펀치가 수행 — "기기 안에 man(사람)이 없다 → 규칙 복수형"이라는 headless 논지를 강아지가 정리
  - 타이밍: 오프닝 와이드 컷을 삭제하고 클로즈업으로 바로 시작(W13과 동일 패턴) — 12초 안에서 대사 길이 공식과 펀치라인 ≥3s를 모두 충족시키기 위함
- **영상 프롬프트**: `Multi-shot 2D animation, five shots with clean cuts. Shot 1 (2s): close-up of the man in the blue hoodie in the park, confidently saying "One man, two men!" like a quiz battle. Shot 2 (2.5s): close-up of the man in the purple t-shirt proudly saying "Policeman, policemen!" Shot 3 (2.5s): close-up of the woman in the mint jacket genuinely puzzled, asking "What IS a walkman?" Shot 4 (2s): close-up of the woman in the orange sweatshirt firmly saying "Walkmans! Duh." with a deadpan face. Shot 5 (3s): close-up of the fluffy brown puppy raising one front paw like a referee approving.` + 공통 꼬리말
- **시안**(P1 +): `Medium close-up in a sunny park: the man in the blue hoodie front and center mid-quiz with a confident grin, the other three visible behind him in two facing pairs like a friendly quiz battle, the fluffy brown puppy sitting between them looking like a tiny referee.`

## W6 — Syntax Part 1 · 구조적 중의성 (P1 웹툰)

- **파일**: `w06_toon_ambiguity.mp4` (12초) · **삽입 위치**: PP 부착 중의성(수형도) 슬라이드 뒤
- **개념**: 같은 문장, 두 구조 — "I saw a dog with binoculars"
- **콩트**: 한 문장을 두 그림으로 상상 — 두 번째 해석이 화면에 실제로 등장

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 3s | 파랑 클로즈업, 쌍안경을 들고 | "I saw a dog with binoculars!" | — |
| 2 | 2.5s | 민트 클로즈업, 갸웃 | "You had the binoculars… right?" | shout: …right? |
| 3 | 2.5s | 와이드: 모두가 강아지를 돌아봄 | — | — |
| 4 | 4s | 강아지 클로즈업: **쌍안경을 목에 건 채** 시치미 | — | think: *Or… the dog had them. Syntax decides.* |

- **영상 프롬프트**: `Multi-shot 2D animation, four shots with clean cuts. Shot 1 (3s): close-up of the man in the blue hoodie holding small binoculars, he says "I saw a dog with binoculars!" Shot 2 (2.5s): close-up of the woman in the mint jacket tilting her head skeptically, she asks "You had the binoculars… right?" Shot 3 (2.5s): wide shot, all four young adults slowly turn to look at the puppy. Shot 4 (4s): close-up of the fluffy brown puppy sitting innocently with a tiny pair of binoculars hanging around its neck, looking away whistling-innocent.` + 공통 꼬리말
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
| 1 | 1s | 와이드(3D): 피크닉 매트, 접시 위 간식 하나, 모두 주시 | — | — |
| 2 | 3.5s | 파랑 클로즈업, 간식을 가리키며 | "Puppy eats treat. Puppy = Agent!" | shout: Agent! |
| 3 | 3s | 민트 클로즈업, 접시를 가리키며 | "And the treat is the Theme." | shout: Theme! |
| 4 | 1.5s | 인서트: 접시가 어느새 비어 있음 | — | — |
| 5 | 3s | 강아지 클로즈업, 입가를 핥으며 | — | think: *Agent: me. Theme: gone. Source: the plate.* |

  - 펀치라인 의도: 의미역 3개를 8단어로 플렉스 — Source(이동의 출발점)는 교재의 실제 의미역이라 심화 포인트까지 겸함. '강아지가 사실 최고의 언어학자' 러닝개그 강화
- **영상 프롬프트**: `Multi-shot polished 3D animation, five shots with clean cuts. Shot 1 (1s): wide shot on a picnic mat in a pastel park, one dog treat on a small plate, the four young adults and the fluffy brown puppy all stare at it. Shot 2 (3.5s): close-up of the man in the blue hoodie pointing at the puppy then the treat, saying "Puppy eats treat. Puppy is the Agent!" Shot 3 (3s): close-up of the woman in the mint jacket pointing at the plate, saying "And the treat is the Theme." Shot 4 (1.5s): insert shot of the plate, now suddenly empty. Shot 5 (3s): close-up of the fluffy brown puppy licking its lips contentedly.` + 공통 꼬리말
- **시안**(P2 +): `Wide shot on a picnic mat in a pastel 3D park: one dog treat on a small plate at center, the four young adults sitting around it, the fluffy brown puppy staring intently at the treat.`

## W10 — Pragmatics · 간접화행 (P2 3D)

- **파일**: `w10_toon_speechacts.mp4` (12초) · **삽입 위치**: Speech Acts/간접화행 슬라이드 뒤
- **개념**: "Can you…?"는 능력 질문이 아니라 요청
- **콩트**: 가이드 §6의 소금 콩트 확정판 — 문자적 응답 vs 화용적 응답

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 1.5s | 와이드(3D): 야외 카페 테이블, 넷이 식사 중, 강아지는 테이블 아래 | — | — |
| 2 | 2.5s | 주황 클로즈업, 옆을 보며 공손히 | "Can you pass the salt?" | — |
| 3 | 3s | 보라 클로즈업, 소금통에 손 올린 채 해맑게 | "Yes, I can!" (그리고 가만히) | shout: Yes, I can! |
| 4 | 2s | 민트 클로즈업, 한숨 쉬며 소금을 대신 건넴 | — (한숨은 음성만, 말풍선 없음) | — |
| 5 | 3s | 강아지 클로즈업(테이블 아래), 체념한 표정 | — | think: *Humans never mean what they say.* |

- **영상 프롬프트**: `Multi-shot polished 3D animation, five shots with clean cuts. Shot 1 (1.5s): wide shot at an outdoor cafe table in a pastel park, the four young adults having lunch, the fluffy brown puppy sits under the table. Shot 2 (2.5s): close-up of the woman in the orange sweatshirt politely asking "Can you pass the salt?" Shot 3 (3s): close-up of the man in the purple t-shirt with his hand resting on the salt shaker, replying brightly "Yes, I can!" and then not moving at all. Shot 4 (2s): close-up of the woman in the mint jacket sighing and reaching over to pass the salt herself. Shot 5 (3s): close-up of the fluffy brown puppy under the table with a resigned deadpan expression.` + 공통 꼬리말
- **시안**(P2 +): `Wide shot at an outdoor cafe table in a pastel 3D park: the four young adults at lunch, a salt shaker at the center of the table, the fluffy brown puppy visible under the table.`

## W11 — Phonetics Part 1 · 조음 비트박스 배틀 (P2 3D)

- **파일**: `w11_toon_articulation.mp4` (11초) · **삽입 위치**: 조음 위치·방법 슬라이드 뒤
- **개념**: 말소리는 입술·혀의 위치와 방법으로 만들어진다 — **p·t·k는 비트박스의 기본 3음**(킥·하이햇·스네어)이라 조음 위치 학습과 정확히 겹침
- **콩트**: 발음 수업이 아니라 **길거리 비트박스 배틀**. 각자 자기 조음 위치로 사운드를 쌓고, 강아지의 비트박스는 샘플이 하나뿐
- 리프레임 의도: '수업 재연' 프레임(고리타분)을 버리고 같은 학습 포인트(양순/치경/연구개)를 힙합 배틀로 전달

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 2s | 와이드(3D): 파랑이 비트박스를 시작하자 셋이 환호하며 둘러쌈, 강아지 고개 까딱까딱 | — | — |
| 2 | 2s | 파랑 클로즈업, 입술 팡팡 터뜨리며 비트 | "P! P!" (비트박스 킥) | shout: p! (lips!) |
| 3 | 2s | 민트 클로즈업, 혀끝으로 티키타카 얹으며 | "T! T!" (하이햇) | shout: t! (tongue tip!) |
| 4 | 2s | 보라 클로즈업, 목 뒤에서 킥 얹으며 | "K! K!" (스네어) | shout: k! (back!) |
| 5 | 3s | 강아지 클로즈업, 심혈을 기울여 리듬 타다가 | "Woof." | think: *My beatbox: one sample.* |

- **영상 프롬프트**: `Multi-shot polished 3D animation, five shots with clean cuts. Shot 1 (2s): wide shot in a pastel park, the man in the blue hoodie starts beatboxing energetically and the other three gather around cheering like a street performance, the fluffy brown puppy bobs its head to the beat. Shot 2 (2s): close-up of the man in the blue hoodie beatboxing hard with exaggerated lip pops, rhythmically going "P! P!" Shot 3 (2s): close-up of the woman in the mint jacket layering crisp "T! T!" sounds with her tongue tip, grooving. Shot 4 (2s): close-up of the man in the purple t-shirt dropping deep "K! K!" sounds from the back of his mouth, nodding to the rhythm. Shot 5 (3s): close-up of the fluffy brown puppy bobbing to the beat, concentrating very hard, then letting out a single proud "Woof."` + 공통 꼬리말
- **시안**(P2 +): `Wide shot in a pastel 3D park: the man in the blue hoodie beatboxing with hands cupped near his mouth, the other three gathered around grooving and cheering like a street beatbox battle, the fluffy brown puppy bobbing its head to the beat.`

## W12 — Phonetics Part 2 · 운율 (P2 3D)

- **파일**: `w12_toon_prosody.mp4` (10초 — 샷 합계 10s) · **삽입 위치**: 억양(Intonation) 슬라이드 뒤
- **개념**: 같은 문장도 억양에 따라 평서/의문이 된다
- **콩트**: 억양 실험 — 강아지는 하울링으로 화답

| 샷 | 길이 | 화면 | 대사 | 말풍선 |
|---|---|---|---|---|
| 1 | 2.5s | 주황 클로즈업, 끝을 내리며 | "Dinner time.↘" | shout: Dinner time.↘ |
| 2 | 2.5s | 같은 주황 클로즈업, 끝을 올리며 | "Dinner time?↗" | shout: Dinner time?↗ |
| 3 | 2s | 와이드: 강아지가 벌떡 일어남 | — | — |
| 4 | 3s | 강아지 클로즈업, 하늘 향해 멜로디컬 하울링 | "Awoooo~" | think: *Rising, falling — I'm fluent in vibes.* |

  - 펀치라인 의도: '운율 = 분위기(vibe)'라는 개념 자체가 개그 소재 — 단어 없이 억양만으로 의미가 전달된다는 학습 포인트와 유행어가 정확히 일치

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
| 1 | 1s | 와이드(3D): 넷이 강아지 간식 상자를 두고 회의 | — | — |
| 2 | 2.5s | 보라 클로즈업, 상자를 들고 자신 있게 | "Let's name it… Blick!" | shout: Blick! |
| 3 | 1.5s | 와이드: 셋이 고개 끄덕끄덕 | "Ooh." (웅성) | — |
| 4 | 2.5s | 주황 클로즈업, 자신 있게 시작했다가 버벅임 | "Then… B-bn… Bnick…?!" | shout: Bnick…?! |
| 5 | 1.5s | 와이드: 모두 흠칫, 강아지는 귀를 접음 | — | — |
| 6 | 3s | 강아지 클로즈업, 앞발로 귀를 막은 채 | — | think: *Even my ears reject \\*bnick.* |

- **영상 프롬프트**: `Multi-shot polished 3D animation, six shots with clean cuts. Shot 1 (1s): wide shot in a pastel park, the four young adults hold a meeting around a plain treat box, the fluffy brown puppy sits at the table edge. Shot 2 (2.5s): close-up of the man in the purple t-shirt lifting the box confidently, saying "Let's name it… Blick!" Shot 3 (1.5s): wide shot, the other three nod approvingly with a soft "Ooh." Shot 4 (2.5s): close-up of the woman in the orange sweatshirt confidently announcing the next name, but she tries to say the impossible word "Bnick" and stumbles awkwardly over it, her confidence crumbling mid-word. Shot 5 (1.5s): wide shot, everyone flinches, the puppy folds its ears back. Shot 6 (3s): close-up of the fluffy brown puppy covering its ears with both front paws.` + 공통 꼬리말
- **제작 노트**: 음성 모델이 *bnick*을 "buh-nick"으로 낼 가능성이 높음 — 이를 실패가 아니라 **개그 포인트**로 설계(영어 화자는 bn-을 발음하지 못한다는 음소배열 제약의 산 증거). 생성 결과에서 버벅임이 안 나오면 리테이크 대신 그대로 사용 가능 여부를 판단할 것 (발음이 매끄럽게 나와버리면 개그가 죽으므로 그 경우만 리테이크)
- **시안**(P2 +): `Wide shot in a pastel 3D park: the four young adults in a naming meeting around a plain blank treat box (no letters), the fluffy brown puppy at the table edge with one ear folded.`

---

## 변경 이력
| 날짜 | 버전 | 내용 |
|---|---|---|
| 2026-08-26 | 1.0 | W2 재생성 스펙 + W3~W14 11편 스토리보드·시안/영상 프롬프트·말풍선 스크립트·예산 |
| 2026-08-28 | 1.2 | 자막 표준 도입(사용자 피드백: 음성≠말풍선 불일치가 오류처럼 보임): 대사는 하단 자막(`.cue.sub`)에 원문 그대로+키워드 `<b>` 강조+`gl` 주석, 말풍선은 무성 채널(강아지 think·벌 SFX)만 유지. 발화 구간은 오디오 RMS 실측(measure_speech.py)으로 싱크. 각 주차 표의 '말풍선' 칼럼은 이 규칙으로 재해석할 것 |
| 2026-08-27 | 1.1 | 교재 대조 검토 반영: ① W4 전면 교체(unlockable→unfollow — unlockable은 교재 p.51–52 구조적 중의성 예시로 W5 범위, W4 소진 금지) ② 컷 배분 공식 위반 수정(W3·W5·W6·W9) + 펀치라인 ≥3s 일괄 준수(W5 재구성·W9·W10·W14 리밸런스) ③ 유머 업그레이드 — W3 펀치("one topic" 크리에이터 개그, 정합성 겸), W5 워크맨 메타 개그("What IS a walkman?"), W9 의미역 3종 플렉스 펀치, W11 비트박스 배틀 리프레임, W12 vibes 펀치, W10 sigh 풍선 삭제 ④ W14 *bnick* 버벅임을 개그 포인트로 설계(제작 노트) |
