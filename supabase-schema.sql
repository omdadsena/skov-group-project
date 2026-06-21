-- SKOV GROUP launch schema
-- Run this file in the Supabase SQL editor, then set app_metadata.role = "admin"
-- only for trusted dashboard users.

create extension if not exists pgcrypto;

create table if not exists public.contractor_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company_name text not null,
  phone text not null,
  email text,
  city text not null,
  state text not null default 'Chhattisgarh',
  services text[] not null default '{}',
  experience_years integer not null default 0 check (experience_years >= 0),
  license_number text,
  gst_number text,
  portfolio_urls text[] not null default '{}',
  is_verified boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  submitted_at timestamptz not null default now(),
  verified_at timestamptz,
  notes text
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  service_type text not null,
  city text not null,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.verified_contractors (
  id uuid primary key default gen_random_uuid(),
  contractor_id uuid not null unique references public.contractor_applications(id) on delete cascade,
  verified_at timestamptz not null default now(),
  notes text
);

create index if not exists contractor_applications_status_idx on public.contractor_applications(status);
create index if not exists contractor_applications_city_idx on public.contractor_applications(city);
create index if not exists leads_created_at_idx on public.leads(created_at desc);

alter table public.contractor_applications enable row level security;
alter table public.leads enable row level security;
alter table public.verified_contractors enable row level security;

drop policy if exists "Public can submit contractor applications" on public.contractor_applications;
create policy "Public can submit contractor applications"
  on public.contractor_applications for insert to anon, authenticated
  with check (status = 'pending' and is_verified = false);

drop policy if exists "Public can submit leads" on public.leads;
create policy "Public can submit leads"
  on public.leads for insert to anon, authenticated
  with check (true);

drop policy if exists "Admins can read contractor applications" on public.contractor_applications;
create policy "Admins can read contractor applications"
  on public.contractor_applications for select to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can read leads" on public.leads;
create policy "Admins can read leads"
  on public.leads for select to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can read verified contractors" on public.verified_contractors;
create policy "Admins can read verified contractors"
  on public.verified_contractors for select to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

grant usage on schema public to anon, authenticated;
grant insert on public.contractor_applications, public.leads to anon, authenticated;
grant select on public.contractor_applications, public.leads, public.verified_contractors to authenticated;

notify pgrst, 'reload schema';
