import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Apps } from './entities/apps.entity';
import { AppUserDto } from './dto/app-user.dto';

@Injectable()
export class AppManagerService {
  constructor(
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

    const queryBuilder = this.entityManager
      .getRepository(Apps)
      .createQueryBuilder('app')
      .leftJoin('app.user', 'user');

    if (searchType === 'id') {
      queryBuilder.where('user.id LIKE :keyword', { keyword: `%${keyword}%` });
    } else if (searchType === 'userName') {
      queryBuilder.where('user.userName LIKE :keyword', {
        keyword: `%${keyword}%`,
      });
    } else if (searchType === 'appName') {
      queryBuilder.where('app.appName LIKE :keyword', {
        keyword: `%${keyword}%`,
      });
    }

    const [items, totalCnt] = await queryBuilder
      .select([
        'app.sno',
        'app.userNo',
        'app.appName',
        'app.appUrl',
        'app.appDesc',
        'user.id',
        'user.userName',
      ])
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .getManyAndCount();

    const result = items.map((item) => {
      const appWithUser: AppUserDto = {
        sno: item.sno,
        userNo: item.userNo,
        appName: item.appName,
        appUrl: item.appUrl,
        appDesc: item.appDesc,
        id: item.user.id,
        userName: item.user.userName,
      };
      return appWithUser;
    });

    let totalPage = totalCnt / pageSize;

    if (!Number.isInteger(totalPage)) {
      totalPage = Math.ceil(totalPage);
    }

    return {
      items: result,
      totalCnt,
      totalPage,
    };
  }
}
