import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersSearchDto } from './dto/users-search.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() query: { pageSize?: string; page?: string }) {
    const pageSize = query?.pageSize ? parseInt(query.pageSize) : 10;
    const page = query?.page ? parseInt(query.page) : 1;
    return this.usersService.findAll(pageSize, page);
  }

  @Post('join')
  async join(@Body() user: any) {
    return this.usersService.join(user);
  }

  @Post('login')
  async login(@Body() dto: UsersSearchDto) {
    return this.usersService.login(dto);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.usersService.refreshToken(refreshToken);
  }
}
