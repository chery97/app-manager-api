import { IsNumber, IsString } from 'class-validator';

export class UpdateDesignDto {
  @IsNumber()
  userNo?: number;

  @IsString()
  mobileImgUrl?: string;

  @IsString()
  tabletImgUrl?: string;

  @IsNumber()
  duration?: number;
}
