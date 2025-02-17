import { Body, Controller, Post } from '@nestjs/common';
import { PushService } from './push.service';

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post()
  async sendPush(
    @Body()
    body: {
      appName: string;
      token: string;
      title: string;
      message: string;
    },
  ) {
    return this.pushService.sendPush(
      body.appName,
      body.token,
      body.title,
      body.message,
    );
  }
}
