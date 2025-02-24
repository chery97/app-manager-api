import { Injectable } from '@nestjs/common';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UserInfo } from './entities/user-info.entity';

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
    try {
      const result = await this.entityManager.update(
        UserInfo,
        { userNo },
        { name: dto.name, email: dto.email, tel: dto.tel },
      );
      if (result.affected === 0) {
        throw new Error('No user found to update.');
      }
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} userInfo`;
  }
}
