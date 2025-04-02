import { Injectable } from '@nestjs/common';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UserInfo } from './entities/user-info.entity';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  create(createUserInfoDto: CreateUserInfoDto) {
    return 'This action adds a new userInfo';
  }

  findAll() {
    return `This action returns all userInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userInfo`;
  }

  async update(userNo: number, dto: UpdateUserInfoDto) {
    return this.entityManager.transaction(async () => {
      let result = await this.entityManager.update(
        UserInfo,
        { userNo },
        { name: dto.name, email: dto.email, tel: dto.tel },
      );
      if (result.affected === 0) {
        throw new Error('No user-info found to update.');
      }
      result = await this.entityManager.update(
        Users,
        { sno: userNo },
        { userName: dto.name, userEmail: dto.email, userTel: dto.tel },
      );
      if (result.affected === 0) {
        throw new Error('No users found to update.');
      }
      return result;
    });
  }

  remove(id: number) {
    return `This action removes a #${id} userInfo`;
  }
}
