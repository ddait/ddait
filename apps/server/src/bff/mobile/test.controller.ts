import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get('success')
  getSuccess() {
    return {
      message: 'Success response',
      data: 'test'
    };
  }

  @Get('error')
  getError() {
    throw new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
} 