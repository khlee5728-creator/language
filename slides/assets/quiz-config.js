/* quiz-config.js — 연습문제 응답 기록 설정
 * Supabase 프로젝트의 URL·anon key를 넣으면 기록이 켜진다. 비워 두면 기존처럼 오프라인 동작.
 * anon key는 공개용 키(RLS로 INSERT만 허용) — 저장소에 넣어도 무방하다.
 * 학기마다 SEMESTER만 바꾼다.
 */
window.QUIZ_CONFIG = {
  SUPABASE_URL: 'https://dljvwmsuawqatckobhnp.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsanZ3bXN1YXdxYXRja29iaG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NDc5MjIsImV4cCI6MjEwNDMyMzkyMn0.QXli8ipMpst3q61mWmbFIW1m7i1TVG6-UarqoyA5CZI',   // anon public (RLS: INSERT만 허용)
  SEMESTER: '2026-2',
  REQUIRE_ID: false        // true면 학번 없이는 문항을 풀 수 없음
};
