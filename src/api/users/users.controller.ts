import { Controller, Get, Post, Body, Query, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersSearchDto } from './dto/users-search.dto';
import { ICustomUserRequest } from '../../common/interface/ICustomUserRequest';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query()
    params: {
      pageSize?: string;
      page?: string;
      searchType?: string;
      keyword?: string;
    },
  ) {
    return this.usersService.findAll(params);
  }

  @Get(':sno')
  async findOne(@Param('sno') sno: number) {
    return this.usersService.findOne(sno);
  }

  @Post('join')
  async join(@Body() user: any) {
    return this.usersService.join(user);
  }

  @Post('login')
  async login(@Body() dto: UsersSearchDto) {
    return this.usersService.login(dto);
  }
}

@Controller('app/users')
export class LogoutController {
  constructor(private readonly authService: UsersService) {}
  @Post('logout')
  async logout(@Req() req: ICustomUserRequest) {
    return await this.authService.logout(req.userNo);
  }
}
