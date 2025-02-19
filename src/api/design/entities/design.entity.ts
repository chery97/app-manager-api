import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('gs_appDesign')
export class Design {
  @PrimaryGeneratedColumn()
  @IsNumber()
  sno: number;

  @Column()
  @IsNumber()
  userNo: number;

  @Column()
  @IsString()
  imgUrl: string;

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
