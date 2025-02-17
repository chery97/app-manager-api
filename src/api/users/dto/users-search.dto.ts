import { IsString } from 'class-validator';

export class UsersSearchDto {
  @IsString()
  id: string;

  @IsString()
  password: string;
}
