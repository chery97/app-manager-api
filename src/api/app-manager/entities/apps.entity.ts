import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Users } from '../../users/entities/users.entity';

@Entity('gs_appManager')
export class Apps {
  @PrimaryGeneratedColumn('increment')
  @IsNumber()
  sno: number;

  @Column()
  @IsNumber()
  userNo: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'userNo', referencedColumnName: 'sno' })
  user: Users;

  @Column()
  @IsString()
  appName: string;

  @Column()
  @IsString()
  appUrl: string;

  @Column()
  @IsString()
  appDesc: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @IsOptional()
  @UpdateDateColumn()
  updatedAt: Date | null;
}
