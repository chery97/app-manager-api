import { IsInt, IsString } from 'class-validator';

export class CreateUserInfoDto {
  @IsInt()
  sno: number;

  @IsInt()
  userNo: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  tel: string;
}
