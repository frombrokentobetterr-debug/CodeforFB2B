-- ============================================================
-- Migration 006: sessions
-- A booked event or 1:1 session with Razorpay payment tracking
-- ============================================================

CREATE TABLE public.sessions (
  id                    UUID          NOT NULL DEFAULT gen_random_uuid(),
  user_id               UUID          NOT NULL,
  event_id              INTEGER       NULL,
  event_title           VARCHAR(255)  NOT NULL,
  price_inr             INTEGER       NOT NULL,
  razorpay_order_id     VARCHAR(100)  NULL,
  razorpay_payment_id   VARCHAR(100)  NULL,
  booking_ref           VARCHAR(20)   NULL,
  status                VARCHAR(20)   NOT NULL DEFAULT 'pending',
  created_at            TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT sessions_pkey PRIMARY KEY (id),
  CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users (id) ON DELETE CASCADE,
  CONSTRAINT sessions_status_check CHECK (
    status IN ('pending', 'confirmed', 'cancelled', 'refunded')
  )
);

-- RLS
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User reads own sessions"
  ON public.sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System inserts"
  ON public.sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin reads all"
  ON public.sessions FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );
