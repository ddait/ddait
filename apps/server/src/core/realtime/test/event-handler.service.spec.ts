import { Test, TestingModule } from '@nestjs/testing';
import { EventHandlerService } from '../event-handler.service';
import { RealtimeService } from '../realtime.service';
import { RealtimeEventPayload } from '../types/event-handler.types';

describe('EventHandlerService', () => {
  let service: EventHandlerService;
  let realtimeService: RealtimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventHandlerService,
        {
          provide: RealtimeService,
          useValue: {
            broadcastExerciseUpdate: jest.fn(),
            broadcastCompetitionUpdate: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<EventHandlerService>(EventHandlerService);
    realtimeService = module.get<RealtimeService>(RealtimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle valid exercise update event', async () => {
    const event: RealtimeEventPayload = {
      type: 'EXERCISE_UPDATE',
      data: {
        sessionId: '123',
        status: 'active',
        currentDuration: 300,
        calories: 150
      },
      timestamp: Date.now()
    };

    const result = await service.handleEvent(event);
    expect(result.success).toBe(true);
    expect(realtimeService.broadcastExerciseUpdate).toHaveBeenCalledWith(
      '123',
      expect.objectContaining({
        status: 'active',
        currentDuration: 300,
        calories: 150
      })
    );
  });

  it('should reject invalid exercise update data', async () => {
    const event: RealtimeEventPayload = {
      type: 'EXERCISE_UPDATE',
      data: {
        sessionId: '123',
        status: 'invalid_status',  // 잘못된 상태값
        currentDuration: 'not_a_number',  // 잘못된 타입
        calories: 150
      },
      timestamp: Date.now()
    };

    const result = await service.handleEvent(event);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error.message).toContain('Invalid exercise update data format');
  });

  it('should retry failed events', async () => {
    jest.spyOn(realtimeService, 'broadcastExerciseUpdate')
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(undefined);

    const event: RealtimeEventPayload = {
      type: 'EXERCISE_UPDATE',
      data: {
        sessionId: '123',
        status: 'active'
      },
      timestamp: Date.now()
    };

    const result = await service.handleEvent(event);
    expect(result.success).toBe(true);
    expect(realtimeService.broadcastExerciseUpdate).toHaveBeenCalledTimes(2);
  });
}); 