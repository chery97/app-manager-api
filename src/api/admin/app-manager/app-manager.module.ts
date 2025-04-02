import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apps } from './entities/apps.entity';
import { Users } from '../users/entities/users.entity';
import { AppManagerController } from './app-manager.controller';
import { AppManagerService } from './app-manager.service';
import { Design } from '../design/entities/design.entity';
import { TabDesign } from '../design/entities/tabDesign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apps, Users, Design, TabDesign])],
  controllers: [AppManagerController],
  providers: [AppManagerService],
})
export class AppManagerModule {}
