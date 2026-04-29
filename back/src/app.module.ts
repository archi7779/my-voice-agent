import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './common/redis/redis.module';
import { UseRedisModule } from './modules/useRedis/useRedis.module';
import { UseChatModule } from './modules/useChat/useChat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    UseRedisModule,
    UseChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
