import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Patch,
} from '@nestjs/common';
import { DesignService } from './design.service';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { ICustomUserRequest } from '../../common/interface/ICustomUserRequest';
import { UpdateTabDesignDto } from './dto/update-tab-design.dto';

@Controller('app/design')
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Post()
  create(
    @Req() req: ICustomUserRequest,
    @Body() createDesignDto: CreateDesignDto,
  ) {
    createDesignDto.userNo = req?.userNo;
    return this.designService.create(createDesignDto);
  }

  @Get()
  async findOne(@Req() req: ICustomUserRequest) {
    const userNo = req.userNo;
    return await this.designService.findOne(userNo);
  }

  @Patch()
  update(
    @Req() req: ICustomUserRequest,
    @Body() updateDesignDto: UpdateDesignDto,
  ) {
    updateDesignDto.userNo = req?.userNo;
    return this.designService.update(updateDesignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.designService.remove(+id);
  }

  @Get('/footer/:appId')
  async findFooter(
    @Req() req: ICustomUserRequest,
    @Param('appId') appId: number,
  ) {
    const userNo = req.userNo;
    return await this.designService.findTabList(userNo, appId);
  }

  @Patch('/footer/:appId')
  updateTabList(
    @Req() req: ICustomUserRequest,
    @Param('appId') appId: number,
    @Body() updateTabDesignDto: UpdateTabDesignDto,
  ) {
    updateTabDesignDto.userNo = req.userNo;
    updateTabDesignDto.appId = appId;
    return this.designService.updateTabList(updateTabDesignDto);
  }
}
