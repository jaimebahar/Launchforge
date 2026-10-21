-- Run once in the SQL Editor of a free Supabase project.
-- Safe to re-run. Only the server-side service role can access these tables.
create table if not exists public.inquiries (
  id uuid primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  company text not null default '' check (char_length(company) <= 150),
  service text not null check (service in ('Launch Essentials','Growth Launch','Full Launch','Not sure yet')),
  message text not null check (char_length(message) between 20 and 4000),
  status text not null default 'new' check (status in ('new','contacted','closed'))
);
create index if not exists inquiries_created_at_idx on public.inquiries(created_at desc);
alter table public.inquiries enable row level security;
revoke all on public.inquiries from anon, authenticated;
grant select, insert, update, delete on public.inquiries to service_role;
create table if not exists public.inquiry_attempts (
  hash text not null,
  kind text not null,
  created_at timestamptz not null default now()
);
create index if not exists inquiry_attempts_lookup on public.inquiry_attempts(hash, kind, created_at);
create index if not exists inquiry_attempts_expiry on public.inquiry_attempts(created_at);
alter table public.inquiry_attempts enable row level security;
revoke all on public.inquiry_attempts from anon, authenticated;
grant all on public.inquiry_attempts to service_role;
create or replace function public.consume_attempt(p_hash text, p_kind text, p_limit integer)
returns boolean language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if p_kind not in ('contact', 'login') or p_limit < 1 or p_limit > 10 or char_length(p_hash) <> 64 then
    return false;
  end if;
  perform pg_advisory_xact_lock(hashtextextended(p_hash || p_kind, 0));
  delete from public.inquiry_attempts where created_at < now() - interval '1 hour';
  if (select count(*) from public.inquiry_attempts where hash = p_hash and kind = p_kind and created_at > now() - interval '1 hour') >= p_limit then
    return false;
  end if;
  insert into public.inquiry_attempts(hash, kind) values (p_hash, p_kind);
  return true;
end;
$$;
revoke all on function public.consume_attempt(text, text, integer) from public, anon, authenticated;
grant execute on function public.consume_attempt(text, text, integer) to service_role;
