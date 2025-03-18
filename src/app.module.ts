import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { PushModule } from './api/push/push.module';
import { UserInfoModule } from './api/user-info/user-info.module';
import { DesignModule } from './api/design/design.module';
import { UploadModule } from './api/common/upload/upload.module';
import { UserMiddleware } from './common/middleware/user.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './api/common/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`, // 환경에 맞는 .env 파일 로드
      isGlobal: true, // env 전역에서 사용 가능하게 설정
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_DEFAULT_HOST'),
        port: configService.get<number>('DB_DEFAULT_PORT'),
        username: configService.get<string>('DB_DEFAULT_USER'),
        password: configService.get<string>('DB_DEFAULT_PASSWORD'),
        database: configService.get<string>('DB_DEFAULT_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
        charset: 'utf8mb4_unicode_ci',
      }),
    }),
    UsersModule,
    PushModule,
    UserInfoModule,
    DesignModule,
    UploadModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret',
      signOptions: { expiresIn: process.env.ACCESS_EXPIRE_IN },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private jwtService: JwtService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: '/app/*', method: RequestMethod.ALL });
  }
}
