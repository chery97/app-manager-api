import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UsersCreateDto {
  @IsString()
  id: string;

  @IsString()
  password: string;

  // @IsEnum(MANAGER_TYPE)
  // @IsOptional()
  // managerType: MANAGER_TYPE = MANAGER_TYPE.PARTNER;
  //
  // @IsNumber()
  // partnerSno: number;
  //
  // @IsString()
  // managerName: string;
  //
  // @IsString()
  // managerTel: string;
  //
  // @IsString()
  // managerEmail: string;
}
