import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Design } from './entities/design.entity';
import { TabDesign } from './entities/tabDesign.entity';
import { UpdateTabDesignDto } from './dto/update-tab-design.dto';

@Injectable()
export class DesignService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  create(createDesignDto: CreateDesignDto) {
    return this.entityManager.save(Design, createDesignDto);
  }

  async findOne(userNo: number, appId: number) {
    return await this.entityManager.find(Design, {
      where: { userNo, appId },
    });
  }

  update(updateDesignDto: UpdateDesignDto) {
    const { userNo, appId, mobileImgUrl, tabletImgUrl, duration } =
      updateDesignDto;
    return this.entityManager.update(
      Design,
      {
        userNo: userNo,
        appId: appId,
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

  async findTabList(userNo: number, appId: number) {
    const res = await this.entityManager.findOne(TabDesign, {
      where: { userNo, appId },
    });
    return JSON.parse(res?.tabData);
  }

  async updateTabList(updateTabDesignDto: UpdateTabDesignDto) {
    const { userNo, appId, tabData } = updateTabDesignDto;
    const res = await this.entityManager.update(
      TabDesign,
      {
        userNo,
        appId,
      },
      {
        tabData: JSON.stringify(tabData),
      },
    );

    if (res.affected && res.affected > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: '수정이 완료되었습니다.',
      };
    }
  }
}
