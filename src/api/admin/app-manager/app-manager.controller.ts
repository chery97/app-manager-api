import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
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

  @Get(':sno')
  async findOne(@Param('sno') sno: number) {
    return await this.appManagerService.findOne(sno);
  }

  @Post()
  create(@Req() req: ICustomUserRequest, @Body() createAppDto: CreateAppDto) {
    createAppDto.userNo = req?.userNo;
    return this.appManagerService.create(createAppDto);
  }
}
