import { Controller, Post, Body } from '@nestjs/common';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('login')
  async login(@Body() user: any) {
    return this.managerService.login(user);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.managerService.refreshToken(refreshToken);
  }
}
