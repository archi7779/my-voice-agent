import { Module } from '@nestjs/common';
import { UseVoiceController } from './useVoice.controller';
import { UseVoiceService } from './useVoice.service';

@Module({
  controllers: [UseVoiceController],
  providers: [UseVoiceService],
})
export class UseVoiceModule {}
