import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Design } from './entities/design.entity';
import { Apps } from './entities/apps.entity';
import { Users } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Design, Apps, Users])],
  controllers: [DesignController],
  providers: [DesignService],
})
export class DesignModule {}
