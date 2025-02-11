import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`, // 환경에 맞는 .env 파일 로드
      isGlobal: true, // env 전역에서 사용 가능하게 설정
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
