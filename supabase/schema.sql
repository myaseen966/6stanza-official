-- Run this once in your Supabase project's SQL Editor
-- (Dashboard → SQL Editor → New query → paste this → Run).

create extension if not exists pgcrypto;

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text default '',
  service text default '',
  timeline text default '',
  budget text default '',
  details text default ''
);

-- Row Level Security is on by default for safety, but no public policies
-- are defined here on purpose. This table is only ever read or written by
-- the server-side API route using the service_role key, which always
-- bypasses RLS. The service_role key is never sent to the browser, so
-- submissions stay private — nobody can read or write this table directly
-- from the client with just the public/anon key.
alter table inquiries enable row level security;

create index if not exists inquiries_created_at_idx on inquiries (created_at desc);
