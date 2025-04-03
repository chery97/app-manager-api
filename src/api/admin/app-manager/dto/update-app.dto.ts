import { IsNumber, IsString } from 'class-validator';

export class UpdateAppDto {
  @IsNumber()
  sno: number;

  @IsNumber()
  userNo: number;

  @IsString()
  appName: string;

  @IsString()
  appUrl: string;

  @IsString()
  appDesc: string;
}
