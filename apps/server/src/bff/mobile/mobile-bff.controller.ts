import { Controller, Get } from '@nestjs/common';
import { MobileBffService } from './mobile-bff.service';

@Controller('mobile')
export class MobileBffController {
  constructor(private readonly mobileBffService: MobileBffService) {}

  @Get('health')
  async getHealth() {
    return {
      status: 'ok',
      timestamp: Date.now(),
    };
  }
} 