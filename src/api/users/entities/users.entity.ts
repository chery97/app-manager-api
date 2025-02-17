import { USER_TYPE } from '../../../common/enum/enum';
import {
  CreateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  Entity,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

@Entity('gs_users')
export class Users {
  @PrimaryGeneratedColumn('increment')
  @PrimaryColumn()
  @Exclude({ toClassOnly: true })
  sno: number;

  @Column()
  @IsString()
  id: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsEnum(USER_TYPE)
  userType: USER_TYPE = USER_TYPE.PARTNER;

  @Column()
  @IsNumber()
  partnerSno: number;

  @Column()
  @IsString()
  userName: string;

  @Column()
  @IsString()
  userTel: string;

  @Column()
  @IsString()
  userEmail: string;

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
