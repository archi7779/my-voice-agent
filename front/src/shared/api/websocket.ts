let socket: WebSocket | null = null;
let mediaRecorder: MediaRecorder | null = null;
let stream: MediaStream | null = null;


type TranscriptCallback = React.Dispatch<React.SetStateAction<string>>

export const  startVoiceRecording  = async (
  apiKey: string,
  onTranscript: TranscriptCallback): Promise<void> => {

    // 1. Запрашиваем доступ к микрофону
   try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 16000,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
      },
    });
  } catch (err) {
    // Пользователь отказал, или нет микрофона
    if (err instanceof DOMException) {
      if (err.name === 'NotAllowedError') {
        throw new Error('Доступ к микрофону запрещён. Разрешите в настройках браузера.');
      }
      if (err.name === 'NotFoundError') {
        throw new Error('Микрофон не найден. Подключите устройство.');
      }
    }
    throw new Error('Не удалось получить доступ к микрофону.');
  }
  // Type guard — гарантируем, что stream не null перед использованием
  if (!stream) {
    throw new Error('Поток микрофона не получен.');
  }
  const microphoneStream: MediaStream = stream;

 // 2. Открываем WebSocket соединение с Deepgram
socket = new WebSocket(
  'wss://api.deepgram.com/v1/listen?' +
  'model=nova-3&' +
  'language=ru&' +
  'interim_results=true&' +
  'smart_format=true&' +
  'punctuate=true',
  ['token', apiKey]
);

// 3. Создаём MediaRecorder и начинаем передавать аудио
  socket.onopen = () => {

  mediaRecorder = new MediaRecorder(microphoneStream, {
    mimeType: 'audio/webm;codecs=opus',
  });

  mediaRecorder.ondataavailable = (event: BlobEvent) => {
    if (event.data.size > 0 && socket?.readyState === WebSocket.OPEN) {
      socket.send(event.data);
    }
  };

  mediaRecorder.start(250);
};

socket.onmessage = (event: MessageEvent) => {
  const data = JSON.parse(event.data);
  const transcript = data.channel?.alternatives?.[0]?.transcript;
  if (transcript) {
    onTranscript((prev)=> prev + "" + transcript);
  }
};

socket.onclose = (event: CloseEvent) => {
  throw new Error(`[voice] 🔌 WebSocket закрыт. Код: ${event.code}, Причина: ${event.reason || 'не указана'}`);
};

socket.onerror = (event: Event) => {
  throw new Error(`[voice] 🔌 WebSocket закрыт.  Причина: ${event || 'не указана'}`);
};
}



export function stopVoiceRecording(): void {
  if (mediaRecorder?.state !== 'inactive') {
      mediaRecorder?.stop();
    }
  stream?.getTracks().forEach((track) => track.stop());
  if (socket?.readyState === WebSocket.OPEN) {
    socket.close(1000, 'Recording stopped by user');
  }

  mediaRecorder = null;
  stream = null;
  socket = null;
}