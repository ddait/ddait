import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get('success')
  getSuccess() {
    return {
      message: '성공적으로 처리되었습니다.'
    };
  }

  @Get('error')
  getError() {
    throw new HttpException('테스트 에러가 발생했습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
} 