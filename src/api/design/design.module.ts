import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Design } from './entities/design.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Design])],
  controllers: [DesignController],
  providers: [DesignService],
})
export class DesignModule {}
