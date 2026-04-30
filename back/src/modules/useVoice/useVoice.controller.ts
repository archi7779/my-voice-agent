import { Controller, Get } from '@nestjs/common';
import { UseVoiceService } from './useVoice.service';

@Controller('voice')
export class UseVoiceController {
  constructor(private readonly useVoiceService: UseVoiceService) {}

  @Get("sptAuth")
  getSPTApiKey(): { key: string } {
    return { key: this.useVoiceService.getSPTApiKey() };
  }
}
