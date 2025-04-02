import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('gs_appTabDesign')
export class TabDesign {
  @PrimaryGeneratedColumn('increment')
  @IsNumber()
  sno: number;

  @Column()
  @IsNumber()
  userNo: number;

  @Column()
  @IsNumber()
  appId: number;

  @Column()
  @IsString()
  tabData: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @IsOptional()
  @UpdateDateColumn()
  updatedAt: Date | null;
}
