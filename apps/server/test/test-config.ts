export const testConfig = {
  SUPABASE_URL: 'https://test-project.supabase.co',
  SUPABASE_ANON_KEY: 'test-anon-key',
  JWT_SECRET: 'test-jwt-secret',
  API_VERSION: '1.0.0',
};

export const mockConfigService = {
  get: jest.fn((key: string) => {
    return testConfig[key];
  }),
}; 