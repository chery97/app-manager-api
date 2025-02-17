import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { PushController } from './push.controller';

@Module({
  controllers: [PushController],
  providers: [PushService],
})
export class PushModule {}
