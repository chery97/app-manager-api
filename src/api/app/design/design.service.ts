import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { TabDesign } from '../../admin/design/entities/tabDesign.entity';
import { Design } from '../../admin/design/entities/design.entity';

@Injectable()
export class DesignService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async getIntro(userNo: number, appId: number) {
    console.log(userNo, appId);
    return await this.entityManager.findOne(Design, {
      where: { userNo, appId },
    });
  }

  async getTabList(userNo: number, appId: number) {
    const res = await this.entityManager.findOne(TabDesign, {
      where: { userNo, appId },
    });
    return JSON.parse(res?.tabData);
  }
}
