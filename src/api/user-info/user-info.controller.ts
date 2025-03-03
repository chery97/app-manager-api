import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  create(@Body() createUserInfoDto: CreateUserInfoDto) {
    return this.userInfoService.create(createUserInfoDto);
  }

  @Get()
  findAll() {
    return this.userInfoService.findAll();
  }

  @Get(':sno')
  findOne(@Param('sno') sno: string) {
    return this.userInfoService.findOne(+sno);
  }

  @Patch(':sno')
  async update(@Param('sno') userNo: string, @Body() dto: UpdateUserInfoDto) {
    return await this.userInfoService.update(+userNo, dto);
  }
}
