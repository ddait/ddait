-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competition_participants ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Exercise sessions policies
CREATE POLICY "Users can view own exercise sessions"
  ON public.exercise_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own exercise sessions"
  ON public.exercise_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exercise sessions"
  ON public.exercise_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Competition policies
CREATE POLICY "Anyone can view competitions"
  ON public.competitions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create competitions"
  ON public.competitions FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Competition participants policies
CREATE POLICY "Users can view competition participants"
  ON public.competition_participants FOR SELECT
  USING (true);

CREATE POLICY "Users can join competitions"
  ON public.competition_participants FOR INSERT
  WITH CHECK (auth.uid() = user_id); 