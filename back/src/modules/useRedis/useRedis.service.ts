import { Injectable } from '@nestjs/common';
import { RedisService } from '../../common/redis/redis.service';

@Injectable()
export class UseRedisService {
  constructor(private readonly redisService: RedisService) {}

  async ping(): Promise<string> {
    const result = await this.redisService.getClient().ping();
    return `Redis ответил: ${result}`;
  }
}
