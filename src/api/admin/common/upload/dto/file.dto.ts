import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FileDto {
  @IsString()
  @IsOptional()
  filePath: string;

  @IsString()
  @IsOptional()
  originFileName: string;

  @IsNumber()
  @IsOptional()
  size: number;

  @IsString()
  @IsOptional()
  contentType: string;
}
