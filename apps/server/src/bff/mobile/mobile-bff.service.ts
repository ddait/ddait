import { Injectable } from '@nestjs/common';

@Injectable()
export class MobileBffService {
  constructor() {}

  async getHealth() {
    return {
      status: 'ok',
      timestamp: Date.now(),
    };
  }
} 