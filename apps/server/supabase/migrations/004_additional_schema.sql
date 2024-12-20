-- Additional tables for Ddait v2.0

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- System versioning tables
CREATE TABLE public.schema_versions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    version TEXT NOT NULL,
    description TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    applied_by TEXT
);

-- Metadata management
CREATE TABLE public.metadata_definitions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    table_name TEXT NOT NULL,
    field_name TEXT NOT NULL,
    field_type TEXT NOT NULL,
    description TEXT,
    is_required BOOLEAN DEFAULT false,
    validation_rules JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(table_name, field_name)
);

-- Exercise details table with improved structure
CREATE TABLE public.exercise_details (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID REFERENCES public.exercise_sessions(id) ON DELETE CASCADE,
    exercise_name TEXT NOT NULL,
    exercise_category TEXT NOT NULL,
    sets INTEGER,
    reps INTEGER,
    weight DECIMAL,
    distance DECIMAL,
    duration INTEGER,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    equipment_used TEXT[],
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    version INTEGER DEFAULT 1,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Exercise templates for reusability
CREATE TABLE public.exercise_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    default_sets INTEGER,
    default_reps INTEGER,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    equipment_required TEXT[],
    metadata JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Social features with improved structure
CREATE TABLE public.friendships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    friend_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
    metadata JSONB DEFAULT '{}'::jsonb,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, friend_id)
);

-- Activity feed with improved categorization
CREATE TABLE public.activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('exercise', 'competition', 'achievement', 'social', 'system')),
    category TEXT NOT NULL,
    content JSONB NOT NULL,
    visibility TEXT DEFAULT 'friends' CHECK (visibility IN ('public', 'friends', 'private')),
    metadata JSONB DEFAULT '{}'::jsonb,
    version INTEGER DEFAULT 1,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Achievement system with templates
CREATE TABLE public.achievement_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    requirements JSONB NOT NULL,
    rewards JSONB NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    template_id UUID REFERENCES public.achievement_templates(id),
    progress INTEGER DEFAULT 0,
    status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'failed')),
    completed_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Reward system with templates
CREATE TABLE public.reward_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('exp', 'badge', 'item', 'currency')),
    title TEXT NOT NULL,
    description TEXT,
    value_type TEXT NOT NULL CHECK (value_type IN ('fixed', 'percentage', 'range')),
    value JSONB NOT NULL,
    conditions JSONB,
    metadata JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.rewards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    template_id UUID REFERENCES public.reward_templates(id),
    type TEXT NOT NULL CHECK (type IN ('exp', 'badge', 'item', 'currency')),
    amount INTEGER,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired')),
    metadata JSONB DEFAULT '{}'::jsonb,
    expires_at TIMESTAMP WITH TIME ZONE,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- System configuration
CREATE TABLE public.system_configs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category TEXT NOT NULL,
    key TEXT NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(category, key)
);

-- Enable RLS
ALTER TABLE public.exercise_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievement_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_configs ENABLE ROW LEVEL SECURITY;

-- Add constraints and indexes
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS height DECIMAL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS weight DECIMAL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS birth_date DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('male', 'female', 'other'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_exercises TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 1;

-- Add metadata columns to existing tables
ALTER TABLE public.exercise_sessions ADD COLUMN IF NOT EXISTS intensity TEXT CHECK (intensity IN ('low', 'medium', 'high'));
ALTER TABLE public.exercise_sessions ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.exercise_sessions ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.exercise_sessions ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 1;

ALTER TABLE public.competitions ADD COLUMN IF NOT EXISTS title TEXT NOT NULL DEFAULT 'Competition';
ALTER TABLE public.competitions ADD COLUMN IF NOT EXISTS exercise_type TEXT NOT NULL DEFAULT 'general';
ALTER TABLE public.competitions ADD COLUMN IF NOT EXISTS rules JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.competitions ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.competitions ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 1;

-- Add performance indexes
CREATE INDEX IF NOT EXISTS idx_exercise_sessions_user_id ON public.exercise_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_details_session_id ON public.exercise_details(session_id);
CREATE INDEX IF NOT EXISTS idx_exercise_templates_category ON public.exercise_templates(category);
CREATE INDEX IF NOT EXISTS idx_competition_participants_user_id ON public.competition_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_competition_participants_competition_id ON public.competition_participants(competition_id);
CREATE INDEX IF NOT EXISTS idx_friendships_user_id ON public.friendships(user_id);
CREATE INDEX IF NOT EXISTS idx_friendships_friend_id ON public.friendships(friend_id);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON public.activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_type_created_at ON public.activities(type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON public.achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_template_id ON public.achievements(template_id);
CREATE INDEX IF NOT EXISTS idx_rewards_user_id ON public.rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_rewards_template_id ON public.rewards(template_id);

-- Add GiST index for JSONB search
CREATE INDEX IF NOT EXISTS idx_activities_content_gin ON public.activities USING gin (content);
CREATE INDEX IF NOT EXISTS idx_metadata_gin ON public.metadata_definitions USING gin (validation_rules);

-- Add text search capabilities
CREATE INDEX IF NOT EXISTS idx_exercise_templates_text_search ON public.exercise_templates 
USING gin(to_tsvector('english', name || ' ' || coalesce(description, '')));
  