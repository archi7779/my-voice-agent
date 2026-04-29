import { Injectable } from '@nestjs/common';

@Injectable()
export class UseChatService {
  getHello(): string {
    return 'hello';
  }
}
