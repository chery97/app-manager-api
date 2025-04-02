import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('gs_userToken')
export class UserToken {
  @PrimaryGeneratedColumn()
  @IsNumber()
  sno: number;

  @Column()
  @IsNumber()
  userNo: number;

  @Column()
  @IsString()
  deviceInfo: string;

  @Column()
  @IsString()
  ip: string;

  @Column()
  @IsString()
  uuid: string;

  @Column()
  @IsString()
  refreshToken: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @IsOptional()
  @UpdateDateColumn()
  updatedAt: Date | null;
}
