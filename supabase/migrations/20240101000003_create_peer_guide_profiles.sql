-- ============================================================
-- Migration 004: peer_guide_profiles
-- Filled by community members who want to become Peer Guides
-- ============================================================

CREATE TABLE public.peer_guide_profiles (
  id                           UUID          NOT NULL DEFAULT gen_random_uuid(),
  user_id                      UUID          NOT NULL,
  bio                          TEXT          NOT NULL,
  separation_type_experienced  VARCHAR(50)   NULL,
  languages_spoken             TEXT[]        NOT NULL DEFAULT '{}',
  is_available                 BOOLEAN       NOT NULL DEFAULT true,
  session_rate_inr             INTEGER       NULL,
  avg_rating                   NUMERIC(3,2)  NULL,
  is_approved_by_admin         BOOLEAN       NOT NULL DEFAULT false,
  created_at                   TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT peer_guide_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT peer_guide_profiles_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users (id) ON DELETE CASCADE,
  CONSTRAINT peer_guide_profiles_avg_rating_check CHECK (
    avg_rating IS NULL OR (avg_rating >= 0 AND avg_rating <= 5)
  )
);

-- RLS
ALTER TABLE public.peer_guide_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Guide reads own"
  ON public.peer_guide_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Guide inserts own"
  ON public.peer_guide_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Approved guides visible to all"
  ON public.peer_guide_profiles FOR SELECT
  USING (is_approved_by_admin = true);

CREATE POLICY "Admin manages all"
  ON public.peer_guide_profiles FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );
