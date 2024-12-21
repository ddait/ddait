import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

export class SystemConfig extends BaseEntity {
  @ApiProperty({ description: 'Configuration category' })
  category: string;

  @ApiProperty({ description: 'Configuration key' })
  key: string;

  @ApiProperty({ description: 'Configuration value' })
  value: Record<string, any>;

  @ApiProperty({ description: 'Configuration description' })
  description?: string;

  @ApiProperty({ description: 'Configuration active status' })
  is_active: boolean;
} 