import {
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity('gs_userInfo')
export class UserInfo {
  @PrimaryColumn()
  @IsNumber()
  sno: number;

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
