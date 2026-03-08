# From Broken To Better — Claude Code Project Context

> Read this file at the start of every session before writing any code.
> It contains the full project context, schema, routes, and current build state.

---

## Project Overview

**Product:** Peer support and healing platform for people navigating separation and divorce in India.
**Not a dating app.** Emotional support only. Users are matched with Peer Guides — real people who survived their own separation.
**Live URL:** https://frombrokentobetter.com (no www — canonical is non-www)
**GitHub → Vercel:** auto-deploys on every push to `main`

**Key contacts:**
- Admin / user-facing errors: admin@frombrokentobetter.com
- Privacy / GDPR / data requests only: privacy@frombrokentobetter.com

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Hosting | Vercel (auto-deploy from GitHub) |
| Database | Supabase PostgreSQL (Singapore — ap-southeast-1) |
| Auth | Supabase Auth (email + password) |
| Edge Functions | Supabase Edge Functions (Deno runtime) |
| Payments | Razorpay (India — UPI + Cards + Net Banking) |
| AI | Anthropic Claude API (claude-sonnet-4-6) |
| Email | Resend.com (transactional email) |
| Routing | React Router v7 |
| SEO | react-helmet-async (Helmet on every page) |
| Analytics | @vercel/analytics + @vercel/speed-insights (in App.jsx) |

---

## Brand

```
Colours:
  cream:      #f4ede3   ← main background
  terracotta: #c4623a   ← primary CTA, buttons, accents
  walnut:     #1c1410   ← dark hero sections, left panels
  charcoal:   #2a1e18   ← headings
  stone:      #8a7d74   ← secondary / muted text
  warm-mid:   #a09080   ← tertiary text on dark backgrounds

Fonts:
  headings:  'Cormorant Garamond', serif   (weight 300 / 400)
  body:      'Jost', sans-serif            (weight 200 / 300 / 400)
  legacy:    'DM Sans', sans-serif         (some older components — do not change)

Tone: warm, compassionate, never clinical.
People using this platform are grieving. Every word matters.
Never use cold words like "error", "failed", "invalid" alone.
Always follow with something human and helpful.
```

---

## Project File Structure

```
frontend/
├── CLAUDE.md                          ← this file — read every session
├── index.html
├── package.json
├── vite.config.js
├── vercel.json                        ← www→non-www redirect + SPA fallback
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── og-image.jpg                   ← 1200×630 Open Graph image
└── src/
    ├── main.jsx
    ├── App.jsx                        ← router + global auth state
    ├── index.css
    ├── lib/
    │   └── supabase.js                ← single Supabase client — ALWAYS import from here
    ├── api/
    │   └── healingPath.js             ← calls Edge Function for AI healing path
    ├── styles/
    │   └── theme.js                   ← THEME object + globalCSS (do not rename classes)
    ├── data/
    │   ├── articles.js                ← 6 hardcoded articles (migrate to DB — Month 2)
    │   ├── events.js                  ← 6 hardcoded events
    │   └── features.js                ← landing page feature cards
    ├── assets/
    │   └── icons/
    │       └── open-door.svg
    ├── components/
    │   ├── layout/
    │   │   ├── Nav.jsx                ← fixed top nav (needs auth awareness — see broken list)
    │   │   └── Footer.jsx
    │   ├── blog/
    │   │   ├── BlogPage.jsx           ← journal listing (hardcoded — fix Month 2)
    │   │   └── ArticlePage.jsx        ← single article view
    │   ├── LandingPage.jsx
    │   ├── AuthModal.jsx              ← login/signup overlay (uses mockDB — broken)
    │   ├── OnboardingFlow.jsx         ← 6-question healing assessment (broken)
    │   ├── Dashboard.jsx              ← user dashboard (loses data on refresh — broken)
    │   ├── BookingModal.jsx           ← event booking (fake payment — broken)
    │   ├── EventsPage.jsx
    │   ├── GiveBackPage.jsx           ← story submission (fake submit — broken)
    │   └── LearnHowModal.jsx
    └── pages/
        ├── About.jsx
        ├── MeetYourPeer.jsx           ← seeker intake form (fake submit — broken)
        ├── BecomeAGuide.jsx           ← peer guide application ✅ FULLY WORKING
        ├── Contact.jsx                ← contact form (likely fake submit — broken)
        ├── AuthPage.jsx               ← standalone signin/register (uses mockDB — broken)
        ├── PrivacyPolicy.jsx
        └── Terms.jsx
```

---

## Supabase Client

```javascript
// src/lib/supabase.js — create this before any other work
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

Every component imports from this one file. Never create a second Supabase client.

```javascript
import { supabase } from '../lib/supabase'    // adjust relative path as needed
```

---

## Environment Variables

### Vercel (safe — public, visible in browser)
```
VITE_SUPABASE_URL          = https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY     = eyJ...  (anon/public key only)
VITE_RAZORPAY_KEY_ID       = rzp_live_...  (public key only)
VITE_HEALING_PATH_URL      = https://[project-ref].supabase.co/functions/v1/heal-path
VITE_APP_URL               = https://frombrokentobetter.com
```

### Supabase Edge Function secrets ONLY (never in Vercel, never in any JS file)
```
SUPABASE_SERVICE_ROLE_KEY  ← admin DB access
RAZORPAY_KEY_SECRET        ← payment secret key
ANTHROPIC_API_KEY          ← Claude API key
RESEND_API_KEY             ← email sending key
```

---

## All Routes

| Path | Component | Auth Required | Status |
|---|---|---|---|
| `/` | LandingPage | No | ✅ Live |
| `/about` | About | No | ✅ Live |
| `/meet-your-peer` | MeetYourPeer | Soft | ⚠️ Fake submit |
| `/become-a-guide` | BecomeAGuide | Yes (AuthModal gate) | ✅ Working |
| `/contact` | Contact | No | ⚠️ Likely fake submit |
| `/privacy-policy` | PrivacyPolicy | No | ✅ Live |
| `/terms` | Terms | No | ✅ Live |
| `/events` | EventsPage | No | ⚠️ Fake payment |
| `/journal` | BlogPage | No | ⚠️ Hardcoded data |
| `/journal/:slug` | ArticlePage | No | ⚠️ No slug routing yet |
| `/dashboard` | Dashboard | Yes → redirect / | ⚠️ Loses data on refresh |
| `/give-back` | GiveBackPage | No | ⚠️ Fake submit |
| `/signin` | AuthPage (login) | No | ⚠️ Uses mockDB |
| `/register` | AuthPage (signup) | No | ⚠️ Uses mockDB |
| `/admin` | AdminPage | Yes + role=admin | ❌ File does not exist yet |

---

## Auth Pattern

```javascript
// App.jsx — persistent session on page load
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user ?? null)
  })
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => setUser(session?.user ?? null)
  )
  return () => subscription.unsubscribe()
}, [])

// Get display name safely
const displayName = user?.user_metadata?.full_name?.split(' ')[0]
                 ?? user?.email?.split('@')[0]
                 ?? 'friend'

// Check admin
const isAdmin = user?.user_metadata?.role === 'admin'
```

```javascript
// Sign up
await supabase.auth.signUp({
  email,
  password,
  options: { data: { full_name: name } }
})

// Sign in
await supabase.auth.signInWithPassword({ email, password })

// Sign out
await supabase.auth.signOut()
```

---

## All Broken Workflows

Every form currently uses `setTimeout` as a fake submit. Nothing is saved anywhere.
**BecomeAGuide.jsx is the only correctly wired form. Use it as the reference pattern.**

| File | Broken Line | What It Needs |
|---|---|---|
| `App.jsx` | `const mockDB = { users: {} }` | Remove. Use `onAuthStateChange` |
| `AuthModal.jsx` | `mockDB.users[email]` | `supabase.auth.signInWithPassword()` |
| `AuthPage.jsx` | `mockDB.users[loginEmail]` | `supabase.auth.signUp / signInWithPassword` |
| `api/healingPath.js` | `fetch('http://localhost:3001/...')` | Call `VITE_HEALING_PATH_URL` from env |
| `OnboardingFlow.jsx` | answers not saved | `supabase.from('healing_paths').insert(...)` |
| `MeetYourPeer.jsx` | `setTimeout(() => setSent(true), 1000)` | `supabase.from('seeker_profiles').insert(...)` |
| `GiveBackPage.jsx` | `setTimeout(() => setSubmitted(true), 1200)` | `supabase.from('journal_posts').insert(...)` |
| `BookingModal.jsx` | `setTimeout(() => setSuccess(true), 1800)` | Real Razorpay via Edge Function |
| `Contact.jsx` | likely setTimeout | `supabase.from('contact_messages').insert(...)` |
| `Dashboard.jsx` | state lost on refresh | Load from `healing_paths` on mount |
| `Nav.jsx` | no auth awareness | Show user name + logout when signed in |

---

## Database Schema

**Rule: every table must have RLS enabled.**

---

### users

```sql
CREATE TABLE users (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email        VARCHAR(255) NOT NULL UNIQUE,
  role         VARCHAR(20)  NOT NULL DEFAULT 'seeker',
  full_name    VARCHAR(255) NOT NULL,
  phone        VARCHAR(20),
  is_verified  BOOLEAN NOT NULL DEFAULT false,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own"   ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin full"       ON users FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

Roles: `seeker` / `guide` / `practitioner` / `admin`

---

### seeker_profiles

Created when a seeker submits the MeetYourPeer form.

```sql
CREATE TABLE seeker_profiles (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id              UUID REFERENCES auth.users(id),
  full_name            VARCHAR(255) NOT NULL,
  email                VARCHAR(255) NOT NULL,
  phone                VARCHAR(20),
  what_hurts           TEXT NOT NULL,
  separation_type      VARCHAR(50),
  religion             VARCHAR(50),
  children_involved    BOOLEAN,
  separation_timeline  VARCHAR(50),
  emotional_state      INTEGER CHECK (emotional_state BETWEEN 1 AND 10),
  matching_status      VARCHAR(20) NOT NULL DEFAULT 'pending',
  matched_guide_id     UUID,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE seeker_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Seeker reads own"  ON seeker_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can insert" ON seeker_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full"        ON seeker_profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

`matching_status` values: `pending` / `matched` / `closed`

---

### healing_paths

Created after 6-question onboarding assessment.

```sql
CREATE TABLE healing_paths (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id            UUID NOT NULL UNIQUE REFERENCES auth.users(id),
  answers            JSONB NOT NULL,
  phase              VARCHAR(20) NOT NULL,
  summary            TEXT NOT NULL,
  focus_areas        TEXT[] NOT NULL,
  recommended_event  VARCHAR(100),
  insight            TEXT,
  next_step          TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE healing_paths ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User reads own"   ON healing_paths FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User inserts own" ON healing_paths FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User updates own" ON healing_paths FOR UPDATE USING (auth.uid() = user_id);
```

`phase` values: `Stabilizing` / `Processing` / `Rebuilding` / `Thriving`

---

### peer_guide_profiles

Filled by community members via /become-a-guide.
**`is_approved_by_admin` defaults to `true` — guides go live immediately without manual approval.**

```sql
CREATE TABLE peer_guide_profiles (
  id                           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id                      UUID NOT NULL REFERENCES auth.users(id),
  bio                          TEXT NOT NULL,
  separation_type_experienced  VARCHAR(50),
  languages_spoken             TEXT[] DEFAULT '{}',
  is_available                 BOOLEAN NOT NULL DEFAULT true,
  session_rate_inr             INTEGER,
  photo_url                    TEXT,
  avg_rating                   NUMERIC(3,2),
  is_approved_by_admin         BOOLEAN NOT NULL DEFAULT true,
  created_at                   TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE peer_guide_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Guide reads own"         ON peer_guide_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Guide inserts own"       ON peer_guide_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Approved visible to all" ON peer_guide_profiles FOR SELECT USING (is_approved_by_admin = true);
CREATE POLICY "Admin full"              ON peer_guide_profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

`photo_url` comes from Supabase Storage bucket: `guide-photos` (public bucket).

---

### journal_posts

Both community stories (GiveBackPage) and editorial articles (BlogPage).

```sql
CREATE TABLE journal_posts (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id          UUID REFERENCES auth.users(id),
  author_name        VARCHAR(255),
  author_email       VARCHAR(255),
  slug               VARCHAR(255) UNIQUE,
  title              VARCHAR(500),
  content            TEXT NOT NULL,
  excerpt            TEXT,
  emoji              VARCHAR(10) DEFAULT '🌿',
  tag                VARCHAR(50),
  tag_color          VARCHAR(30),
  tag_text_color     VARCHAR(10),
  read_time_minutes  INTEGER,
  emotion_tags       TEXT[] DEFAULT '{}',
  is_anonymous       BOOLEAN NOT NULL DEFAULT false,
  status             VARCHAR(20) NOT NULL DEFAULT 'pending_review',
  author_type        VARCHAR(20) DEFAULT 'community',
  reviewed_by        UUID REFERENCES auth.users(id),
  published_at       TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads published" ON journal_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Author reads own"       ON journal_posts FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "Anyone inserts pending" ON journal_posts FOR INSERT WITH CHECK (status = 'pending_review');
CREATE POLICY "Admin full"             ON journal_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

`status` values: `draft` / `pending_review` / `published`

---

### sessions

Event bookings and 1:1 session records.

```sql
CREATE TABLE sessions (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id              UUID NOT NULL REFERENCES auth.users(id),
  event_title          VARCHAR(255) NOT NULL,
  price_inr            INTEGER NOT NULL,
  razorpay_order_id    VARCHAR(100),
  razorpay_payment_id  VARCHAR(100),
  booking_ref          VARCHAR(20),
  status               VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User reads own"  ON sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User inserts"    ON sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin full"      ON sessions FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

`status` values: `pending` / `confirmed` / `cancelled` / `refunded`

---

### contact_messages

From the /contact page form.

```sql
CREATE TABLE contact_messages (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(20),
  subject     VARCHAR(255),
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone inserts" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full"     ON contact_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

---

### notifications

```sql
CREATE TABLE notifications (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id),
  type        VARCHAR(50) NOT NULL,
  title       VARCHAR(255) NOT NULL,
  body        TEXT,
  link_to     VARCHAR(500),
  is_read     BOOLEAN NOT NULL DEFAULT false,
  sent_email  BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User reads own" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin full"     ON notifications FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

`type` values: `match_found` / `session_confirmed` / `story_approved`

---

## Admin Role Setup

Run once in Supabase SQL Editor:

```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'),
  '{role}',
  '"admin"'
)
WHERE email = 'YOUR_EMAIL_HERE';
```

---

## Edge Functions

Location: `supabase/functions/`
Deploy: `supabase functions deploy FUNCTION_NAME`
All functions need CORS headers for `http://localhost:5173`.

| Function | What It Does | Needs Secret |
|---|---|---|
| `heal-path` | Calls Claude API with 6 onboarding answers, returns healing path JSON | ANTHROPIC_API_KEY |
| `create-razorpay-order` | Creates Razorpay order server-side | RAZORPAY_KEY_SECRET |
| `verify-payment` | Validates Razorpay webhook, updates sessions table | RAZORPAY_KEY_SECRET |
| `send-notification` | Sends email via Resend | RESEND_API_KEY |

---

## Supabase Storage

| Bucket name | Public | Used for |
|---|---|---|
| `guide-photos` | YES | Peer guide profile photos from BecomeAGuide.jsx |

Create in: Supabase Dashboard → Storage → New bucket → toggle Public ON.

---

## CSS Class Names (never rename these)

```
Layout:    .app-container .section .section-tag .section-title .section-sub
Nav:       .nav .nav-inner .nav-logo .nav-links .nav-cta .nav-hamburger .nav-mobile
Buttons:   .btn-primary .btn-secondary .nav-btn
Auth:      .auth-overlay .auth-card .auth-title .auth-sub .form-group
           .form-label .form-input .form-btn .auth-switch .error-msg
Onboard:   .onboarding-overlay .onboarding-card .progress-bar .progress-fill
           .q-step .q-text .q-options .q-option .q-option.selected
           .q-textarea .q-nav .q-back .q-next .spinner
Dashboard: .dashboard .dashboard-header .dashboard-greeting .healing-phase
           .phase-label .phase-title .phase-summary .phase-insight
           .dash-grid .dash-card .card-btn .card-btn-primary .card-btn-outline
Events:    .events-page .events-grid .event-card .event-card-body .event-tag
Blog:      .blog-page .blog-grid .blog-card .article-page .article-title
Modal:     .modal-overlay .modal-card .stripe-field .stripe-row .stripe-secure
Footer:    .footer .footer-main .footer-brand .footer-nav .footer-copy
Guide:     .guide .guide-split .guide-left .guide-right .guide-traits
           .guide-trait .gt-num .gt-text .gf-group .gf-checks .gf-check
           .gf-toggle-row .gf-toggle .gf-toggle-slider .gf-hint
           .gf-file-label .gf-file-text .guide-btn .guide-error .guide-success
```

---

## Crisis Resources

Include on any page where users discuss emotional distress:

```
iCall:       9152987821
Vandrevala:  1860-2662-345
```

---

## Hard Rules

1. Never rename CSS classes — used across components via globalCSS in theme.js
2. Never put secret keys in Vercel — only `VITE_` public keys go there
3. Always import supabase from `src/lib/supabase.js` — never create a second client
4. User name field is `user.user_metadata?.full_name` — not `user.name`
5. Enable RLS on every table — no exceptions
6. Every error message must be warm and human — never cold or technical
7. User-facing error email: admin@frombrokentobetter.com
8. Privacy / data request email: privacy@frombrokentobetter.com (Policy pages only)
9. `is_approved_by_admin` defaults to `true` in peer_guide_profiles
10. Never pass `created_at` in insert calls — Supabase sets it automatically

---

## The Correct Form Submit Pattern

BecomeAGuide.jsx is the only working form. Copy this pattern for every other form:

```javascript
const onSubmit = async e => {
  e.preventDefault()
  setError('')
  setLoading(true)

  // 1. Check auth (remove if form allows anonymous)
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    setError('Please sign in first.')
    setLoading(false)
    return
  }

  // 2. Validate required fields here

  // 3. Insert to Supabase
  const { error: err } = await supabase
    .from('table_name')
    .insert({
      user_id: session.user.id,
      // ... other fields
    })

  setLoading(false)

  if (err) {
    setError(
      'Something went wrong. Please try again or email admin@frombrokentobetter.com'
    )
  } else {
    setSent(true)
  }
}
```

---

## Build Order (28 steps — see docs/FBTB_Workflow_Tracker.xlsx for full detail)

### Week 1 (do these first)
1. Create Supabase project (Singapore region)
2. Create `src/lib/supabase.js`
3. Add env vars to Vercel: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
4. Enable Email Auth in Supabase dashboard
5. Fix AuthModal.jsx → supabase.auth
6. Fix AuthPage.jsx → supabase.auth
7. Fix App.jsx → remove mockDB, add onAuthStateChange
8. Fix Nav.jsx → show user + logout
9. Create healing_paths table + RLS
10. Deploy heal-path Edge Function
11. Fix api/healingPath.js → call Edge Function
12. Fix OnboardingFlow.jsx → save to healing_paths
13. Fix Dashboard.jsx → load from healing_paths on mount
14. Fix MeetYourPeer.jsx → insert to seeker_profiles
15. Fix Contact.jsx → insert to contact_messages

### Week 2
16. Fix GiveBackPage.jsx → insert to journal_posts
17. Build AdminPage.jsx (new file)
18. Set admin role in Supabase for your account

### Week 4
19. Register Razorpay + KYC (start immediately — takes 2–7 days)
20. Fix BookingModal.jsx → real Razorpay payment

### Month 2
21. Migrate articles.js → journal_posts table
22. Fix BlogPage.jsx → fetch from Supabase
23. Add /journal/:slug routing