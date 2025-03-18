import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersSearchDto } from './dto/users-search.dto';

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
