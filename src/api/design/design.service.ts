import { Injectable } from '@nestjs/common';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Design } from './entities/design.entity';

@Injectable()
export class DesignService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  create(createDesignDto: CreateDesignDto) {
    return this.entityManager.save(Design, createDesignDto);
  }

  findAll() {
    return `This action returns all design`;
  }

  async findOne(userNo: number) {
    return await this.entityManager.find(Design, {
      where: { userNo },
    });
  }

  update(id: number, updateDesignDto: UpdateDesignDto) {
    return `This action updates a #${id} design`;
  }

  remove(id: number) {
    return `This action removes a #${id} design`;
  }
}
