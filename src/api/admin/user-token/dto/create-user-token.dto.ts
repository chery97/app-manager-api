import { IsInt, IsString } from 'class-validator';

export class CreateUserTokenDto {
  @IsInt()
  userNo: number;

  @IsString()
  deviceInfo: string;

  @IsString()
  ip: string;

  @IsString()
  uuid: string;

  @IsString()
  refreshToken: string;
}
