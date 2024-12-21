import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [TestController],
})
export class TestModule {} 