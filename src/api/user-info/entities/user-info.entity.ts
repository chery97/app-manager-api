import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity('gs_userInfo')
export class UserInfo {
  @PrimaryGeneratedColumn()
  @IsNumber()
  sno: number;

  @Column()
  @IsNumber()
  userNo: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  tel: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @IsOptional()
  @UpdateDateColumn()
  updatedAt: Date | null;
}
