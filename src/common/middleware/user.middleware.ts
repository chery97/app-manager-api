import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ICustomUserRequest } from '../interface/ICustomUserRequest';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: ICustomUserRequest, res: Response, next: NextFunction) {
    try {
      const token = req.headers['authorization'];
      if (typeof token !== 'undefined') {
        const bearerToken = token.toString().replace('Bearer', '').trim();
        const payload = this.jwtService.verify(bearerToken, {
          secret: process.env.ACCESS_SECRET_KEY,
        });

        req.id = payload.id;
        req.userNo = payload.userNo;

        next();
      } else {
        throw new HttpException('인증정보를 확인하세요.', HttpStatus.FORBIDDEN);
        // res.sendStatus(403);
      }
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
