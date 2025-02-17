import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UsersCreateDto } from './dto/users-create.dto';
import { UsersSearchDto } from './dto/users-search.dto';
import { UserInfo } from '../user-info/entities/user-info.entity';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findAll(pageSize: number, page: number) {
    const [data, totalCnt] = await this.entityManager.findAndCount(Users, {
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return {
      data,
      totalCnt,
    };
  }

  async join(dto: UsersCreateDto) {
    return this.entityManager.transaction(async (manager) => {
      const isExist = await manager.findOneBy(Users, {
        id: dto.id,
      });

      if (isExist) {
        throw new HttpException(
          '아이디가 이미 존재합니다.',
          HttpStatus.BAD_REQUEST,
        );
      }
      const saltRounds = 10; // salt 값 설정
      const salt = await bcrypt.genSalt(saltRounds);
      dto.password = await bcrypt.hash(dto.password, salt);
      const user = await manager.save(Users, dto);

      const userInfo = new UserInfo();
      userInfo.sno = user?.sno;
      userInfo.name = user?.userName;
      userInfo.email = user?.userEmail;
      userInfo.tel = user?.userTel;

      await manager.save(UserInfo, userInfo);

      return user;
    });
  }

  async login(dto: UsersSearchDto) {
    const memberData = await this.entityManager.findOneBy(Users, {
      id: dto.id,
    });

    if (!memberData) {
      throw new HttpException(
        '로그인 정보가 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isValidPassword = await bcrypt.compare(
      dto.password,
      memberData.password,
    );
    if (!isValidPassword) {
      throw new HttpException(
        '아이디 또는 비밀번호가 일치하지 않습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { id: dto.id, password: dto.password };

    // [Jay] accessToken, refreshToken 생성
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_SECRET_KEY'),
      expiresIn: this.configService.get<string>('ACCESS_EXPIRE_IN'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
      expiresIn: this.configService.get<string>('REFRESH_EXPIRE_IN'),
    });

    // [Jay] 로그인시마다 refreshToken DB에 업데이트
    await this.entityManager.update(
      Users,
      {
        sno: memberData.sno,
      },
      { refreshToken },
    );

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
