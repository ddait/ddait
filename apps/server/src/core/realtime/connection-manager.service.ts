import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable()
export class ConnectionManagerService implements OnModuleInit {
  private readonly logger = new Logger(ConnectionManagerService.name);
  private channels: Map<string, RealtimeChannel> = new Map();
  private reconnectAttempts: Map<string, number> = new Map();
  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private readonly RECONNECT_DELAY = 1000; // 1초

  constructor(
    private readonly configService: ConfigService,
    private readonly supabase: SupabaseClient
  ) {}

  async onModuleInit() {
    this.logger.log('Initializing Connection Manager');
  }

  async createChannel(channelName: string, config: ChannelConfig): Promise<RealtimeChannel> {
    try {
      if (this.channels.has(channelName)) {
        return this.channels.get(channelName);
      }

      const channel = this.supabase.channel(channelName);
      
      // 채널 상태 모니터링
      channel.on('system', { event: '*' }, (status) => {
        this.handleChannelStatus(channelName, status);
      });

      // 에러 핸들링
      channel.on('system', { event: 'error' }, (error) => {
        this.handleChannelError(channelName, error);
      });

      // PostgreSQL 변경사항 구독 설정
      if (config.table) {
        channel.on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: config.table
        }, (payload) => {
          this.handleDatabaseChange(channelName, payload);
        });
      }

      // 채널 구독
      await channel.subscribe((status) => {
        this.logger.debug(`Channel ${channelName} subscription status: ${status}`);
      });

      this.channels.set(channelName, channel);
      this.reconnectAttempts.set(channelName, 0);

      return channel;
    } catch (error) {
      this.logger.error(`Failed to create channel ${channelName}:`, error);
      throw error;
    }
  }

  async removeChannel(channelName: string): Promise<void> {
    const channel = this.channels.get(channelName);
    if (channel) {
      await channel.unsubscribe();
      this.channels.delete(channelName);
      this.reconnectAttempts.delete(channelName);
    }
  }

  private async handleChannelStatus(channelName: string, status: any) {
    this.logger.debug(`Channel ${channelName} status:`, status);
    
    if (status.event === 'disconnected') {
      await this.handleDisconnection(channelName);
    }
  }

  private async handleChannelError(channelName: string, error: any) {
    this.logger.error(`Channel ${channelName} error:`, error);
    
    const attempts = this.reconnectAttempts.get(channelName) || 0;
    if (attempts < this.MAX_RECONNECT_ATTEMPTS) {
      await this.reconnectChannel(channelName);
    } else {
      this.logger.error(`Max reconnection attempts reached for channel ${channelName}`);
      // 에러 보고 또는 알림 시스템 연동
    }
  }

  private async handleDisconnection(channelName: string) {
    const attempts = this.reconnectAttempts.get(channelName) || 0;
    if (attempts < this.MAX_RECONNECT_ATTEMPTS) {
      await this.reconnectChannel(channelName);
    }
  }

  private async reconnectChannel(channelName: string) {
    const attempts = this.reconnectAttempts.get(channelName) || 0;
    this.reconnectAttempts.set(channelName, attempts + 1);

    this.logger.debug(`Attempting to reconnect channel ${channelName}. Attempt ${attempts + 1}`);

    try {
      await new Promise(resolve => setTimeout(resolve, this.RECONNECT_DELAY));
      const channel = this.channels.get(channelName);
      if (channel) {
        await channel.subscribe();
        this.reconnectAttempts.set(channelName, 0);
        this.logger.debug(`Successfully reconnected channel ${channelName}`);
      }
    } catch (error) {
      this.logger.error(`Failed to reconnect channel ${channelName}:`, error);
    }
  }

  private handleDatabaseChange(channelName: string, payload: any) {
    this.logger.debug(`Database change in channel ${channelName}:`, payload);
    // 데이터베이스 변경사항 처리 로직
  }

  getChannel(channelName: string): RealtimeChannel | undefined {
    return this.channels.get(channelName);
  }

  getActiveChannels(): string[] {
    return Array.from(this.channels.keys());
  }

  async closeAllChannels(): Promise<void> {
    for (const channelName of this.channels.keys()) {
      await this.removeChannel(channelName);
    }
  }
}

interface ChannelConfig {
  table?: string;
  events?: string[];
  retryAttempts?: number;
  retryDelay?: number;
} 