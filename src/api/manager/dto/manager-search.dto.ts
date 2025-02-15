import { IsString } from 'class-validator';

export class ManagerSearchDto {
  @IsString()
  id: string;

  @IsString()
  password: string;
}
