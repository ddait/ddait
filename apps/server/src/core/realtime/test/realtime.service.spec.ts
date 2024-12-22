import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { RealtimeService } from '../realtime.service';
import { ConnectionManagerService } from '../connection-manager.service';

describe('RealtimeService', () => {
  let service: RealtimeService;
  let connectionManagerService: ConnectionManagerService;

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
        },
        {
          provide: ConnectionManagerService,
          useValue: {
            createChannel: jest.fn().mockResolvedValue({
              on: jest.fn().mockReturnThis(),
              subscribe: jest.fn().mockResolvedValue(true)
            }),
            removeChannel: jest.fn().mockResolvedValue(undefined),
            getChannel: jest.fn(),
            getActiveChannels: jest.fn().mockReturnValue([]),
            closeAllChannels: jest.fn().mockResolvedValue(undefined)
          }
        }
      ]
    }).compile();

    service = module.get<RealtimeService>(RealtimeService);
    connectionManagerService = module.get<ConnectionManagerService>(ConnectionManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize realtime channels', async () => {
    // onModuleInit 호출
    await service.onModuleInit();
    
    expect(service).toBeDefined();
    expect(service.broadcastExerciseUpdate).toBeDefined();
    expect(service.broadcastCompetitionUpdate).toBeDefined();
    expect(connectionManagerService.createChannel).toHaveBeenCalledTimes(2);
    expect(connectionManagerService.createChannel).toHaveBeenCalledWith(
      'exercise_updates',
      expect.objectContaining({
        table: 'exercise_sessions',
        events: ['*']
      })
    );
    expect(connectionManagerService.createChannel).toHaveBeenCalledWith(
      'competition_updates',
      expect.objectContaining({
        table: 'competitions',
        events: ['*']
      })
    );
  });
}); 