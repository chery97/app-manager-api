import { Controller, Post, Body } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerSearchDto } from './dto/manager-search.dto';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('join')
  async join(@Body() user: any) {
    return this.managerService.join(user);
  }

  @Post('login')
  async login(@Body() dto: ManagerSearchDto) {
    return this.managerService.login(dto);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.managerService.refreshToken(refreshToken);
  }
}
