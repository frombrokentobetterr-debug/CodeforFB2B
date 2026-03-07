-- ============================================================
-- Migration 001: users
-- Mirror of auth.users with extra application fields
-- ============================================================

CREATE TABLE public.users (
  id             UUID          NOT NULL DEFAULT gen_random_uuid(),
  email          VARCHAR(255)  NOT NULL,
  role           VARCHAR(20)   NOT NULL DEFAULT 'seeker',
  full_name      VARCHAR(255)  NOT NULL,
  phone          VARCHAR(20)   NULL,
  is_verified    BOOLEAN       NOT NULL DEFAULT false,
  is_active      BOOLEAN       NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_email_key UNIQUE (email),
  CONSTRAINT users_id_fkey FOREIGN KEY (id)
    REFERENCES auth.users (id) ON DELETE CASCADE,
  CONSTRAINT users_role_check CHECK (
    role IN ('seeker', 'guide', 'practitioner', 'admin')
  )
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create public.users row on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'seeker')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own row"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users update own row"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admin reads all"
  ON public.users FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );
