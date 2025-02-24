import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ICustomUserRequest } from '../interface/ICustomUserRequest';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: ICustomUserRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (typeof token !== 'undefined') {
      const bearerToken = token.toString().replace('Bearer', '').trim();
      const payload = this.jwtService.verify(bearerToken, {
        secret: process.env.ACCESS_SECRET_KEY,
      });

      req.id = payload.id;
      req.userNo = payload.userNo;

      next();
    }
  }
}
