-- Template access policies
CREATE POLICY "Public templates are viewable by everyone"
  ON public.exercise_templates FOR SELECT
  USING (is_active = true);

CREATE POLICY "Only admins can manage templates"
  ON public.exercise_templates FOR ALL
  USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE metadata->>'role' = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM public.profiles WHERE metadata->>'role' = 'admin'));

-- Exercise details policies with improved security
CREATE POLICY "Users can view own exercise details and friends' public exercises"
  ON public.exercise_details FOR SELECT
  USING (
    session_id IN (
      SELECT id FROM public.exercise_sessions 
      WHERE user_id = auth.uid() OR
      (
        user_id IN (
          SELECT friend_id FROM public.friendships
          WHERE user_id = auth.uid() 
          AND status = 'accepted'
        )
        AND metadata->>'visibility' = 'public'
      )
    )
  );

CREATE POLICY "Users can create own exercise details"
  ON public.exercise_details FOR INSERT
  WITH CHECK (
    session_id IN (
      SELECT id FROM public.exercise_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own exercise details"
  ON public.exercise_details FOR UPDATE
  USING (
    session_id IN (
      SELECT id FROM public.exercise_sessions WHERE user_id = auth.uid()
    )
  );

-- Friendship policies with improved validation
CREATE POLICY "Users can view own friendships"
  ON public.friendships FOR SELECT
  USING (
    user_id = auth.uid() OR 
    friend_id = auth.uid() OR
    (
      user_id IN (
        SELECT friend_id FROM public.friendships
        WHERE user_id = auth.uid() 
        AND status = 'accepted'
      )
    )
  );

CREATE POLICY "Users can create friendships"
  ON public.friendships FOR INSERT
  WITH CHECK (
    user_id = auth.uid() AND
    friend_id != auth.uid() AND
    NOT EXISTS (
      SELECT 1 FROM public.friendships
      WHERE (user_id = auth.uid() AND friend_id = NEW.friend_id)
      OR (friend_id = auth.uid() AND user_id = NEW.friend_id)
    )
  );

CREATE POLICY "Users can update own friendships"
  ON public.friendships FOR UPDATE
  USING (user_id = auth.uid() OR friend_id = auth.uid());

-- Activity policies with improved visibility rules
CREATE POLICY "Users can view activities based on visibility and friendship"
  ON public.activities FOR SELECT
  USING (
    visibility = 'public' OR
    user_id = auth.uid() OR
    (
      visibility = 'friends' AND
      (
        user_id IN (
          SELECT friend_id FROM public.friendships
          WHERE user_id = auth.uid() 
          AND status = 'accepted'
        )
        OR
        user_id IN (
          SELECT user_id FROM public.friendships
          WHERE friend_id = auth.uid() 
          AND status = 'accepted'
        )
      )
    )
  );

CREATE POLICY "Users can create own activities"
  ON public.activities FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own activities"
  ON public.activities FOR UPDATE
  USING (user_id = auth.uid());

-- Achievement template policies
CREATE POLICY "Achievement templates are viewable by everyone"
  ON public.achievement_templates FOR SELECT
  USING (is_active = true);

CREATE POLICY "Only admins can manage achievement templates"
  ON public.achievement_templates FOR ALL
  USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE metadata->>'role' = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM public.profiles WHERE metadata->>'role' = 'admin'));

-- Achievement policies with template validation
CREATE POLICY "Users can view own achievements"
  ON public.achievements FOR SELECT
  USING (
    user_id = auth.uid() OR
    user_id IN (
      SELECT friend_id FROM public.friendships
      WHERE user_id = auth.uid() 
      AND status = 'accepted'
    )
  );

CREATE POLICY "System can manage achievements"
  ON public.achievements FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Reward template policies
CREATE POLICY "Reward templates are viewable by everyone"
  ON public.reward_templates FOR SELECT
  USING (is_active = true);

CREATE POLICY "Only admins can manage reward templates"
  ON public.reward_templates FOR ALL
  USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE metadata->>'role' = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM public.profiles WHERE metadata->>'role' = 'admin'));

-- Reward policies with improved validation
CREATE POLICY "Users can view own rewards"
  ON public.rewards FOR SELECT
  USING (
    user_id = auth.uid() OR
    user_id IN (
      SELECT friend_id FROM public.friendships
      WHERE user_id = auth.uid() 
      AND status = 'accepted'
    )
  );

CREATE POLICY "System can manage rewards"
  ON public.rewards FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- System configuration policies
CREATE POLICY "Public configs are viewable by everyone"
  ON public.system_configs FOR SELECT
  USING (is_active = true);

CREATE POLICY "Only admins can manage system configs"
  ON public.system_configs FOR ALL
  USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE metadata->>'role' = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM public.profiles WHERE metadata->>'role' = 'admin'));

-- Add rate limiting function with improved logic
CREATE OR REPLACE FUNCTION check_rate_limit(
    p_user_id UUID,
    p_action TEXT,
    p_limit INTEGER,
    p_window INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
    v_count INTEGER;
    v_user_role TEXT;
BEGIN
    -- Get user role from metadata
    SELECT metadata->>'role'
    INTO v_user_role
    FROM public.profiles
    WHERE id = p_user_id;

    -- Admins bypass rate limiting
    IF v_user_role = 'admin' THEN
        RETURN true;
    END IF;

    -- Count actions in the time window
    SELECT COUNT(*)
    INTO v_count
    FROM public.activities
    WHERE user_id = p_user_id
    AND type = p_action
    AND created_at > NOW() - (p_window || ' seconds')::INTERVAL;

    -- Return true if under limit
    RETURN v_count < p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 