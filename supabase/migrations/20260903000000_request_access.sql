-- Request access submissions.
--
-- Managed directly in the Supabase table editor for now: status and notes are
-- the two columns meant to be edited by hand, and everything else is the
-- submission exactly as it arrived. There is deliberately no admin UI yet.

create table if not exists public.request_access (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- the submission, never edited after insert
  name text not null,
  work_email text not null,
  company text not null,
  role text not null,
  portfolio_size text,
  message text not null,

  -- the two columns you maintain
  status text not null default 'new',
  notes text,

  -- attribution, captured from the page URL where present
  source text not null default 'website',
  utm_source text,
  utm_medium text,
  utm_campaign text,

  constraint request_access_status_check check (
    status in (
      'new',
      'contacted',
      'demo_scheduled',
      'design_partner',
      'closed',
      'not_a_fit'
    )
  ),
  constraint request_access_portfolio_size_check check (
    portfolio_size is null
    or portfolio_size in (
      '1-10 properties',
      '11-50 properties',
      '51-100 properties',
      '101-500 properties',
      '500+ properties',
      'Not sure / Not applicable'
    )
  )
);

-- newest first is the only way this table is ever read by hand
create index if not exists request_access_created_at_idx
  on public.request_access (created_at desc);

create index if not exists request_access_status_idx
  on public.request_access (status);

-- RLS on with no policies: the anon and authenticated keys can do nothing at
-- all here. Inserts happen server-side with the service role key, which
-- bypasses RLS by design. This is what keeps a public form from becoming a
-- public table.
alter table public.request_access enable row level security;

comment on table public.request_access is
  'Access requests from the website. Edit status and notes only.';
comment on column public.request_access.status is
  'new | contacted | demo_scheduled | design_partner | closed | not_a_fit';
comment on column public.request_access.notes is
  'Free text, for your own use. Never written by the website.';
