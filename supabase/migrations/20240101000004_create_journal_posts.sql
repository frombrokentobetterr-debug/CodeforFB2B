-- ============================================================
-- Migration 005: journal_posts
-- Community stories (GiveBackPage) + editorial articles
-- ============================================================

CREATE TABLE public.journal_posts (
  id                  UUID          NOT NULL DEFAULT gen_random_uuid(),
  author_id           UUID          NULL,
  author_name         VARCHAR(255)  NULL,
  author_email        VARCHAR(255)  NULL,
  slug                VARCHAR(255)  NULL,
  title               VARCHAR(500)  NULL,
  content             TEXT          NOT NULL,
  excerpt             TEXT          NULL,
  emoji               VARCHAR(10)   NULL DEFAULT '🌿',
  tag                 VARCHAR(50)   NULL,
  tag_color           VARCHAR(30)   NULL,
  tag_text_color      VARCHAR(10)   NULL,
  read_time_minutes   INTEGER       NULL,
  emotion_tags        TEXT[]        NOT NULL DEFAULT '{}',
  is_anonymous        BOOLEAN       NOT NULL DEFAULT false,
  status              VARCHAR(20)   NOT NULL DEFAULT 'pending_review',
  author_type         VARCHAR(20)   NULL DEFAULT 'community',
  reviewed_by         UUID          NULL,
  published_at        TIMESTAMPTZ   NULL,
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT journal_posts_pkey PRIMARY KEY (id),
  CONSTRAINT journal_posts_slug_key UNIQUE (slug),
  CONSTRAINT journal_posts_author_id_fkey FOREIGN KEY (author_id)
    REFERENCES auth.users (id) ON DELETE SET NULL,
  CONSTRAINT journal_posts_reviewed_by_fkey FOREIGN KEY (reviewed_by)
    REFERENCES auth.users (id) ON DELETE SET NULL,
  CONSTRAINT journal_posts_status_check CHECK (
    status IN ('draft', 'pending_review', 'published')
  ),
  CONSTRAINT journal_posts_author_type_check CHECK (
    author_type IN ('community', 'editorial')
  )
);

-- RLS
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone reads published"
  ON public.journal_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Author reads own"
  ON public.journal_posts FOR SELECT
  USING (auth.uid() = author_id);

CREATE POLICY "Anyone inserts pending"
  ON public.journal_posts FOR INSERT
  WITH CHECK (status = 'pending_review');

CREATE POLICY "Admin manages all"
  ON public.journal_posts FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );
