import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersSearchDto } from './dto/users-search.dto';
import { ICustomUserRequest } from '../../../common/interface/ICustomUserRequest';
import { v4 as uuid4 } from 'uuid';

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
  async login(@Body() dto: UsersSearchDto, @Res() res: any, @Req() req: any) {
    const uuid = uuid4();
    const { access_token, refresh_token } = await this.usersService.login(
      dto,
      req,
      uuid,
    );
    if (access_token && refresh_token) {
      // @todo 운영시 옵션 값들 수정할 것 - aaron
      res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        secure: false, // -> true
        sameSite: 'lax', // -> or 'none'
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie('uuid', uuid, {
        httpOnly: true,
        secure: false, // -> true
        sameSite: 'lax', // -> or 'none'
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json(access_token);
    }
  }
}

@Controller('app/users')
export class LogoutController {
  constructor(private readonly authService: UsersService) {}
  @Post('logout')
  async logout(
    @Req() req: ICustomUserRequest & { cookies: any },
    @Res({ passthrough: true }) res: any,
  ) {
    const isLogout = await this.authService.logout(
      req.userNo,
      req.cookies.uuid,
    );
    if (isLogout) {
      res.clearCookie('refreshToken', {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
      });
      res.clearCookie('uuid', {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
      });
    }
    return isLogout;
  }
}
