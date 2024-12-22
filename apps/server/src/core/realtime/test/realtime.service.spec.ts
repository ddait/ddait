import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { RealtimeService } from '../realtime.service';

describe('RealtimeService', () => {
  let service: RealtimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RealtimeService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => {
              switch (key) {
                case 'SUPABASE_URL':
                  return 'https://test-project.supabase.co';
                case 'SUPABASE_SERVICE_KEY':
                  return 'test-service-key';
                default:
                  throw new Error(`Configuration key "${key}" does not exist`);
              }
            })
          }
        }
      ]
    }).compile();

    service = module.get<RealtimeService>(RealtimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize realtime channels', () => {
    expect(service).toBeDefined();
    expect(service.broadcastExerciseUpdate).toBeDefined();
    expect(service.broadcastCompetitionUpdate).toBeDefined();
  });
}); 