import { Controller, Get, InternalServerErrorException } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get('success')
  getSuccess() {
    return { message: '성공!' };
  }

  @Get('error')
  getError() {
    throw new InternalServerErrorException('테스트 에러가 발생했습니다.');
  }
} 