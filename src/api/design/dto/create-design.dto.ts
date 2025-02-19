import { IsInt, IsString } from 'class-validator';

export class CreateDesignDto {
  @IsInt()
  sno: number;

  @IsInt()
  userNo: number;

  @IsString()
  imgUrl: string;

  @IsString()
  duration: number;
}
