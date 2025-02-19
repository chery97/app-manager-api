import { Injectable } from '@nestjs/common';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Design } from './entities/design.entity';

@Injectable()
export class DesignService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  async create(dto: CreateDesignDto) {
    await this.entityManager.save(Design, dto);
  }

  findAll() {
    return `This action returns all design`;
  }

  findOne(id: number) {
    return `This action returns a #${id} design`;
  }

  update(id: number, updateDesignDto: UpdateDesignDto) {
    return `This action updates a #${id} design`;
  }

  remove(id: number) {
    return `This action removes a #${id} design`;
  }
}
