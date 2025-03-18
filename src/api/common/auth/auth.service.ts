import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from '../../users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
      });

      return this.jwtService.sign(
        { username: decoded.username, sub: decoded.sub },
        {
          secret: this.configService.get<string>('ACCESS_SECRET_KEY'),
          expiresIn: this.configService.get<string>('ACCESS_EXPIRE_IN'),
        },
      );
    } catch (error) {
      throw new UnauthorizedException(
        '유효하지 않은 RefreshToken입니다. 다시 로그인 해주세요',
      );
    }
  }

  async getMyRefreshToken(refreshToken: string) {
    try {
      const user = await this.entityManager.findOne(Users, {
        where: {
          refreshToken: refreshToken,
        },
      });

      if (!user) {
        throw new UnauthorizedException('유효하지 않은 RefreshToken입니다.');
      }

      return await this.refreshToken(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('RefreshToken이 유효하지 않습니다.');
    }
  }
}
