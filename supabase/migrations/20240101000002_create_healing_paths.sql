-- ============================================================
-- Migration 003: healing_paths
-- Created after user completes the 6-question onboarding
-- ============================================================

CREATE TABLE public.healing_paths (
  id                  UUID          NOT NULL DEFAULT gen_random_uuid(),
  user_id             UUID          NOT NULL,
  answers             JSONB         NOT NULL,
  phase               VARCHAR(20)   NOT NULL,
  summary             TEXT          NOT NULL,
  focus_areas         TEXT[]        NOT NULL,
  recommended_event   VARCHAR(100)  NULL,
  insight             TEXT          NULL,
  next_step           TEXT          NULL,
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT healing_paths_pkey PRIMARY KEY (id),
  CONSTRAINT healing_paths_user_id_key UNIQUE (user_id),
  CONSTRAINT healing_paths_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users (id) ON DELETE CASCADE,
  CONSTRAINT healing_paths_phase_check CHECK (
    phase IN ('Stabilizing', 'Processing', 'Rebuilding', 'Thriving')
  )
);

CREATE TRIGGER healing_paths_updated_at
  BEFORE UPDATE ON public.healing_paths
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.healing_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User reads own"
  ON public.healing_paths FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "User upserts own"
  ON public.healing_paths FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User updates own"
  ON public.healing_paths FOR UPDATE
  USING (auth.uid() = user_id);
