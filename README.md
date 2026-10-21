# Kivorly Studio

A responsive black-and-blue business launch website built with Next.js App Router, React, and TypeScript. Includes homepage, services, $99/$299/$599 one-time packages, contact form, and a private customer inquiry dashboard. No paid API, AI service, email subscription, or checkout service is required.

## Local development

Node.js 22+ and npm are required. Use the existing checkout; cloud tasks already run in isolation and do not need a worktree.

```sh
npm ci
cp .env.example .env.local
```

Set `ADMIN_PASSWORD` to a unique password of at least 16 characters and `SESSION_SECRET` to a cryptographically random value of at least 32 characters. Generate a secret with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Keep credentials out of Git. Then:

```sh
npm run dev
```

Open the development server on port 3000. Send an inquiry through `/contact`, then sign in at `/dashboard`. In development, when Supabase is not configured, inquiries and rate-limit attempts are stored in the ignored `.local/inquiries.json` file. That fallback is intentionally **disabled in production** because Vercel filesystems are not durable. Do not use the development server to host real customer data.

## Deploy to Vercel with Supabase Free

1. Create a free Supabase project at https://supabase.com. Open its SQL Editor and run `supabase/schema.sql`. It creates inquiry storage, row-level security, and an atomic database-backed rate limiter. Anonymous and authenticated browser clients have no table access.
2. In Supabase project settings, obtain the Project URL and the **server-side service role key** (legacy service-role JWT). Never use this key in browser code or a `NEXT_PUBLIC_` variable.
3. Push this repository to your own GitHub account. Import it at https://vercel.com/new, select Next.js, use the repository root as root directory, and use the default `npm run build` command. Select Node.js 22 or 24.
4. Add these variables in Vercel's project environment settings, with separate credentials for preview and production if you enable previews:

   | Variable                    | Purpose                                                               |
   | --------------------------- | --------------------------------------------------------------------- |
   | `ADMIN_PASSWORD`            | A strong, unique password, at least 16 characters; shared team access |
   | `SESSION_SECRET`            | Random signing secret, at least 32 characters                         |
   | `SUPABASE_URL`              | Project URL, e.g. `https://PROJECT.supabase.co`                       |
   | `SUPABASE_SERVICE_ROLE_KEY` | Server-only service-role key                                          |

5. Deploy. Vercel supplies an HTTPS `*.vercel.app` address; a custom domain is optional. Submit an actual inquiry at `/contact`, sign in at `/dashboard`, confirm the inquiry appears, change its status, refresh, and sign out. Check an unauthenticated browser cannot access inquiry data.
6. Before accepting real inquiries, review the privacy policy, service scope, and business details. Assign someone to monitor the dashboard. There are no automatic email notifications: administrators reply via their own email client. The site does not collect payments or create a legal entity for customers.

Vercel Hobby is free for personal/non-commercial use only. A commercial company site may need Vercel Pro under Vercel's current terms. The app requires no paid platform features and can also run on any suitable Next.js host; check your host's usage policy before commercial deployment. Supabase Free has quotas and can pause inactive projects. Review current limits and wake the project before launch if needed. No custom domain purchase is necessary.

## Security and operations

- Forms are validated on the server, have length limits, an invisible honeypot, consent, and same-origin checks. The contact endpoint allows 5 requests per IP per hour; login allows 10. On Vercel the IP comes from its platform header and is stored only as a keyed hash. The database rate limiter is shared across serverless instances. Local development deliberately shares one local IP bucket.
- The dashboard uses an 8-hour signed HTTP-only, SameSite=Strict cookie, marked Secure in production. All inquiry writes require an authenticated session. Session pages are dynamic and not cached. Rotate `SESSION_SECRET` to invalidate sessions; use unique credentials and share them securely.
- Missing database configuration fails closed in production; contact submissions return an error rather than claim success. Never expose the service-role key to clients. RLS prevents public table access; the server role can read customer PII.
- The dashboard shows the latest 500 inquiries, with search, status filters, status changes, and email reply links. Export/archive older records in Supabase if needed. Delete records there for deletion requests. Free-tier backups and delivery SLAs are not guaranteed; maintain your own retention and backup process.
- Fonts are self-hosted through Fontsource packages; no third-party font request is needed. The system font stack is the fallback. No analytics, paid APIs, or fabricated testimonials are included.

## Validation

```sh
npm run typecheck
npm run build
# With the development server running and test-only credentials in .env.local:
node --env-file=.env.local --test tests/workflow.test.mjs
```

The integration suite creates an inquiry, checks server validation and authentication, changes its status, verifies persistence, signs out, and tests rate limits. Run only against a development database: it creates test records and consumes rate-limit slots. Use a clean `.local` directory or wait an hour before repeating the rate-limit suite. Browser validation can use Playwright independently; it is not a runtime dependency.
