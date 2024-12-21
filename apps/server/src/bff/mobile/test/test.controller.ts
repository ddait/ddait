import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller('mobile/test')
export class TestController {
  @Get()
  getTest() {
    return { data: 'test' };
  }

  @Get('error')
  getError() {
    throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Get('cached')
  getCached() {
    return { data: 'original' };
  }
} 