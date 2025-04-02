import { Module } from '@nestjs/common';
import { UserTokenService } from './user-token.service';
import { UserTokenController } from './user-token.controller';

@Module({
  controllers: [UserTokenController],
  providers: [UserTokenService],
  exports: [UserTokenService],
})
export class UserTokenModule {}
