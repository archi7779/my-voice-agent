import { Module } from '@nestjs/common';
import { UseChatController } from './useChat.controller';
import { UseChatService } from './useChat.service';

@Module({
  controllers: [UseChatController],
  providers: [UseChatService],
})
export class UseChatModule {}
