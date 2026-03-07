# From Broken To Better — Claude Code Project Context

> This file is read automatically by Claude Code at the start of every session.
> It contains everything needed to work on this codebase without re-explaining context.

---

## Project Overview

**Product:** Peer support + healing platform for people navigating separation and divorce in India.
**Live URL:** https://frombrokentobetter.com
**Admin email:** privacy@frombrokentobetter.com
**GitHub → Vercel:** auto-deploys on push to `main`

This is NOT a dating app. It is an emotional support platform.
Users are matched with "Peer Guides" — real people who survived their own separation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Hosting | Vercel (auto-deploy from GitHub) |
| Database | Supabase PostgreSQL (Singapore region) |
| Auth | Supabase Auth (email/password) |
| Edge Functions | Supabase Edge Functions (Deno) |
| Payments | Razorpay (India — UPI + Cards) |
| AI | Anthropic Claude API (claude-sonnet-4-6) |
| Email | Resend.com (transactional) |
| Routing | React Router v7 |
| SEO | react-helmet-async |
| Analytics | @vercel/analytics + @vercel/speed-insights |

---

## Brand & Design

```
Colors:
  cream:      #f4ede3   (main background)
  terracotta: #c4623a   (primary CTA, accents)
  walnut:     #1c1410   (dark backgrounds, hero sections)
  charcoal:   #2a1e18   (headings)
  stone:      #8a7d74   (secondary text)

Fonts:
  headings:  'Cormorant Garamond', serif  (font-weight 300/400)
  body:      'Jost', sans-serif           (font-weight 200/300/400)
  old body:  'DM Sans', sans-serif        (still used in some components)

Tone: warm, compassionate, never clinical. People using this app are grieving.
```

---

## Project File Structure

```
frontend/
├── CLAUDE.md                        ← this file
├── index.html                       ← SEO meta tags (landing page)
├── package.json
├── vite.config.js
├── vercel.json                      ← www→non-www redirect + SPA fallback
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── og-image.jpg                 ← 1200×630 Open Graph image
├── src/
│   ├── main.jsx                     ← entry point
│   ├── App.jsx                      ← router, global state, auth handlers
│   ├── App.css
│   ├── index.css
│   ├── lib/
│   │   └── supabase.js              ← Supabase client (CREATE THIS FIRST)
│   ├── api/
│   │   └── healingPath.js           ← calls Edge Function for AI healing path
│   ├── styles/
│   │   └── theme.js                 ← THEME object + globalCSS string
│   ├── data/
│   │   ├── articles.js              ← 6 hardcoded articles (migrate to DB later)
│   │   ├── events.js                ← 6 hardcoded events
│   │   └── features.js              ← landing page feature cards
│   ├── assets/
│   │   └── icons/
│   │       └── open-door.svg        ← brand icon
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.jsx              ← fixed top nav (needs auth awareness)
│   │   │   └── Footer.jsx           ← site footer
│   │   ├── blog/
│   │   │   ├── BlogPage.jsx         ← journal listing
│   │   │   └── ArticlePage.jsx      ← single article view
│   │   ├── LandingPage.jsx          ← home page (/)
│   │   ├── AuthModal.jsx            ← login/signup overlay modal
│   │   ├── OnboardingFlow.jsx       ← 6-question healing assessment
│   │   ├── Dashboard.jsx            ← post-onboarding user dashboard
│   │   ├── BookingModal.jsx         ← event booking + payment UI
│   │   ├── EventsPage.jsx           ← all events listing
│   │   ├── GiveBackPage.jsx         ← community story submission
│   │   └── LearnHowModal.jsx        ← feature explainer modal
│   └── pages/
│       ├── About.jsx
│       ├── MeetYourPeer.jsx         ← seeker intake form (MOST IMPORTANT)
│       ├── Contact.jsx
│       ├── AuthPage.jsx             ← standalone /signin and /register pages
│       ├── PrivacyPolicy.jsx
│       └── Terms.jsx
```

---

## Environment Variables

### Vercel (frontend — safe to expose to browser)
```
VITE_SUPABASE_URL          = https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY     = eyJ...  (anon/public key only)
VITE_RAZORPAY_KEY_ID       = rzp_live_...  (public key only)
VITE_HEALING_PATH_URL      = https://[project-ref].supabase.co/functions/v1/heal-path
VITE_APP_URL               = https://frombrokentobetter.com
```

### Supabase Edge Function Secrets (NEVER in Vercel or frontend)
```
SUPABASE_SERVICE_ROLE_KEY  = eyJ...  (service role — admin access)
RAZORPAY_KEY_SECRET        = rzp_live_...secret  (never in frontend)
ANTHROPIC_API_KEY          = sk-ant-...
RESEND_API_KEY             = re_...
```

> **Rule:** If a key is a "secret" or "private" — it goes in Supabase Edge Function secrets only.
> Never put secret keys in Vercel env vars (they become readable in the browser bundle).

---

## Supabase Client

```javascript
// src/lib/supabase.js  — create this file first before any other work
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

All components import from this single file:
```javascript
import { supabase } from '../lib/supabase'
// or
import { supabase } from '../../lib/supabase'
```

---

## Current Broken Workflows (what needs to be fixed)

Every form in this app currently uses `setTimeout` as a fake submit. Nothing is saved.

| File | Broken Line | What It Should Do |
|---|---|---|
| `AuthModal.jsx` | `mockDB.users[email]` | `supabase.auth.signInWithPassword()` |
| `AuthPage.jsx` | `mockDB.users[loginEmail]` | `supabase.auth.signUp/signInWithPassword()` |
| `App.jsx` | `const mockDB = { users: {} }` | Remove entirely, use `supabase.auth.onAuthStateChange` |
| `OnboardingFlow.jsx` | `fetch('http://localhost:3001/...')` | Supabase Edge Function URL from env var |
| `MeetYourPeer.jsx` | `setTimeout(() => setSent(true), 1000)` | `supabase.from('seeker_profiles').insert(...)` |
| `GiveBackPage.jsx` | `setTimeout(() => setSubmitted(true), 1200)` | `supabase.from('journal_posts').insert(...)` |
| `BookingModal.jsx` | `setTimeout(() => setSuccess(true), 1800)` | Real Razorpay checkout |
| `Contact.jsx` | likely same setTimeout pattern | `supabase.from('contact_messages').insert(...)` |

**The single most important fix:** Create `src/lib/supabase.js` then replace `mockDB` in `App.jsx`.

---

## Database Schema

Supabase project region: **ap-southeast-1 (Singapore)**
All tables have RLS enabled. Users only see their own data unless role = 'admin'.

### Table: users
*Note: Supabase Auth manages `auth.users`. This table is a mirror with extra fields.*

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| id | UUID | Yes | gen_random_uuid() | PK, mirrors auth.users.id |
| email | VARCHAR(255) | Yes | — | UNIQUE, from auth |
| role | VARCHAR(20) | Yes | 'seeker' | seeker / guide / practitioner / admin |
| full_name | VARCHAR(255) | Yes | — | |
| phone | VARCHAR(20) | No | NULL | |
| is_verified | BOOLEAN | Yes | false | email verified |
| is_active | BOOLEAN | Yes | true | soft delete |
| created_at | TIMESTAMPTZ | Yes | now() | |
| updated_at | TIMESTAMPTZ | Yes | now() | |

```sql
-- RLS policies for users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own row" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own row" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin reads all" ON users FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

---

### Table: seeker_profiles
*Created when a seeker submits the MeetYourPeer form.*

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| id | UUID | Yes | gen_random_uuid() | PK |
| user_id | UUID | No | NULL | FK → auth.users.id (nullable — anonymous ok) |
| full_name | VARCHAR(255) | Yes | — | from form |
| email | VARCHAR(255) | Yes | — | from form |
| phone | VARCHAR(20) | No | NULL | from form |
| what_hurts | TEXT | Yes | — | their story — most important field |
| separation_type | VARCHAR(50) | No | NULL | divorce / separation / breakup / other |
| religion | VARCHAR(50) | No | NULL | |
| children_involved | BOOLEAN | No | NULL | |
| separation_timeline | VARCHAR(50) | No | NULL | |
| emotional_state | INTEGER | No | NULL | 1–10 scale |
| matching_status | VARCHAR(20) | Yes | 'pending' | pending / matched / closed |
| matched_guide_id | UUID | No | NULL | FK → peer_guide_profiles.id |
| created_at | TIMESTAMPTZ | Yes | now() | |

```sql
ALTER TABLE seeker_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Seeker reads own" ON seeker_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Seeker inserts own" ON seeker_profiles FOR INSERT WITH CHECK (true); -- allow anon
CREATE POLICY "Admin reads all" ON seeker_profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

---

### Table: healing_paths
*Created after user completes the 6-question onboarding assessment.*

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| id | UUID | Yes | gen_random_uuid() | PK |
| user_id | UUID | Yes | — | FK → auth.users.id, UNIQUE |
| answers | JSONB | Yes | — | array of 6 answers |
| phase | VARCHAR(20) | Yes | — | Stabilizing / Processing / Rebuilding / Thriving |
| summary | TEXT | Yes | — | AI-generated 2–3 sentence summary |
| focus_areas | TEXT[] | Yes | — | array of 3 focus areas |
| recommended_event | VARCHAR(100) | No | NULL | event title for dashboard |
| insight | TEXT | No | NULL | personalized encouraging sentence |
| next_step | TEXT | No | NULL | one concrete action for today |
| created_at | TIMESTAMPTZ | Yes | now() | |
| updated_at | TIMESTAMPTZ | Yes | now() | |

```sql
ALTER TABLE healing_paths ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User reads own" ON healing_paths FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User upserts own" ON healing_paths FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User updates own" ON healing_paths FOR UPDATE USING (auth.uid() = user_id);
```

---

### Table: peer_guide_profiles
*Filled by community members who want to become Peer Guides.*

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| id | UUID | Yes | gen_random_uuid() | PK |
| user_id | UUID | Yes | — | FK → auth.users.id |
| bio | TEXT | Yes | — | their story / why they want to help |
| separation_type_experienced | VARCHAR(50) | No | NULL | |
| languages_spoken | TEXT[] | No | '{}' | |
| is_available | BOOLEAN | Yes | true | |
| session_rate_inr | INTEGER | No | NULL | rate in rupees |
| avg_rating | NUMERIC(3,2) | No | NULL | 0.00–5.00 |
| is_approved_by_admin | BOOLEAN | Yes | false | must be true to appear in matches |
| created_at | TIMESTAMPTZ | Yes | now() | |

```sql
ALTER TABLE peer_guide_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Guide reads own" ON peer_guide_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Guide inserts own" ON peer_guide_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Approved guides visible to all" ON peer_guide_profiles
  FOR SELECT USING (is_approved_by_admin = true);
CREATE POLICY "Admin manages all" ON peer_guide_profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

---

### Table: journal_posts
*Both community-submitted stories (GiveBackPage) and editorial articles.*

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| id | UUID | Yes | gen_random_uuid() | PK |
| author_id | UUID | No | NULL | FK → auth.users.id (nullable for anon) |
| author_name | VARCHAR(255) | No | NULL | display name |
| author_email | VARCHAR(255) | No | NULL | for admin contact |
| slug | VARCHAR(255) | No | NULL | UNIQUE, URL: /journal/:slug |
| title | VARCHAR(500) | No | NULL | |
| content | TEXT | Yes | — | full article body |
| excerpt | TEXT | No | NULL | 1–2 sentence preview |
| emoji | VARCHAR(10) | No | '🌿' | card display emoji |
| tag | VARCHAR(50) | No | NULL | Healing / Grief / Identity etc |
| tag_color | VARCHAR(30) | No | NULL | rgba CSS value |
| tag_text_color | VARCHAR(10) | No | NULL | hex CSS value |
| read_time_minutes | INTEGER | No | NULL | |
| emotion_tags | TEXT[] | No | '{}' | for matching |
| is_anonymous | BOOLEAN | Yes | false | hide author name |
| status | VARCHAR(20) | Yes | 'pending_review' | draft / pending_review / published |
| author_type | VARCHAR(20) | No | 'community' | community / editorial |
| reviewed_by | UUID | No | NULL | FK → auth.users.id (admin) |
| published_at | TIMESTAMPTZ | No | NULL | set when status → published |
| created_at | TIMESTAMPTZ | Yes | now() | |

```sql
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads published" ON journal_posts
  FOR SELECT USING (status = 'published');
CREATE POLICY "Author reads own" ON journal_posts
  FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "Anyone inserts pending" ON journal_posts
  FOR INSERT WITH CHECK (status = 'pending_review');
CREATE POLICY "Admin manages all" ON journal_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

---

### Table: sessions
*A booked event or 1:1 session.*

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| id | UUID | Yes | gen_random_uuid() | PK |
| user_id | UUID | Yes | — | FK → auth.users.id (the payer/attendee) |
| event_id | INTEGER | No | NULL | matches id in data/events.js (until events move to DB) |
| event_title | VARCHAR(255) | Yes | — | copied at booking time |
| price_inr | INTEGER | Yes | — | amount in paise × 100 for Razorpay |
| razorpay_order_id | VARCHAR(100) | No | NULL | from create-order Edge Function |
| razorpay_payment_id | VARCHAR(100) | No | NULL | from verify-payment webhook |
| booking_ref | VARCHAR(20) | No | NULL | human-readable e.g. FBTB-2026-001 |
| status | VARCHAR(20) | Yes | 'pending' | pending / confirmed / cancelled / refunded |
| created_at | TIMESTAMPTZ | Yes | now() | |

```sql
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User reads own sessions" ON sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System inserts" ON sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin reads all" ON sessions FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

---

### Table: contact_messages
*From the Contact page form.*

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| id | UUID | Yes | gen_random_uuid() | PK |
| name | VARCHAR(255) | Yes | — | |
| email | VARCHAR(255) | Yes | — | |
| phone | VARCHAR(20) | No | NULL | |
| subject | VARCHAR(255) | No | NULL | |
| message | TEXT | Yes | — | |
| created_at | TIMESTAMPTZ | Yes | now() | |

```sql
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
-- No user-level auth needed — public form
CREATE POLICY "Anyone inserts" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin reads all" ON contact_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

---

### Table: matches
*Admin-created or algorithm-created pairing of seeker ↔ guide.*

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| id | UUID | Yes | gen_random_uuid() | PK |
| seeker_id | UUID | Yes | — | FK → seeker_profiles.id |
| guide_id | UUID | Yes | — | FK → peer_guide_profiles.id |
| matched_by | VARCHAR(20) | Yes | 'admin' | admin / algorithm |
| match_score | INTEGER | No | NULL | 0–100 |
| match_reasons | TEXT[] | No | '{}' | why matched |
| status | VARCHAR(20) | Yes | 'pending' | pending / active / completed / declined |
| created_at | TIMESTAMPTZ | Yes | now() | |

---

### Table: notifications
*In-app notification queue.*

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| id | UUID | Yes | gen_random_uuid() | PK |
| user_id | UUID | Yes | — | FK → auth.users.id |
| type | VARCHAR(50) | Yes | — | match_found / session_confirmed / story_approved |
| title | VARCHAR(255) | Yes | — | |
| body | TEXT | No | NULL | |
| link_to | VARCHAR(500) | No | NULL | URL to navigate to |
| is_read | BOOLEAN | Yes | false | |
| sent_email | BOOLEAN | Yes | false | whether email also sent via Resend |
| created_at | TIMESTAMPTZ | Yes | now() | |

---

## Admin Role Setup

To make a user an admin, run this SQL in Supabase SQL Editor:
```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'),
  '{role}',
  '"admin"'
)
WHERE email = 'YOUR_EMAIL_HERE';
```

Check admin in components:
```javascript
const isAdmin = user?.user_metadata?.role === 'admin'
```

---

## Routes (App.jsx)

| Path | Component | Auth Required |
|---|---|---|
| `/` | LandingPage | No |
| `/about` | About | No |
| `/meet-your-peer` | MeetYourPeer | Soft (prompt to sign up) |
| `/contact` | Contact | No |
| `/privacy-policy` | PrivacyPolicy | No |
| `/terms` | Terms | No |
| `/events` | EventsPage | No (soft for booking) |
| `/journal` | BlogPage | No |
| `/journal/:slug` | ArticlePage | No |
| `/dashboard` | Dashboard | Yes → redirect / |
| `/give-back` | GiveBackPage | No |
| `/signin` | AuthPage mode=login | No |
| `/register` | AuthPage mode=signup | No |
| `/admin` | AdminPage | Yes + role=admin |

---

## Auth Pattern (after WF1 is fixed)

```javascript
// In App.jsx — session persistence on mount
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user ?? null)
  })
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null)
  })
  return () => subscription.unsubscribe()
}, [])
```

```javascript
// Get user name safely (Supabase stores name in user_metadata)
const displayName = user?.user_metadata?.full_name?.split(' ')[0]
               ?? user?.email?.split('@')[0]
               ?? 'friend'
```

---

## Edge Functions

All Edge Functions live in `supabase/functions/` folder.
Deploy with: `supabase functions deploy FUNCTION_NAME`

### heal-path
Accepts: `{ answers: string[] }` (6 onboarding answers)
Returns: `{ summary, phase, focusAreas, recommendedEvent, insight, nextStep }`
Calls: Anthropic Claude API with compassionate system prompt
Secret needed: `ANTHROPIC_API_KEY`

### create-razorpay-order
Accepts: `{ amount_inr: number, event_title: string, user_id: string }`
Returns: `{ order_id, amount, currency }`
Calls: Razorpay Orders API
Secret needed: `RAZORPAY_KEY_SECRET`

### verify-payment
Accepts: Razorpay webhook payload
Validates: HMAC signature with `RAZORPAY_KEY_SECRET`
Updates: sessions table status → 'confirmed'

### send-notification
Accepts: `{ to: string, subject: string, html: string }`
Calls: Resend API
Secret needed: `RESEND_API_KEY`

---

## CSS Classes (existing — do not change names)

```
Layout:    .app-container, .section, .section-tag, .section-title, .section-sub
Nav:       .nav, .nav-inner, .nav-logo, .nav-links, .nav-cta, .nav-hamburger, .nav-mobile
Buttons:   .btn-primary, .btn-secondary, .nav-btn
Auth:      .auth-overlay, .auth-card, .auth-title, .auth-sub, .form-group,
           .form-label, .form-input, .form-btn, .auth-switch, .error-msg
Onboard:   .onboarding-overlay, .onboarding-card, .progress-bar, .progress-fill,
           .q-step, .q-text, .q-options, .q-option, .q-option.selected,
           .q-textarea, .q-nav, .q-back, .q-next, .spinner
Dashboard: .dashboard, .dashboard-header, .dashboard-greeting, .healing-phase,
           .phase-label, .phase-title, .phase-summary, .phase-insight,
           .dash-grid, .dash-card, .card-btn, .card-btn-primary, .card-btn-outline
Events:    .events-page, .events-grid, .event-card, .event-card-body, .event-tag
Blog:      .blog-page, .blog-grid, .blog-card, .article-page, .article-title
Modal:     .modal-overlay, .modal-card, .stripe-field, .stripe-row, .stripe-secure
Footer:    .footer, .footer-main, .footer-brand, .footer-nav, .footer-copy
```

---

## Important Constraints

1. **Never change CSS class names** — they are used across multiple components via globalCSS in theme.js
2. **Never put secret keys in Vercel** — only `VITE_` prefixed public keys go there
3. **Always use the single supabase client** from `src/lib/supabase.js` — never create a new one
4. **User name field** is `user.user_metadata?.full_name` not `user.name` (Supabase convention)
5. **Emotional tone** — this platform serves people in grief. Error messages, loading text, and UI copy must always be warm and compassionate. Never use words like "error", "failed", "invalid" without a gentle follow-up.
6. **RLS on every table** — never create a table without Row Level Security enabled
7. **CORS headers** — all Edge Functions need CORS headers for the Vite dev server (`http://localhost:5173`)

---

## Crisis Resources (include in relevant UI)

```
iCall:       9152987821
Vandrevala:  1860-2662-345
```

These must appear on any page where users discuss emotional distress.

---

## Build Order (what to do first)

```
1. Create src/lib/supabase.js
2. Add VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY to Vercel
3. Enable Email Auth in Supabase dashboard
4. Replace mockDB in AuthModal.jsx → supabase.auth
5. Replace mockDB in AuthPage.jsx → supabase.auth
6. Fix App.jsx session persistence → onAuthStateChange
7. Update Nav.jsx to show user + logout
8. Create healing_paths table
9. Deploy heal-path Edge Function
10. Fix api/healingPath.js to call Edge Function
... (see docs/workflow-tracker.xlsx for all 28 steps)
```
