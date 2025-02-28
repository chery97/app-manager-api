import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  MEMBER_TARGET,
  OS_Type,
  PUSH_PURPOSE,
  SCHEDULE_TYPE,
} from '../../../common/enum/enum';

export class PushSendDto {
  @IsString()
  appName: string; // 앱이름

  @IsEnum(PUSH_PURPOSE, {
    message: '목적은 광고성, 정보성 중 하나여야 합니다.',
  })
  purpose: PUSH_PURPOSE; // 발송 목적

  @IsEnum(MEMBER_TARGET, {
    message: '수신 대상은 전체, 회원, 그룹 중 하나여야 합니다.',
  })
  memberTarget: MEMBER_TARGET; // 수신 대상

  @IsEnum(OS_Type, {
    message: 'osType은 ALL, ANDROID, IOS 중 하나여야 합니다.',
  })
  osType: OS_Type; // os 타겟

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

  @IsString()
  pushDisagree: string; // 수신 동의 철회 방법

  @IsString()
  deepLink: string; // 딥링크

  @IsEnum(SCHEDULE_TYPE, {
    message: '발송 유형은 즉시, 예약, 반복 발송 중 하나여야 합니다.',
  })
  scheduleType: SCHEDULE_TYPE; // 딥링크
}
