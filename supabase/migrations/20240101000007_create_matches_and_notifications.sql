-- ============================================================
-- Migration 008: matches
-- Admin or algorithm pairing of seeker <-> guide
-- ============================================================

CREATE TABLE public.matches (
  id              UUID          NOT NULL DEFAULT gen_random_uuid(),
  seeker_id       UUID          NOT NULL,
  guide_id        UUID          NOT NULL,
  matched_by      VARCHAR(20)   NOT NULL DEFAULT 'admin',
  match_score     INTEGER       NULL,
  match_reasons   TEXT[]        NOT NULL DEFAULT '{}',
  status          VARCHAR(20)   NOT NULL DEFAULT 'pending',
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT matches_pkey PRIMARY KEY (id),
  CONSTRAINT matches_seeker_id_fkey FOREIGN KEY (seeker_id)
    REFERENCES public.seeker_profiles (id) ON DELETE CASCADE,
  CONSTRAINT matches_guide_id_fkey FOREIGN KEY (guide_id)
    REFERENCES public.peer_guide_profiles (id) ON DELETE CASCADE,
  CONSTRAINT matches_matched_by_check CHECK (
    matched_by IN ('admin', 'algorithm')
  ),
  CONSTRAINT matches_status_check CHECK (
    status IN ('pending', 'active', 'completed', 'declined')
  ),
  CONSTRAINT matches_score_check CHECK (
    match_score IS NULL OR (match_score >= 0 AND match_score <= 100)
  )
);

-- RLS
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages all matches"
  ON public.matches FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- Migration 008b: notifications
-- In-app notification queue
-- ============================================================

CREATE TABLE public.notifications (
  id          UUID          NOT NULL DEFAULT gen_random_uuid(),
  user_id     UUID          NOT NULL,
  type        VARCHAR(50)   NOT NULL,
  title       VARCHAR(255)  NOT NULL,
  body        TEXT          NULL,
  link_to     VARCHAR(500)  NULL,
  is_read     BOOLEAN       NOT NULL DEFAULT false,
  sent_email  BOOLEAN       NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users (id) ON DELETE CASCADE,
  CONSTRAINT notifications_type_check CHECK (
    type IN ('match_found', 'session_confirmed', 'story_approved')
  )
);

-- RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User reads own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "User updates own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admin manages all notifications"
  ON public.notifications FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );
