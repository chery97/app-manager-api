import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:8162',
    credentials: true,
  });

  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
