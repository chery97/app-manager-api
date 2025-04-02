import { IsNumber, IsString } from 'class-validator';

export class CreateDesignDto {
  @IsNumber()
  userNo: number;

  @IsNumber()
  appId: number;

  @IsString()
  mobileImgUrl: string;

  @IsString()
  tabletImgUrl: string;

  @IsNumber()
  duration: number;
}
