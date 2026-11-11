-- Music accounts: one-time setup for the Supabase project named in shared/cloud-config.js.
-- Paste the whole file into the project's SQL Editor and run it. It is safe to run again.
-- Then add yourself at the bottom (step 4).

-- 1) One saved document per person per tool. School keeps its progress in the row app = 'school'.
create table if not exists public.app_data (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  app        text        not null,
  data       jsonb       not null,
  saved_at   timestamptz not null default now(),
  primary key (user_id, app)
);
alter table public.app_data enable row level security;
drop policy if exists "own data" on public.app_data;
create policy "own data" on public.app_data
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 2) The members list: who may see the private files, and who may add to them.
--    A signed-in person can see only their own line.
create table if not exists public.members (
  email text primary key,
  owner boolean not null default false
);
alter table public.members enable row level security;
drop policy if exists "own membership" on public.members;
create policy "own membership" on public.members
  for select to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

create or replace function public.is_member() returns boolean
  language sql stable security definer set search_path = public as
  $$ select exists (select 1 from public.members where lower(email) = lower(auth.jwt() ->> 'email')) $$;
create or replace function public.is_owner() returns boolean
  language sql stable security definer set search_path = public as
  $$ select exists (select 1 from public.members where lower(email) = lower(auth.jwt() ->> 'email') and owner) $$;

-- 3) The private bucket for School's files (chord charts, album art, book scans, screenshots).
--    Members can read; owners can add, replace and remove. Nobody else can see anything.
insert into storage.buckets (id, name, public) values ('school-files', 'school-files', false)
  on conflict (id) do update set public = false;
drop policy if exists "members read school files"   on storage.objects;
drop policy if exists "owners add school files"     on storage.objects;
drop policy if exists "owners change school files"  on storage.objects;
drop policy if exists "owners remove school files"  on storage.objects;
create policy "members read school files"  on storage.objects for select to authenticated
  using (bucket_id = 'school-files' and public.is_member());
create policy "owners add school files"    on storage.objects for insert to authenticated
  with check (bucket_id = 'school-files' and public.is_owner());
create policy "owners change school files" on storage.objects for update to authenticated
  using (bucket_id = 'school-files' and public.is_owner());
create policy "owners remove school files" on storage.objects for delete to authenticated
  using (bucket_id = 'school-files' and public.is_owner());

-- 4) Put people on the list. `true` = owner (may add files); `false` = member (may see them).
--    Use the email each person signs in with. Run again later to add someone.
-- insert into public.members (email, owner) values ('you@example.com', true)   on conflict (email) do update set owner = excluded.owner;
-- insert into public.members (email, owner) values ('her@example.com', false)  on conflict (email) do nothing;
