import { Injectable } from '@nestjs/common';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UserToken } from './entities/user-token.entity';

@Injectable()
export class UserTokenService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  async create(createUserTokenDto: CreateUserTokenDto) {
    return this.entityManager.save(UserToken, createUserTokenDto);
  }

  async remove(userNo: number, uuid: string) {
    return this.entityManager.delete(UserToken, { userNo, uuid });
  }
}
