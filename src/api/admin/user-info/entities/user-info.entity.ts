import { Users } from '../../users/entities/users.entity';
import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity('gs_userInfo')
export class UserInfo {
  @PrimaryGeneratedColumn()
  @IsNumber()
  sno: number;

  @OneToOne(() => Users, (user) => user.userInfo)
  @JoinColumn({ name: 'userNo', referencedColumnName: 'sno' })
  user: Users;

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
