import { IsOptional, IsString } from 'class-validator';

export class PushSendDto {
  @IsString()
  appName: string; // 앱이름

  @IsString()
  osType: string; // os 타겟

  @IsOptional()
  @IsString()
  topic?: string; // 타겟 그룹

  @IsOptional()
  @IsString()
  token?: string; // 디바이스 토큰

  @IsString()
  title: string; // 타이틀

  @IsString()
  message: string; // 메시지
}
