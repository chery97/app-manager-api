import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_SECRET_KEY'),
      expiresIn: this.configService.get<string>('ACCESS_EXPIRE_IN'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
      expiresIn: this.configService.get<string>('REFRESH_EXPIRE_IN'),
    });

    // @todo: Refresh Token을 DB에 저장
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
      });

      const newAccessToken = this.jwtService.sign(
        { username: decoded.username, sub: decoded.sub },
        {
          secret: this.configService.get<string>('ACCESS_SECRET_KEY'),
          expiresIn: this.configService.get<string>('ACCESS_EXPIRE_IN'),
        },
      );

      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException(
        'Refresh token expired. Please log in again.',
      );
    }
  }
}
