import { IsNumber, IsString } from 'class-validator';

export class AppUserDto {
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

  // gs_user 테이블 (gs_appManager.userNo = gs_user.sno)
  @IsString()
  id: string;

  @IsString()
  userName: string;
}
