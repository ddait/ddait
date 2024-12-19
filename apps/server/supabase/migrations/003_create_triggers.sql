-- 프로필 업데이트 타임스탬프 트리거
CREATE OR REPLACE FUNCTION update_profile_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_profile_timestamp
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_profile_timestamp();

-- 경쟁 참가자 수 업데이트 트리거
CREATE OR REPLACE FUNCTION update_competition_participant_count()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE public.competitions
        SET current_participants = current_participants + 1
        WHERE id = NEW.competition_id;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE public.competitions
        SET current_participants = current_participants - 1
        WHERE id = OLD.competition_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_competition_count
    AFTER INSERT OR DELETE ON public.competition_participants
    FOR EACH ROW
    EXECUTE FUNCTION update_competition_participant_count();

-- 운동 세션 완료 시 경험치 부여 트리���
CREATE OR REPLACE FUNCTION award_exercise_exp()
RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.status = 'completed' AND OLD.status != 'completed') THEN
        -- 기본 경험치 계산 (운동 시간 * 10)
        WITH exp_calc AS (
            SELECT 
                GREATEST(EXTRACT(EPOCH FROM (NEW.end_time - NEW.start_time))/60 * 10, 0)::INTEGER as exp_gained
        )
        UPDATE public.profiles
        SET 
            exp = exp + exp_calc.exp_gained,
            level = CASE 
                WHEN exp + exp_calc.exp_gained >= (level * 1000) 
                THEN level + 1 
                ELSE level 
            END
        FROM exp_calc
        WHERE id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_award_exercise_exp
    AFTER UPDATE ON public.exercise_sessions
    FOR EACH ROW
    EXECUTE FUNCTION award_exercise_exp();

-- 경쟁 완료 시 보상 트리거
CREATE OR REPLACE FUNCTION award_competition_rewards()
RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.status = 'completed' AND OLD.status != 'completed') THEN
        -- 상위 3명에게 경험치 부여
        WITH ranked_participants AS (
            SELECT 
                user_id,
                RANK() OVER (ORDER BY score DESC) as rank
            FROM public.competition_participants
            WHERE competition_id = NEW.id
        )
        UPDATE public.profiles p
        SET 
            exp = exp + CASE 
                WHEN rp.rank = 1 THEN 1000
                WHEN rp.rank = 2 THEN 500
                WHEN rp.rank = 3 THEN 250
                ELSE 100
            END,
            level = CASE 
                WHEN exp + CASE 
                    WHEN rp.rank = 1 THEN 1000
                    WHEN rp.rank = 2 THEN 500
                    WHEN rp.rank = 3 THEN 250
                    ELSE 100
                END >= (level * 1000) 
                THEN level + 1 
                ELSE level 
            END
        FROM ranked_participants rp
        WHERE p.id = rp.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_award_competition_rewards
    AFTER UPDATE ON public.competitions
    FOR EACH ROW
    EXECUTE FUNCTION award_competition_rewards(); 