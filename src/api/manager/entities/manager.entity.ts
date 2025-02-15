import { MANAGER_TYPE } from '../../../common/enum/enum';
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

@Entity('gs_manager')
export class Manager {
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
  @IsEnum(MANAGER_TYPE)
  managerType: MANAGER_TYPE = MANAGER_TYPE.PARTNER;

  @Column()
  @IsNumber()
  partnerSno: number;

  @Column()
  @IsString()
  managerName: string;

  @Column()
  @IsString()
  managerTel: string;

  @Column()
  @IsString()
  managerEmail: string;

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
