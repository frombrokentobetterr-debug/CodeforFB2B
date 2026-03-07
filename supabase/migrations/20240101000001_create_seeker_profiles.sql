-- ============================================================
-- Migration 002: seeker_profiles
-- Created when a seeker submits the MeetYourPeer form
-- ============================================================

CREATE TABLE public.seeker_profiles (
  id                   UUID          NOT NULL DEFAULT gen_random_uuid(),
  user_id              UUID          NULL,
  full_name            VARCHAR(255)  NOT NULL,
  email                VARCHAR(255)  NOT NULL,
  phone                VARCHAR(20)   NULL,
  what_hurts           TEXT          NOT NULL,
  separation_type      VARCHAR(50)   NULL,
  religion             VARCHAR(50)   NULL,
  children_involved    BOOLEAN       NULL,
  separation_timeline  VARCHAR(50)   NULL,
  emotional_state      INTEGER       NULL,
  matching_status      VARCHAR(20)   NOT NULL DEFAULT 'pending',
  matched_guide_id     UUID          NULL,
  created_at           TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT seeker_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT seeker_profiles_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users (id) ON DELETE SET NULL,
  CONSTRAINT seeker_profiles_emotional_state_check CHECK (
    emotional_state IS NULL OR (emotional_state >= 1 AND emotional_state <= 10)
  ),
  CONSTRAINT seeker_profiles_matching_status_check CHECK (
    matching_status IN ('pending', 'matched', 'closed')
  )
);

-- RLS
ALTER TABLE public.seeker_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Seeker reads own"
  ON public.seeker_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Seeker inserts own"
  ON public.seeker_profiles FOR INSERT
  WITH CHECK (true); -- allow anonymous submissions

CREATE POLICY "Admin reads all"
  ON public.seeker_profiles FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );
