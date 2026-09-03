# Provenance

The memory layer for real assets. Next.js 15 App Router, Tailwind, deployed on
Vercel.

```bash
npm install
npm run dev
```

---

## Request Access Setup

`/request-access` stores every submission in Supabase and sends you an email
through Resend. Both are optional to run the site locally: without the
environment variables the page renders and validates, and submissions fail
with the generic error rather than crashing.

### 1. Create the Supabase project

Create a project at [supabase.com](https://supabase.com). Any region near you
is fine; this table is written to a few times a day at most.

### 2. Run the migration

Open the SQL editor in the Supabase dashboard, paste the contents of
`supabase/migrations/20260903000000_request_access.sql`, and run it.

If you use the Supabase CLI instead:

```bash
supabase link --project-ref your-project-ref
supabase db push
```

The migration creates `public.request_access`, enables row level security with
**no policies**, and adds check constraints on `status` and `portfolio_size`.
No policies is deliberate: it means the public anon key can do nothing to this
table at all. Only the service role key, used server side, can write to it.

### 3. Copy the project URL

Settings → API → Project URL. This becomes `NEXT_PUBLIC_SUPABASE_URL`. It is
public by design and safe in the browser.

### 4. Copy the service role key

Settings → API → Project API keys → `service_role`, and reveal it.

This key bypasses row level security entirely. It goes in
`SUPABASE_SERVICE_ROLE_KEY` and must never appear in a client component, a
`NEXT_PUBLIC_` variable, or a commit. It is only ever read inside
`src/app/request-access/actions.ts`, which is marked `"use server"`.

### 5. Create a Resend account

Sign up at [resend.com](https://resend.com) and create an API key. That is
`RESEND_API_KEY`.

### 6. Verify a sending domain

Resend will not send from a domain it has not verified. Add your domain under
Domains, publish the DNS records it gives you, and wait for verification. Then
set `REQUEST_ACCESS_FROM_EMAIL` to something like
`Provenance <access@yourdomain.com>`.

**Before you have a verified domain**, use Resend's shared sender:

```
REQUEST_ACCESS_FROM_EMAIL=Provenance <onboarding@resend.dev>
```

It only delivers to the email address that owns the Resend account, which is
enough to test the notification end to end.

### 7. Add the variables locally

```bash
cp .env.example .env.local
```

Fill in the four values. `.env.local` is gitignored.

### 8. Add the same variables in Vercel

Project → Settings → Environment Variables. Add all five, for **Production,
Preview and Development**:

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | public |
| `SUPABASE_SERVICE_ROLE_KEY` | server only, never expose |
| `RESEND_API_KEY` | server only |
| `REQUEST_ACCESS_NOTIFICATION_EMAIL` | where notifications go |
| `REQUEST_ACCESS_FROM_EMAIL` | verified sender |

### 9. Redeploy

Environment variables are read at build and run time, so a deployment created
before you added them will not pick them up. Trigger a redeploy from the
Deployments tab, or push a commit.

### 10. Test a submission

Visit `/request-access` and submit the form with a real address you can check.

### 11. Confirm the row

Supabase → Table editor → `request_access`. A new row with `status = 'new'`
should be at the top.

### 12. Confirm the email

Check the inbox at `REQUEST_ACCESS_NOTIFICATION_EMAIL`. Reply-to is set to the
submitter's address, so replying goes straight to them.

If the row appears but no email does, the notification failed and the
submission is still safe. Check the Vercel function logs for
`[request-access] notification failed` and the Resend dashboard for the
delivery attempt.

---

## Managing requests

There is no admin dashboard yet. Manage requests in the Supabase table editor.
Two columns are meant to be edited by hand:

- **`status`** one of `new`, `contacted`, `demo_scheduled`, `design_partner`,
  `closed`, `not_a_fit`. A check constraint rejects anything else.
- **`notes`** free text, never written by the website.

Everything else is the submission as it arrived and should be left alone.

---

## How the submission works

`RequestAccessForm` is a client component. It validates as you type, but only
for convenience. It calls the `submitRequestAccess` server action, which:

1. drops the request silently if the honeypot field is filled
2. normalizes and **re-validates every field from scratch**, since anything
   the browser sends can be forged
3. inserts into Supabase with the service role key
4. sends the Resend notification

**The database is the source of truth.** If the insert succeeds and the email
fails, the visitor is told it worked, because it did. The email error is
logged server side and nothing else changes. Failing a real lead to protect a
notification would be the wrong trade.

Errors shown to the visitor are always generic. Database messages, API
responses and variable names stay in the logs.
