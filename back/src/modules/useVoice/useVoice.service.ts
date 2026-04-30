import { Injectable } from '@nestjs/common';


@Injectable()
export class UseVoiceService {
    //Сейчас отдаем просто апиКлюч - в будущем, его надо уметь защитить. 
  getSPTApiKey(): string {
    return process.env.DEEPGRAM_API_KEY || '';
  }
}
