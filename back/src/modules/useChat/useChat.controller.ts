import { Controller, Get } from '@nestjs/common';
import { UseChatService } from './useChat.service';

@Controller('chat')
export class UseChatController {
  constructor(private readonly useChatService: UseChatService) {}

  @Get()
  getHello(): string {
    return this.useChatService.getHello();
  }
}
