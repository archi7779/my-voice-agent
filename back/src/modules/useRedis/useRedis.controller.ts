import { Controller, Get } from '@nestjs/common';
import { UseRedisService } from './useRedis.service';

@Controller('redis')
export class UseRedisController {
  constructor(private readonly useRedisService: UseRedisService) {}

  @Get()
  async check(): Promise<string> {
    return this.useRedisService.ping();
  }
}
