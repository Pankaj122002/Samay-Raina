# Upgrade Path

This document outlines how to evolve the current static site into a full-stack application.

## Current Architecture

- **Frontend:** Next.js 14+ with App Router, static export
- **Data:** JSON files (`shows.json`, `content.json`)
- **Forms:** Supabase Edge Function (logs submissions, no email yet)
- **Hosting:** Static (Vercel/Netlify)

## Planned Upgrades

### 1. CMS Integration (Content Management)

**Goal:** Allow Samay's team to update shows without touching code.

**Approach:**
- Add Sanity, Contentlayer, or Notion API as headless CMS
- Replace static JSON imports with `fetch()` calls to CMS API
- Use Next.js `revalidate` for ISR (Incremental Static Regeneration)
- No frontend rebuild needed — just swap data source

**Effort:** Low — swap static import for `fetch()` in page components

### 2. Real-Time Show Availability

**Goal:** Display live seat counts and availability status.

**Approach:**
- Add Supabase database table: `shows` with columns for availability, seat_count
- Add Next.js API Route or Edge Function to query/update availability
- Frontend polls or uses realtime subscriptions

**Effort:** Medium — requires schema design + backend logic

### 3. Online Ticket Purchasing

**Goal:** Allow users to buy tickets directly.

**Approach:**
- Integrate Stripe or Razorpay (India-specific)
- Add checkout page/route (`/checkout/[showId]`)
- Use Stripe Checkout or Razorpay payment links
- Store orders in Supabase database

**Effort:** Medium-High — requires payment provider setup + order management

### 4. User Accounts

**Goal:** Users can log in, view booking history, manage preferences.

**Approach:**
- Use Supabase Auth (email/password)
- Add auth context to frontend
- Protect routes with middleware
- Store user data in `profiles` table

**Effort:** Medium — requires auth UI + protected routes

### 5. Automated Email Confirmations

**Goal:** Send confirmation emails on registration/application.

**Approach:**
- Use Resend or SendGrid from Edge Function
- Trigger email on form submission
- Templates for: application received, registration confirmed, ticket available

**Effort:** Low — add email API call to existing edge function

### 6. Multilingual Support

**Goal:** Support English + Hindi.

**Approach:**
- Use `next-intl` or similar i18n library
- Add locale files for all content
- Add language switcher to navigation

**Effort:** Medium — requires translating all content

## Migration Strategy

Each upgrade can be implemented independently:

1. CMS integration does not require backend
2. Backend additions (database, auth, payments) can be added incrementally
3. The static export can be switched to SSR/ISR when needed
4. All existing sections remain unchanged during upgrades

## Database Schema (Proposed)

```sql
-- Shows table
CREATE TABLE shows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  date date NOT NULL,
  time text,
  venue text,
  city text,
  type text,
  description text,
  price text,
  status text,
  total_seats int,
  available_seats int,
  created_at timestamptz DEFAULT now()
);

-- Applications table
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL, -- 'participant' or 'audience'
  data jsonb NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Orders table (for ticketing)
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  show_id uuid REFERENCES shows(id),
  quantity int,
  total_amount int,
  payment_status text,
  created_at timestamptz DEFAULT now()
);
```

## Notes

- The current Next.js App Router architecture supports all these upgrades without a full rebuild
- Static pages can be converted to dynamic routes with `generateStaticParams` or SSR
- Edge Functions can handle all backend logic without a separate server
