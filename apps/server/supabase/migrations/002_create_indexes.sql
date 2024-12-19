-- 프로필 테이블 인덱스
CREATE INDEX IF NOT EXISTS idx_profiles_username 
ON public.profiles (username);

CREATE INDEX IF NOT EXISTS idx_profiles_level 
ON public.profiles (level);

-- 운동 세션 테이블 인덱스
CREATE INDEX IF NOT EXISTS idx_exercise_sessions_user_id 
ON public.exercise_sessions (user_id);

CREATE INDEX IF NOT EXISTS idx_exercise_sessions_type 
ON public.exercise_sessions (exercise_type);

CREATE INDEX IF NOT EXISTS idx_exercise_sessions_status 
ON public.exercise_sessions (status);

CREATE INDEX IF NOT EXISTS idx_exercise_sessions_date 
ON public.exercise_sessions (start_time);

-- 경쟁 테이블 인덱스
CREATE INDEX IF NOT EXISTS idx_competitions_type 
ON public.competitions (type);

CREATE INDEX IF NOT EXISTS idx_competitions_status 
ON public.competitions (status);

CREATE INDEX IF NOT EXISTS idx_competitions_date 
ON public.competitions (start_time);

-- 경쟁 참가자 테이블 인덱스
CREATE INDEX IF NOT EXISTS idx_competition_participants_user 
ON public.competition_participants (user_id);

CREATE INDEX IF NOT EXISTS idx_competition_participants_comp 
ON public.competition_participants (competition_id);

CREATE INDEX IF NOT EXISTS idx_competition_participants_score 
ON public.competition_participants (score DESC); 