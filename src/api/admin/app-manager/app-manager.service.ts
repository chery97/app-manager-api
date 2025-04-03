import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Apps } from './entities/apps.entity';
import { Design } from '../design/entities/design.entity';
import { AppUserDto } from './dto/app-user.dto';
import { CreateAppDto } from './dto/create-app.dto';
import { CreateDesignDto } from '../design/dto/create-design.dto';
import { UpdateTabDesignDto } from '../design/dto/update-tab-design.dto';
import { Users } from '../users/entities/users.entity';
import { TabDesign } from '../design/entities/tabDesign.entity';
import { UpdateAppDto } from './dto/update-app.dto';

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
    userNo?: number;
  }) {
    try {
      const pageSize = params.pageSize ? parseInt(params.pageSize) : 10;
      const page = params?.page ? parseInt(params.page) : 1;
      const searchType = params.searchType ?? '';
      const keyword = params.keyword ?? '';
      const sno = params.userNo ?? 0;

      const user = await this.entityManager.findOne(Users, {
        where: { sno },
      });

      const queryBuilder = this.entityManager
        .getRepository(Apps)
        .createQueryBuilder('app')
        .leftJoin('app.user', 'user');

      if (user.userType === 'partner') {
        queryBuilder.andWhere(`app.userNo = :userNo`, { userNo: sno });
      }

      if (searchType === 'id') {
        queryBuilder.andWhere('user.id LIKE :keyword', {
          keyword: `%${keyword}%`,
        });
      } else if (searchType === 'userName') {
        queryBuilder.andWhere('user.userName LIKE :keyword', {
          keyword: `%${keyword}%`,
        });
      } else if (searchType === 'appName') {
        queryBuilder.andWhere('app.appName LIKE :keyword', {
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
    } catch (error) {
      console.error('findAll 에서 오류 발생:', error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  async findOne(sno: number) {
    const res = await this.entityManager.findOne(Apps, {
      where: { sno },
      relations: ['user'],
    });
    const formatDate = (date: Date) =>
      date ? date.toISOString().replace('T', ' ').slice(0, 16) : null;

    const result = {
      sno: res.sno,
      appName: res.appName,
      appUrl: res.appUrl,
      appDesc: res.appDesc,
      createdAt: formatDate(res.createdAt),
      updateDate: formatDate(res.updatedAt),
      userId: res.user.id,
      userName: res.user.userName,
    };
    return result;
  }

  create(createAppDto: CreateAppDto) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        try {
          const app = await transactionalEntityManager.save(Apps, createAppDto);

          const createDesignDto: CreateDesignDto = {
            userNo: app.userNo,
            appId: app.sno,
            mobileImgUrl: null,
            tabletImgUrl: null,
            duration: null,
          };
          const design = await transactionalEntityManager.save(
            Design,
            createDesignDto,
          );

          const updateTabDesignDto: UpdateTabDesignDto = {
            userNo: app.userNo,
            appId: app.sno,
            tabData: null,
          };
          const addTabDesign = await transactionalEntityManager.save(
            TabDesign,
            updateTabDesignDto,
          );

          return { app, design, addTabDesign };
        } catch (error) {
          if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new Error('User not found: Invalid userNo');
          }
          throw error;
        }
      },
    );
  }

  update(updateAppDto: UpdateAppDto) {
    const { sno, userNo, appName, appUrl, appDesc } = updateAppDto;
    return this.entityManager.update(
      Apps,
      {
        sno: sno,
        userNo: userNo,
      },
      {
        appName: appName,
        appUrl: appUrl,
        appDesc: appDesc,
      },
    );
  }
}
