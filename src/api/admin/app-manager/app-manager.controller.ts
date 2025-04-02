import { Controller, Get, Query } from '@nestjs/common';
import { AppManagerService } from './app-manager.service';

@Controller('app/app-manager')
export class AppManagerController {
  constructor(private readonly appManagerService: AppManagerService) {}

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
    return this.appManagerService.findAll(params);
  }
}
