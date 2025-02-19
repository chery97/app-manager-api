import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getFirebaseApp } from '../../common/config/fcm/firebase.config';
import { Message, TokenMessage, TopicMessage } from 'firebase-admin/messaging';
import { PushSendDto } from './dto/push-send.dto';

@Injectable()
export class PushService {
  async sendPush(dto: PushSendDto) {
    const firebaseApp = getFirebaseApp(dto.appName);
    const baseMessage = {
      notification: {
        title: dto.title,
        body: dto.message,
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            'content-available': 1,
            threadId: 'com.geekstudio.appprototype', // ios 알림 그룹화(고유값)
          },
        },
      },
    };

    let message: Message;

    // [Jay] 토큰값과 topic 값 여부에 따라 message 값 설정
    if (dto.token) {
      message = {
        ...baseMessage,
        token: dto.token,
      } as TokenMessage;
    } else if (dto.topic) {
      message = {
        ...baseMessage,
        topic: dto.topic,
      } as TopicMessage;
    } else {
      throw new HttpException(
        '디바이스 토큰 또는 topic이 필요합니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const response = await firebaseApp.messaging().send(message);
      return {
        statusCode: HttpStatus.OK,
        message: '푸시 알림이 성공적으로 전송되었습니다.',
        response,
      };
    } catch (error) {
      console.log('실패', error);
      throw new HttpException('발송실패', HttpStatus.BAD_REQUEST);
    }
  }
}
