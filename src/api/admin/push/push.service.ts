import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getFirebaseApp } from '../../../common/config/fcm/firebase.config';
import { Message } from 'firebase-admin/messaging';
import { PushSendDto } from './dto/push-send.dto';

@Injectable()
export class PushService {
  async sendPush(dto: PushSendDto) {
    const firebaseApp = getFirebaseApp(dto.appName);

    const message = this.createMessage(dto);

    try {
      const response = Array.isArray(message)
        ? await Promise.all(
            message.map((msg) => firebaseApp.messaging().send(msg)),
          )
        : await firebaseApp.messaging().send(message);

      return {
        statusCode: HttpStatus.OK,
        message: '푸시 알림이 성공적으로 전송되었습니다.',
        response,
      };
    } catch (error) {
      console.error('푸시 발송 실패:', error);
      throw new HttpException('푸시 발송 실패', HttpStatus.BAD_REQUEST);
    }
  }

  private createMessage(dto: PushSendDto): Message | Message[] {
    const baseMessage: Partial<Message> = {
      // [Jay] 수신동의 메시지 합쳐서 보냄
      data: {
        title: dto.title,
        message: `${dto.message}\n${dto.pushDisagree || ''}`,
        url: dto.deepLink || '', // 딥링크 추가
        image:
          'https://esther2023.cdn-nhncommerce.com/data/editor/promotion/250219/96a3be3cf272e017046d1b2674a52bd3_155201.jpg', // 이미지 추가
      },
    };

    const androidMessage: Message = {
      ...baseMessage,
      android: {
        priority: 'high',
        directBootOk: true,
      },
    } as Message;

    const iosMessage: Message = {
      ...baseMessage,
      notification: {
        title: dto.title,
        body: `${dto.message}\n${dto.pushDisagree || ''}`,
        image:
          'https://esther2023.cdn-nhncommerce.com/data/editor/promotion/250219/96a3be3cf272e017046d1b2674a52bd3_155201.jpg', // 이미지 추가
      } as any,
      apns: {
        payload: {
          aps: {
            sound: 'default',
            'content-available': 1,
            'mutable-content': 1,
            threadId: 'com.geekstudio.appprototype',
          },
        },
      },
    } as Message;

    switch (dto.osType) {
      case 'ANDROID':
        return { ...androidMessage, topic: `ALL_ANDROID` };
      case 'IOS':
        return { ...iosMessage, topic: `ALL_IOS` };
      case 'ALL':
        return [
          { ...androidMessage, topic: `ALL_ANDROID` },
          { ...iosMessage, topic: `ALL_IOS` },
        ];
      default:
        throw new HttpException(
          '잘못된 OS 타입 값입니다.',
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
