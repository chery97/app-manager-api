import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UsersCreateDto } from './dto/users-create.dto';
import { UsersSearchDto } from './dto/users-search.dto';
import { UserInfo } from '../user-info/entities/user-info.entity';
import { ILike } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findAll(params: {
    pageSize?: string;
    page?: string;
    searchType?: string;
    keyword?: string;
  }) {
    const pageSize = params.pageSize ? parseInt(params.pageSize) : 10;
    const page = params?.page ? parseInt(params.page) : 1;
    const searchType = params.searchType ?? '';
    const keyword = params.keyword ?? '';

    const [items, totalCnt] = await this.entityManager.findAndCount(Users, {
      take: pageSize,
      skip: (page - 1) * pageSize,
      where:
        searchType === 'id'
          ? { id: ILike(`%${keyword}%`) }
          : searchType === 'userName'
            ? { userName: ILike(`%${keyword}%`) }
            : {},
    });
    let totalPage = totalCnt / pageSize;

    if (!Number.isInteger(totalPage)) {
      totalPage = Math.ceil(totalPage);
    }

    return {
      items,
      totalCnt,
      totalPage,
    };
  }

  async findOne(sno: number) {
    const result = await this.entityManager
      .createQueryBuilder(Users, 'users')
      .leftJoinAndMapOne(
        'users.userInfo',
        UserInfo,
        'userInfo',
        'users.sno = userInfo.userNo',
      )
      .select(['users.sno', 'users.id', 'users.userType', 'userInfo'])
      .where('users.sno = :sno', { sno })
      .getOne();
    if (result) {
      const { userInfo, ...userData } = result;
      return {
        ...userData,
        ...userInfo,
      };
      return null;
    }
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
      userInfo.userNo = user?.sno;
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

    const payload = {
      id: dto.id,
      email: memberData.userEmail,
      userNo: memberData.sno,
    };

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
    };
  }

  async logout(userNo: number) {
    const { affected } = await this.entityManager.update(
      Users,
      {
        sno: userNo,
      },
      { refreshToken: '' },
    );
    return affected === 1;
  }
}
