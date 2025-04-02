import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AppManagerService } from './app-manager.service';
import { ICustomUserRequest } from '../../../common/interface/ICustomUserRequest';
import { CreateAppDto } from './dto/create-app.dto';

@Controller('app/app-manager')
export class AppManagerController {
  constructor(private readonly appManagerService: AppManagerService) {}

  @Get()
  async findAll(
    @Req() req: ICustomUserRequest,
    @Query()
    params: {
      pageSize?: string;
      page?: string;
      searchType?: string;
      keyword?: string;
      userNo?: number;
    },
  ) {
    params.userNo = req.userNo;
    return this.appManagerService.findAll(params);
  }

  @Post()
  create(@Req() req: ICustomUserRequest, @Body() createAppDto: CreateAppDto) {
    createAppDto.userNo = req?.userNo;
    return this.appManagerService.create(createAppDto);
  }
}
