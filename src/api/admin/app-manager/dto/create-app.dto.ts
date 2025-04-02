import { IsNumber, IsString } from 'class-validator';

export class CreateAppDto {
  @IsNumber()
  userNo: number;

  @IsString()
  appName: string;

  @IsString()
  appUrl: string;

  @IsString()
  appDesc: string;
}
