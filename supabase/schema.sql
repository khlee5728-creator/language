-- ============================================================
-- 영어학 특강 — 연습문제 응답 기록 (Supabase)
-- Supabase 대시보드 → SQL Editor 에 전체 붙여넣고 실행.
-- 재실행 가능(idempotent).
-- ============================================================

-- 1) 강사 명단 — 대시보드 조회 권한은 이 표의 이메일에만 부여
create table if not exists public.instructors (
  email text primary key
);
insert into public.instructors (email) values ('khlee5728@gmail.com')
  on conflict do nothing;

-- 2) 응답 표 — 학생 1명·주차·문항당 첫 시도 1건만 저장
create table if not exists public.quiz_responses (
  id          bigint generated always as identity primary key,
  semester    text  not null,                           -- '2026-2'
  student_id  text  not null,                           -- 7자리 학번 또는 'anon-xxxx'
  week        smallint not null check (week between 2 and 14),
  qid         text  not null,                           -- 'w04-q1'
  choice      char(1) not null check (choice in ('A','B','C','D','E')),
  is_correct  boolean not null,
  created_at  timestamptz not null default now(),
  unique (semester, student_id, week, qid)
);
create index if not exists quiz_responses_sem_week on public.quiz_responses (semester, week);

-- 3) RLS — 익명 키는 INSERT만, 조회는 instructors 이메일로 로그인한 사용자만
alter table public.quiz_responses enable row level security;
alter table public.instructors    enable row level security;

drop policy if exists "anon insert" on public.quiz_responses;
create policy "anon insert" on public.quiz_responses
  for insert to anon, authenticated
  with check (
    length(student_id) between 4 and 24
    and student_id ~ '^[A-Za-z0-9-]+$'
    and length(semester) <= 12
    and qid ~ '^w[0-9]{2}-q[0-9]{1,2}$'
  );

drop policy if exists "instructor select" on public.quiz_responses;
create policy "instructor select" on public.quiz_responses
  for select to authenticated
  using (exists (select 1 from public.instructors i where i.email = auth.email()));

drop policy if exists "instructor delete" on public.quiz_responses;
create policy "instructor delete" on public.quiz_responses
  for delete to authenticated
  using (exists (select 1 from public.instructors i where i.email = auth.email()));

drop policy if exists "self read" on public.instructors;
create policy "self read" on public.instructors
  for select to authenticated using (email = auth.email());

-- 3b) 수강생 명단 — 대시보드 Students 탭에서 학번 목록을 붙여넣어 관리(강사만 읽기/쓰기)
create table if not exists public.roster (
  semester    text not null,
  student_id  text not null,
  note        text,
  primary key (semester, student_id)
);
alter table public.roster enable row level security;
drop policy if exists "instructor all" on public.roster;
create policy "instructor all" on public.roster
  for all to authenticated
  using  (exists (select 1 from public.instructors i where i.email = auth.email()))
  with check (exists (select 1 from public.instructors i where i.email = auth.email()));

-- 4) 실시간(수업 중 라이브 보기) — RLS가 그대로 적용됨
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'quiz_responses'
  ) then
    alter publication supabase_realtime add table public.quiz_responses;
  end if;
end $$;

-- 5) 집계 뷰 (security_invoker → 호출자의 RLS 적용, 강사만 조회 가능)
create or replace view public.v_week_summary
  with (security_invoker = true) as
select semester, week,
       count(distinct student_id)              as students,
       count(*)                                as responses,
       round(100.0 * avg(is_correct::int), 1)  as pct_correct
from public.quiz_responses
group by semester, week;

create or replace view public.v_question_summary
  with (security_invoker = true) as
select semester, week, qid, choice,
       count(*)                                as n,
       bool_or(is_correct)                     as is_correct
from public.quiz_responses
group by semester, week, qid, choice;

-- 확인
select 'ok' as status, count(*) as instructors from public.instructors;
