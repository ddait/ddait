-- Create audit log table
CREATE TABLE public.audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id),
    action_type TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on audit logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only system can insert, only admins can view
CREATE POLICY "System can insert audit logs"
    ON public.audit_logs FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Create audit log function
CREATE OR REPLACE FUNCTION audit_log_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.audit_logs (
        user_id,
        action_type,
        table_name,
        record_id,
        old_data,
        new_data
    )
    VALUES (
        auth.uid(),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)::jsonb ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW)::jsonb ELSE NULL END
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit triggers to important tables
CREATE TRIGGER audit_profiles_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

CREATE TRIGGER audit_exercise_sessions_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.exercise_sessions
    FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

CREATE TRIGGER audit_competitions_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.competitions
    FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

-- Auto-update timestamps function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_friendships_updated_at
    BEFORE UPDATE ON public.friendships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Achievement progress trigger
CREATE OR REPLACE FUNCTION check_achievement_completion()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.progress >= NEW.max_progress AND NEW.completed_at IS NULL THEN
        NEW.completed_at = timezone('utc'::text, now());
        
        -- Insert activity for achievement completion
        INSERT INTO public.activities (
            user_id,
            type,
            content,
            visibility
        ) VALUES (
            NEW.user_id,
            'achievement',
            jsonb_build_object(
                'achievement_id', NEW.id,
                'title', NEW.title,
                'type', NEW.type
            ),
            'public'
        );
        
        -- Grant reward
        INSERT INTO public.rewards (
            user_id,
            type,
            amount,
            description
        ) VALUES (
            NEW.user_id,
            'exp',
            100, -- Base exp reward
            'Achievement completion: ' || NEW.title
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER check_achievement_progress
    BEFORE UPDATE ON public.achievements
    FOR EACH ROW EXECUTE FUNCTION check_achievement_completion();

-- Competition management triggers
CREATE OR REPLACE FUNCTION manage_competition_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Auto-start competition when max participants reached
    IF NEW.current_participants = NEW.max_participants AND NEW.status = 'waiting' THEN
        NEW.status := 'active';
        NEW.start_time := timezone('utc'::text, now());
    END IF;
    
    -- Auto-complete competition when end_time reached
    IF NEW.status = 'active' AND NEW.end_time <= timezone('utc'::text, now()) THEN
        NEW.status := 'completed';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER manage_competition_lifecycle
    BEFORE UPDATE ON public.competitions
    FOR EACH ROW EXECUTE FUNCTION manage_competition_status(); 