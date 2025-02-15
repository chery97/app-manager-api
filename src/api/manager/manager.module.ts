import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../auth/strategy/jwt.strategy';
import { RefreshTokenStrategy } from '../../auth/strategy/refresh.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';

@Module({
  imports: [
    ConfigModule, // 환경변수 모듈 추가
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule], // ConfigModule 주입
      inject: [ConfigService], // ConfigService 주입
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_SECRET_KEY'), // ACCESS TOKEN 시크릿키
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_EXPIRE_IN'),
        }, // Access Token 만료시간
      }),
    }),
    TypeOrmModule.forFeature([Manager]),
  ],
  controllers: [ManagerController],
  providers: [ManagerService, JwtStrategy, RefreshTokenStrategy],
})
export class ManagerModule {}
