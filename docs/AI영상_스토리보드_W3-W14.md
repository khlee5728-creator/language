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
1. 시안 생성(2cr) → 화풍·출연진 확인(기준 프레임 참조 필수) → 2. i2v 멀티샷 생성(25cr) → 3. **오디오 전사 검수**(faster-whisper, scratchpad `transcribe.py`) — 대사가 스토리보드와 일치하지 않으면 **채택 금지, 리테이크**(W2 재생성 사고: "dog/chien/Hund/gae"가 "Can't give phone dog…"로 생성됨) → 4. OpenCV 컷 실측 + 오디오 RMS 발화 실측 → 5. 자막(.cue.sub) 배치, 무성 채널만 말풍선 → 6. 노출 부족 시 `data-slow` → 7. 슬라이드 삽입·`/verify-decks`

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

- **파일**: `w03_toon_translator.mp4` (12초) · **삽입 위치**: The Birds and the Bees 슬라이드 뒤
- **개념**: 동물 신호의 레퍼토리는 고정·유한(교재 pp.17–18: 신호 목록은 닫혀 있고 주제는 늘 같다), 인간 언어는 창조적·무한
- **콩트(v2)**: 반려동물 번역기 앱 — 뭘 물어도 번역은 "Food. Play. Food." 그리고 강아지는 그 번역에 만족한다
- 이력: v1 벌춤 콩트는 사용자 피드백("요즘 세대 공감 어려움")으로 교체. 시안 2회 실패(민트 캐릭터 복제) → "reference의 그룹 그대로 + 변경점 하나만" 방식으로 해결

| 샷 | 길이 | 화면 | 대사(음성) | 자막/풍선 |
|---|---|---|---|---|
| 1 | 1s | 와이드: 민트가 폰을 강아지에게 들이댐(번역 앱), 셋이 구경 | — | — |
| 2 | 1.5s | 강아지 클로즈업, 신나게 | "Woof! Woof woof!" | — (동물 소리, 자막 생략) |
| 3 | 1.8s | 폰 인서트(뒷면만), 로봇 음성 | "Food. Play. Food." | sub + gl `TRANSLATOR APP` |
| 4 | 1.8s | 파랑 클로즈업, 진지하게 | "Ask him how he feels!" | sub |
| 5 | 1.7s | 민트 클로즈업, 강아지에게 숙이고 다정하게 | "How do you feel?" | sub |
| 6 | 1.2s | 강아지 클로즈업, 골똘히 생각하다 진지하게 한 번 | "Woof!" | — (번역 대상 발화 — 사용자 수정 v3: 이 샷이 빠지면 번역할 대상이 없어 논리 공백) |
| 7 | 1s | 폰 인서트(뒷면만), 무심한 로봇 음성 | "…Food." | sub |
| 8 | 2s | 강아지 클로즈업, 깊이 만족한 미소 | — | think: *Finally, someone who gets me.* |

  - 펀치라인 의도: 번역이 세 단어뿐(신호 레퍼토리의 유한성) + 강아지는 그 번역이 정확하다고 만족하는 반전. 실사용 앱(MeowTalk류)이 소재라 공감 즉발
- **영상 프롬프트**: `Multi-shot 2D animation, seven shots with clean cuts. Shot 1 (1s): the wide establishing shot from the reference image — the woman in the mint-green jacket bends forward holding her smartphone toward the fluffy brown puppy like a pet-translator app, the other three lean in curiously. Shot 2 (1.5s): close-up of the fluffy brown puppy barking happily, "Woof! Woof woof!" Shot 3 (2s): close-up of the smartphone held in the mint-jacket woman's hand (screen facing away, no visible screen content), a flat robotic text-to-speech voice from the phone says "Food. Play. Food." Shot 4 (2.2s): close-up of the man in the blue hoodie saying earnestly "Ask him how he feels!" Shot 5 (2s): close-up of the woman in the mint-green jacket bending down to the puppy, asking gently "How do you feel?" Shot 6 (1s): insert shot of the smartphone again, the flat robotic voice replies "Food." Shot 7 (2.3s): close-up of the fluffy brown puppy with a deeply content smile, wagging its tail slowly.` + 공통 꼬리말(로봇 음성은 폰 샷에서만 들린다는 단서 추가)
- **시안 프롬프트**(P1 머리말 +, 시안 job `29f3046c-…`): `Recreate the reference image's exact grouping … Only ONE change: the mint-jacket woman bends forward holding her smartphone down toward the puppy (screen turned away, blank).` — ⚠️ 무릎 꿇기 등 별도 자세 그룹으로 묘사하면 캐릭터가 복제됨(2회 실패 전례). "기준 이미지 그룹 유지 + 단일 변경점" 문형을 쓸 것

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

- **파일**: `w12_toon_prosody.mp4` (12초) · **삽입 위치**: 억양(Intonation) 슬라이드 뒤
- **개념**: 같은 단어도 억양에 따라 태도(무관심/놀람/의심)가 달라진다 — 억양은 화자의 태도 채널
- **콩트(v2 "Really" 3단, 사용자 채택)**: 보라의 자랑에 셋이 같은 단어 "Really"를 세 억양으로 받는다. 한국어 "진짜~/진짜?!/진짜…"와 동일 현상이라 공감 즉발
- 이력: v1 "Dinner time" 2단+하울링 → v2로 교체(3단 대비가 더 풍부, 펀치라인 난이도도 하향)

| 샷 | 길이 | 화면 | 대사 | 자막 |
|---|---|---|---|---|
| 1 | 2.5s | 보라 클로즈업, 자랑스럽게 | "I ran ten kilometers this morning!" | sub |
| 2 | 1.8s | 파랑 클로즈업, 시큰둥 데드팬 | "Really.↘" | sub + gl `FLAT — 무관심` |
| 3 | 1.8s | 주황 클로즈업, 눈 커지며 | "Really?!↗" | sub + gl `RISING — 놀람` |
| 4 | 2.2s | 민트 클로즈업, 팔짱+실눈 | "Reeeally…↘" | sub + gl `DRAWL — 의심` |
| 5 | 1.5s | 와이드: 보라 머쓱하게 머리 긁적, 셋은 웃음 참기 | — | — |
| 6 | 2.2s | 강아지 단독 클로즈업, 좌우로 갸웃 | — | think: *Same word. Three faces.* |

  - 펀치라인 의도: 같은 단어가 세 표정(=태도)이 된다는 관찰 — 기초 단어 4개로 학습 포인트 직진

- **영상 프롬프트**: `Multi-shot polished 3D animation, four shots with clean cuts. Shot 1 (2.5s): close-up of the woman in the orange sweatshirt saying "Dinner time." with falling intonation and a calm face. Shot 2 (2.5s): the same close-up framing, she says "Dinner time?" with rising intonation and raised eyebrows. Shot 3 (2s): wide shot in the pastel park, the fluffy brown puppy springs up excitedly. Shot 4 (3s): close-up of the fluffy brown puppy howling melodically toward the sky, "Awoooo".` + 공통 꼬리말
- **시안**(P2 +): `Wide shot in a pastel 3D park at golden hour: the woman in the orange sweatshirt speaking with expressive intonation, the other three watching, the fluffy brown puppy mid-jump with excitement.`

## W13 — Phonology Part 1 · 최소대립쌍 (P2 3D)

- **파일**: `w13_toon_minimalpairs.mp4` (12초) · **삽입 위치**: 최소대립쌍/음소 슬라이드 뒤
- **개념**: 모음 하나가 단어(의미)를 바꾼다 — ship [ɪ] / sheep [i]
- **콩트(v3, 사용자 설계 — 배 위의 양)**: 배 갑판에 **등만 보이는 양털 둔덕**(짐짝처럼 보임). 파랑이 "sheep"이라 하자 민트가 "ship 말이지?"로 받고, 파랑이 "**a sheep on the ship**"으로 정정하는 순간 둔덕이 고개를 들어 양임을 공개. 최소대립쌍 두 단어가 **한 문장 안에서 직접 대조**됨 — 변별 음소의 기능을 대사가 시연
- 이력: v1 양 조기 등장+배 부재 → v2 소환 연출 → v3(사용자: 소환이 어색, 배 안에 처음부터 있되 정체만 숨기자). **교훈 정교화: 반전 요소는 '존재'는 보여도 되나 '정체'를 숨긴다**(얼굴·귀·다리 노출 금지 명시)

| 샷 | 길이 | 화면 | 대사 | 자막/풍선 |
|---|---|---|---|---|
| 1 | 2s | 와이드(해변 산책로): 배 갑판에 흰 양털 둔덕(무얼굴), 파랑이 가리키며 | "Look! A sheep!" | sub: Look! A sh**ee**p! `[i]` |
| 2 | 2s | 민트 클로즈업, 물 쪽을 보며 갸웃 | "You mean the ship?" | sub: You mean the sh**i**p? `[ɪ]` |
| 3 | 2.5s | 파랑 클로즈업, 씩 웃으며 정정 | "No — a sheep on the ship!" | sub: No — a sh**ee**p on the sh**i**p! |
| 4 | 3s | 배 갑판 클로즈업: 둔덕이 꿈틀 → **양이 고개 들고 카메라 향해 "Baa!"** | "Baa!" | — |
| 5 | 2.5s | 강아지 클로즈업, 학자 표정 | — | think: *One vowel. Whole different animal.* |

- **영상 프롬프트**: `Multi-shot polished 3D animation, five shots with clean cuts. EXACTLY four young adults and one puppy; … IMPORTANT: there is NO sheep in shots 1 and 2 — the sheep appears for the very first time in shot 3, as a sudden comic surprise. Shot 1 (2.5s): the wide establishing shot from the reference image on the seaside promenade — the man in the blue hoodie excitedly points at the small ship sailing on the water in the distance and says "Look! A ship!" Shot 2 (2s): close-up of the woman in the mint jacket, mishearing with delighted wide eyes, she says "A sheep?! Where?" Shot 3 (2.5s): the same wide shot — a fluffy white cartoon sheep now suddenly stands in the middle of the four young adults, everyone flinches, the ship still visible behind. Shot 4 (1.5s): insert, sheep and puppy nose to nose. Shot 5 (3.5s): close-up of the puppy with a very serious scholarly expression.` + 공통 꼬리말(파도 앰비언스)
- **시안**(P2 +, job `a51d9fd4-…`): 해변 산책로 와이드, 물 위에 작은 배 한 척, 파랑이 가리킴, **양 없음(NO sheep)** 명시

## W14 — Phonology Part 2 · 음소배열 제약 (P2 3D)

- **파일**: `w14_toon_phonotactics.mp4` (12초) · **삽입 위치**: 음소배열/가능한 단어 슬라이드 뒤
- **개념**: 가능한 비단어(blick) vs 불가능한 배열(*bnick) — 그리고 "실재 단어 = 가능한 단어 + 지시 대상"
- **콩트(v2)**: **새 강아지 친구 이름 짓기** — 이름이 필요한 대상이 등장해야 명명 상황이 성립(사용자 피드백: 종이상자 명명은 맥락 비약). Blick은 즉시 승인(새 친구의 실명이 됨 = 가능한 단어가 지시 대상을 얻는 순간), *bnick은 발음 단계에서 탈락
- 게스트 동물: 크림색 몰티즈풍 아기 강아지(갈색 푸들과 명확 구별). 첫 샷부터 등장하는 '설정'이므로 시작프레임 포함 OK(W13의 '반전 요소 금지'와 구별)

| 샷 | 길이 | 화면 | 대사 | 자막/풍선 |
|---|---|---|---|---|
| 1 | 1.5s | 와이드: 민트가 무릎 꿇고 **크림색 아기 강아지를 품에 안아** 소개, 푸들은 바닥에 | — | — |
| 2 | 1.6s | 민트 클로즈업, 흰 강아지를 살짝 들어 올리며 | "She needs a name!" | sub — 명명 대상을 안은 사람이 선언 |
| 3 | 1.9s | 보라 클로즈업, 부드럽게 제안 | "How about Blick?" | sub + gl `POSSIBLE WORD ✓` |
| 4 | 1.3s | 와이드: 잔잔한 끄덕임과 미소, 품속 강아지 꼬리 살랑 | — | — |
| 5 | 2.3s | 주황 클로즈업, 장난스럽게 얹다가 살짝 버벅 + 머쓱 미소 | "Or maybe… B-Bnick?" | sub + gl `*BN- IMPOSSIBLE IN ENGLISH` |
| 6 | 1.3s | 와이드: **어색한 정적** — 서로 눈치 보는 의아한 표정, 웃음·흠칫 모두 금지("Errrr…" 웅성), 흰 강아지 갸웃 | — | v4 수정(사용자): 웃음은 승인처럼 읽힘 — 당황·의아 톤이어야 푸들 귀 막기로 연결 |
| 7 | 2.6s | **푸들 단독 클로즈업**, 차분하게 앞발로 귀 막고 유지 | — | think: *Even my ears reject \\*bnick.* (슬로모 불필요) |

- **영상 프롬프트**: `Multi-shot polished 3D animation, six shots with clean cuts. Shot 1 (1s): wide shot in a pastel park, the four young adults hold a meeting around a plain treat box, the fluffy brown puppy sits at the table edge. Shot 2 (2.5s): close-up of the man in the purple t-shirt lifting the box confidently, saying "Let's name it… Blick!" Shot 3 (1.5s): wide shot, the other three nod approvingly with a soft "Ooh." Shot 4 (2.5s): close-up of the woman in the orange sweatshirt confidently announcing the next name, but she tries to say the impossible word "Bnick" and stumbles awkwardly over it, her confidence crumbling mid-word. Shot 5 (1.5s): wide shot, everyone flinches, the puppy folds its ears back. Shot 6 (3s): close-up of the fluffy brown puppy covering its ears with both front paws.` + 공통 꼬리말
- **제작 노트**: 음성 모델이 *bnick*을 "buh-nick"으로 낼 가능성이 높음 — 이를 실패가 아니라 **개그 포인트**로 설계(영어 화자는 bn-을 발음하지 못한다는 음소배열 제약의 산 증거). 생성 결과에서 버벅임이 안 나오면 리테이크 대신 그대로 사용 가능 여부를 판단할 것 (발음이 매끄럽게 나와버리면 개그가 죽으므로 그 경우만 리테이크)
- **시안**(P2 +): `Wide shot in a pastel 3D park: the four young adults in a naming meeting around a plain blank treat box (no letters), the fluffy brown puppy at the table edge with one ear folded.`

---

## 변경 이력
| 날짜 | 버전 | 내용 |
|---|---|---|
| 2026-08-26 | 1.0 | W2 재생성 스펙 + W3~W14 11편 스토리보드·시안/영상 프롬프트·말풍선 스크립트·예산 |
| 2026-08-31 | 1.17 | W12 v2 채택(사용자 선택 1안 "Really" 3단): 시안 1회 리테이크(파랑 복제 — 청자 3인을 개별 나열한 문형이 원인, "duplicate 제거" 이미지 편집으로 해결). **피치 컨투어 실측 QC 신설**(autocorr f0): R1 저음 +56Hz/0.7s(무덤덤), R2 고음 +110Hz(놀람 ✓), R3 1.2s 드롤(의심 ✓) — R1이 완전 평탄조는 아니어서 자막 주석을 계측 사실 기반(LOW & BRIEF)으로 표기, 'FLAT' 등 미검증 컨투어 주장 금지. 펀치라인 *Same word. Three faces.* |
| 2026-08-31 | 1.16 | W13 v7 최종 채택(사용자: 솜뭉치가 '벗겨지며' 양이 나오는 게 아니라 뭉치 자체가 양이어야): 샷4에 "the mound does NOT open/peel/split/shed; nothing comes out; one continuous body — the wool is the sheep's own fleece" 명시 → 웅크린 양 몸통이 같은 프레이밍에서 고개만 들어 전환. 연출 원칙: 변신/공개 연출은 금지 동작(벗겨짐·분리·등장) 부정형 열거 + '한 몸 연속' 명시 |
| 2026-08-31 | 1.15 | W13 v6 채택(사용자: 공개는 동일 프레이밍 연속으로): 샷4를 "completely STATIC, locked-off, 첫 1초는 기존 모습 그대로 정지 → 같은 프레이밍에서 고개 들기"로 명시 — 7.5~8.5s 무얼굴 솜뭉치 정지, 9~10.5s 동일 앵글에서 양 전환. 연출 원칙: 정체 공개 컷은 '고정 카메라 + 공개 전 상태 유지 시간'을 프롬프트에 명시 |
| 2026-08-31 | 1.14 | W13 v5 최종(사용자 피드백 3건): ① 팔을 내린 시작프레임 신규 생성 → 샷1에서 팔을 들어 올려 가리키는 동작(들고 시작하면 방향 조정이 어색) ② 공개 연출을 v3 방식으로 복원 — 둔덕 자체가 고개를 드는 단일 양("EXACTLY ONE sheep, do NOT add any other" 명시; v4는 별도 양이 추가 등장해 혼란) ③ 펀치라인 난이도 하향: *Same boat* 관용구 → *Small vowel. Big difference.*(기초 어휘로 학습 포인트 직진). 연출 원칙: 동작의 시작 자세는 시작프레임이 결정 — 동작 연출이 필요하면 휴지 자세 시안부터 |
| 2026-08-31 | 1.13 | W13 v4(사용자 피드백 2건): ① 샷1 손가락이 배를 안 향함 → "points DIRECTLY AT THE SHIP on the LEFT, index finger clearly aimed" 명시로 재생성(클로즈업에서도 배 방향 지시 유지) ② 펀치라인 교체 *Whole different animal*(배≠동물 논리 결함) → *One vowel apart. Same boat.*(모음 하나 차이인데 같은 배 위 — 데드팬+관용구). 연출 원칙: 지시 동작은 대상·방향(좌/우)을 프롬프트에 명시 |
| 2026-08-31 | 1.12 | W13 v3(사용자 설계): '배 위의 양' — 갑판의 무얼굴 양털 둔덕이 8s에 고개를 들어 정체 공개, 대사 "Look! A sheep!"→"You mean the ship?"→"No — a sheep on the ship!"(최소대립쌍이 한 문장에서 직접 대조). 시안 2회(1차에 양 얼굴 노출 → "NO FACE, NO EARS, NO LEGS" 명시로 해결). 제작 참고: 이 시간대 Kling 큐 대기 ~35분 발생 |
| 2026-08-31 | 1.11 | W10 리테이크(사용자 리포트: 보라가 "Yes, I can!" 하며 손을 뻗어 개그 붕괴): 샷3에 "does ABSOLUTELY NOTHING — hands rest motionless" 명시 → 긍정만 하고 미동 없음, 소금은 민트가 직접 회수. 연출 원칙 보강: '행동하지 않음'이 개그인 컷은 부정형(하지 않는 행동 목록)으로 프롬프트에 명시할 것 |
| 2026-08-31 | 1.10 | W14 v4(사용자 피드백: Bnick 뒤 웃음 리액션이 긍정 승인처럼 읽힘): 6번 샷을 '어색한 정적 + 서로 눈치 보는 의아한 표정(웃음·흠칫 금지)'으로 재생성 — 오디오에 "Errrr…" 웅성까지 실려 푸들 귀 막기와 톤 연결. 리액션 연출 원칙: 개그의 판정(승인/탈락)은 리액션 톤이 결정하므로 프롬프트에 웃음/정적/흠칫을 명시적으로 지정할 것 |
| 2026-08-31 | 1.9 | W14 v3(사용자 피드백 4건): ① 민트가 흰 강아지를 **안고 들어 올리며** 진행 — 명명 대상 시각적 명시 ② 대사 전부 문장형("She needs a name!" / "How about Blick?" / "Or maybe… B-Bnick?") ③ 리액션을 흠칫→차분한 미소·갸웃·웃음으로(프롬프트에 NO exaggerated startle 명시) ④ 엔딩을 푸들 단독 클로즈업 2.5s로 확보 → think 풍선 슬로모 없이 자연 노출. 샷 테이블도 v3로 갱신 |
| 2026-08-30 | 1.8 | W14 재설계·재생성(사용자 피드백: 종이상자 명명은 맥락 비약 — "이름이 필요한 대상"이어야): '새 강아지 친구(크림색 몰티즈풍) 이름 짓기' v2로 교체. "She needs a name!" 설정 대사 추가, Blick 승인 = 가능한 단어가 지시 대상을 얻는 순간(교재 p.248 논지, 발표자 노트에 연결). ASR 주의: whisper가 비단어 blick을 blink로 자동 보정 — 판정 시 initial_prompt로 bias 재검(이번 건 정상 판정) |
| 2026-08-29 | 1.7 | W13 재설계·재생성(사용자 리포트: 배 부재+양 조기 등장으로 스토리 전달 실패): 해변 산책로 배경, 시작프레임에 배만·양 금지 → 영상에서 5.5s 반짝 효과와 함께 양 소환. 민트 대사 "No — a sheep!" → "A sheep?! Where?"(오청 반응으로 개그 논리 강화). 교훈 명문화: 등장 반전 요소는 시작프레임에 넣지 않는다 |
| 2026-08-29 | 1.6 | W4 리테이크(사용자 리포트: 민트 2명·민트 키 과소): 최초 배치 시안이 '두 그룹 동작' 문형이라 캐릭터 복제+아동 비율 발생 → "기준 그룹 유지+단일 변경점+EXACTLY FOUR+성인 신장 명시" 문형으로 시안·영상 재생성(w04_toon_unfollow.mp4 교체, 자막 리타이밍). 타 주차 와이드 컷 재점검 결과 복제는 W4 한정 |
| 2026-08-29 | 1.5 | W3 v3(8샷) 채택: 사용자 수정 — "How do you feel?" 뒤 강아지 대답 짖음 샷 추가(전사·RMS로 8.98–9.48s 발화 확인). 폰 뒷면 잡텍스트는 ffmpeg delogo(컷 실측 시간창 2.58–4.25/9.92–10.71, 텍스트 영역 2개 rect)로 후처리 제거 — 리테이크 주사위 대신 결정적 후처리. 최종 파일 h264 crf18, 11.2MB |
| 2026-08-29 | 1.4 | W3 콩트 전면 교체(사용자 피드백: 벌춤 소재 공감 어려움): v1 벌춤 → v2 '반려동물 번역기 앱'(사용자 수정 반영: "Ask him how he feels!" 뒤에 실제로 강아지에게 묻는 샷 추가). 파일명 w03_toon_beedance → w03_toon_translator. 시안 캐릭터 복제 함정과 해결 문형 기록 |
| 2026-08-29 | 1.3 | W2 재생성본 **롤백**(사용자 리포트: 음성≠자막): 전사 결과 재생성 오디오가 웅얼거림("Can't give phone dog…")으로 판명 → 검증된 구버전(10s, dog/chien/Hund/gae 명료) 복원 + 자막을 구버전 실측 타이밍으로 재배치(think는 원래의 data-slow 0.22). 체크리스트에 '오디오 전사 검수' 단계 신설 — 전사 불일치 시 채택 금지 |
| 2026-08-28 | 1.2 | 자막 표준 도입(사용자 피드백: 음성≠말풍선 불일치가 오류처럼 보임): 대사는 하단 자막(`.cue.sub`)에 원문 그대로+키워드 `<b>` 강조+`gl` 주석, 말풍선은 무성 채널(강아지 think·벌 SFX)만 유지. 발화 구간은 오디오 RMS 실측(measure_speech.py)으로 싱크. 각 주차 표의 '말풍선' 칼럼은 이 규칙으로 재해석할 것 |
| 2026-08-27 | 1.1 | 교재 대조 검토 반영: ① W4 전면 교체(unlockable→unfollow — unlockable은 교재 p.51–52 구조적 중의성 예시로 W5 범위, W4 소진 금지) ② 컷 배분 공식 위반 수정(W3·W5·W6·W9) + 펀치라인 ≥3s 일괄 준수(W5 재구성·W9·W10·W14 리밸런스) ③ 유머 업그레이드 — W3 펀치("one topic" 크리에이터 개그, 정합성 겸), W5 워크맨 메타 개그("What IS a walkman?"), W9 의미역 3종 플렉스 펀치, W11 비트박스 배틀 리프레임, W12 vibes 펀치, W10 sigh 풍선 삭제 ④ W14 *bnick* 버벅임을 개그 포인트로 설계(제작 노트) |
