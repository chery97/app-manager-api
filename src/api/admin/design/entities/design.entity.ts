import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('gs_appDesign')
export class Design {
  @PrimaryGeneratedColumn('increment')
  @IsNumber()
  sno: number;

  @Column()
  @IsNumber()
  userNo: number;

  @Column()
  @IsString()
  mobileImgUrl: string;

  @Column()
  @IsString()
  tabletImgUrl: string;

  @Column()
  @IsString()
  duration: number;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @IsOptional()
  @UpdateDateColumn()
  updatedAt: Date | null;
}
