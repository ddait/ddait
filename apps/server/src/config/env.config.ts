import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().transform(Number),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string()
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: NodeJS.ProcessEnv): Env {
  const result = envSchema.safeParse(config);
  
  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.format());
    throw new Error('Invalid environment variables');
  }
  
  return result.data;
} 