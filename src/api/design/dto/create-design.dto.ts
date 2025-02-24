import { IsNumber, IsString } from 'class-validator';

export class CreateDesignDto {
  @IsString()
  mobileImgUrl: string;

  @IsString()
  tabletImgUrl: string;

  @IsNumber()
  duration: number;
}
