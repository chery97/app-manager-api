import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { USER_TYPE } from '../../../common/enum/enum';

export class UsersCreateDto {
  @IsString()
  id: string;

  @IsString()
  password: string;

  @IsEnum(USER_TYPE)
  @IsOptional()
  managerType: USER_TYPE = USER_TYPE.PARTNER;

  @IsNumber()
  appNo: number;

  @IsString()
  userName: string;

  @IsString()
  userTel: string;

  @IsString()
  userEmail: string;
}
