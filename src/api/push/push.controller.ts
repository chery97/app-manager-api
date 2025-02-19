import { Body, Controller, Post } from '@nestjs/common';
import { PushService } from './push.service';
import { PushSendDto } from './dto/push-send.dto';

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post()
  async sendPush(
    @Body()
    dto: PushSendDto,
  ) {
    return this.pushService.sendPush(dto);
  }
}
