import { IsNumber, IsString } from 'class-validator';

export class UpdateTabDesignDto {
  @IsNumber()
  userNo: number;

  @IsNumber()
  appId: number;

  @IsString()
  tabData: string;
}
