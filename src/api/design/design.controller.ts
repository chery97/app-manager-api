import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { DesignService } from './design.service';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { ICustomUserRequest } from '../../common/interface/ICustomUserRequest';

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

  @Put()
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
}
