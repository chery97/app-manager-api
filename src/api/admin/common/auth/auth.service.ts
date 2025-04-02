import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from '../../users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UserToken } from '../../user-token/entities/user-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  async refreshToken(uuid: string) {
    try {
      const user = await this.entityManager.findOne(UserToken, {
        where: {
          uuid: uuid,
        },
      });

      if (!user) {
        throw new UnauthorizedException('유효하지 않은 RefreshToken입니다.');
      }

      const decoded = this.jwtService.verify(user.refreshToken, {
        secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
      });

      return this.jwtService.sign(
        { id: decoded.id, email: decoded.email, userNo: decoded.userNo },
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
}
