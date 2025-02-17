import { IsInt, IsString } from 'class-validator';

export class CreateUserInfoDto {
  @IsInt()
  son: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  tel: string;
}
