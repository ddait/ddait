import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ConnectionManagerService } from '../connection-manager.service';
import { SupabaseClient } from '@supabase/supabase-js';

describe('ConnectionManagerService', () => {
  let service: ConnectionManagerService;
  let mockSupabase: Partial<SupabaseClient>;

  beforeEach(async () => {
    // Mock Supabase client
    mockSupabase = {
      channel: jest.fn().mockReturnValue({
        on: jest.fn().mockReturnThis(),
        subscribe: jest.fn().mockResolvedValue(undefined),
        unsubscribe: jest.fn().mockResolvedValue(undefined)
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConnectionManagerService,
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
          provide: SupabaseClient,
          useValue: mockSupabase
        }
      ]
    }).compile();

    service = module.get<ConnectionManagerService>(ConnectionManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createChannel', () => {
    it('should create and return a new channel', async () => {
      const channelName = 'test-channel';
      const config = { table: 'test_table' };

      const channel = await service.createChannel(channelName, config);

      expect(channel).toBeDefined();
      expect(mockSupabase.channel).toHaveBeenCalledWith(channelName);
    });

    it('should return existing channel if already exists', async () => {
      const channelName = 'test-channel';
      const config = { table: 'test_table' };

      const channel1 = await service.createChannel(channelName, config);
      const channel2 = await service.createChannel(channelName, config);

      expect(channel1).toBe(channel2);
      expect(mockSupabase.channel).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeChannel', () => {
    it('should remove an existing channel', async () => {
      const channelName = 'test-channel';
      const config = { table: 'test_table' };

      const channel = await service.createChannel(channelName, config);
      await service.removeChannel(channelName);

      expect(service.getChannel(channelName)).toBeUndefined();
    });
  });

  describe('getActiveChannels', () => {
    it('should return list of active channels', async () => {
      await service.createChannel('channel1', { table: 'table1' });
      await service.createChannel('channel2', { table: 'table2' });

      const activeChannels = service.getActiveChannels();
      expect(activeChannels).toHaveLength(2);
      expect(activeChannels).toContain('channel1');
      expect(activeChannels).toContain('channel2');
    });
  });

  describe('closeAllChannels', () => {
    it('should close all active channels', async () => {
      await service.createChannel('channel1', { table: 'table1' });
      await service.createChannel('channel2', { table: 'table2' });

      await service.closeAllChannels();

      expect(service.getActiveChannels()).toHaveLength(0);
    });
  });
}); 