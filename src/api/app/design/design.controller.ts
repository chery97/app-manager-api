import { Controller, Get, Query } from '@nestjs/common';
import { DesignService } from './design.service';

@Controller('design')
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Get('/intro')
  async getIntro(
    @Query('userNo') userNo: number,
    @Query('appId') appId: number,
  ) {
    return await this.designService.getIntro(userNo, appId);
  }

  @Get('/footer')
  async getTabList(
    @Query('userNo') userNo: number,
    @Query('appId') appId: number,
  ) {
    return await this.designService.getTabList(userNo, appId);
  }
}
