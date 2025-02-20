import { IsNumber, IsString } from 'class-validator';

export class CreateDesignDto {
  @IsString()
  imgUrl: string;

  @IsNumber()
  duration: number;
}
