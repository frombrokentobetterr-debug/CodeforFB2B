-- ============================================================
-- Migration 007: contact_messages
-- From the Contact page form — no auth required
-- ============================================================

CREATE TABLE public.contact_messages (
  id          UUID          NOT NULL DEFAULT gen_random_uuid(),
  name        VARCHAR(255)  NOT NULL,
  email       VARCHAR(255)  NOT NULL,
  phone       VARCHAR(20)   NULL,
  subject     VARCHAR(255)  NULL,
  message     TEXT          NOT NULL,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT contact_messages_pkey PRIMARY KEY (id)
);

-- RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone inserts"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin reads all"
  ON public.contact_messages FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );
