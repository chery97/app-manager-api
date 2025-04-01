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

  async findOne(userNo: number) {
    return await this.entityManager.find(Design, {
      where: { userNo },
    });
  }

  update(updateDesignDto: UpdateDesignDto) {
    const { userNo, mobileImgUrl, tabletImgUrl, duration } = updateDesignDto;
    return this.entityManager.update(
      Design,
      {
        userNo: userNo,
      },
      {
        mobileImgUrl: mobileImgUrl,
        tabletImgUrl: tabletImgUrl,
        duration: duration,
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} design`;
  }
}
