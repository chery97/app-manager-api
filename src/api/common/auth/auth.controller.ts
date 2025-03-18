import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('common/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('refresh')
  async refreshToken(@Req() req: any) {
    const refreshToken = req.body?.refreshToken;
    return await this.authService.refreshToken(refreshToken);
  }

  @Post('token-check')
  async verify(@Req() req: any) {
    try {
      const bearerToken = req.headers['authorization']
        .toString()
        .replace('Bearer', '')
        .trim();
      return this.jwtService.verify(bearerToken + 'a', {
        secret: process.env.ACCESS_SECRET_KEY,
      });
    } catch (error) {
      const message = {
        'invalid token': '유효하지 않은 토큰입니다.',
        'jwt expired': '토큰값이 만료되었습니다.',
        'jwt malformed': '잘못된 형식의 토큰입니다.',
      };
      throw new HttpException(message[error.message], HttpStatus.UNAUTHORIZED);
    }
  }
}
