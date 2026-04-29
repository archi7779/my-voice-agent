import { Module } from '@nestjs/common';
import { UseRedisController } from './useRedis.controller';
import { UseRedisService } from './useRedis.service';

@Module({
  controllers: [UseRedisController],
  providers: [UseRedisService],
})
export class UseRedisModule {}
