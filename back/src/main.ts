import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || 3000;
  app.enableCors({
    origin: process.env.VITE_APP_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
