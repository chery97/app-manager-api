import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getFirebaseApp } from '../../common/config/fcm/firebase.config';
import { Message, TokenMessage, TopicMessage } from 'firebase-admin/messaging';
import { PushSendDto } from './dto/push-send.dto';

@Injectable()
export class PushService {
  async sendPush(dto: PushSendDto) {
    const firebaseApp = getFirebaseApp(dto.appName);

    const androidMessage: Partial<Message> = {
      notification: {
        title: dto.title,
        body: dto.message,
      },
      data: {
        title: dto.title,
        message: dto.message,
      },
      android: {
        priority: 'high',
        notification: {
          channelId: 'default',
          sound: 'default',
        },
        directBootOk: true,
      },
    };

    // ✅ iOS용 메시지 (notification 포함)
    const iosMessage: Partial<Message> = {
      notification: {
        title: dto.title,
        body: dto.message,
      },
      data: {
        title: dto.title,
        message: dto.message,
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            'content-available': 1,
            threadId: 'com.geekstudio.appprototype',
          },
        },
      },
    };

    let response;

    try {
      if (dto.token) {
        // 개별 디바이스 푸시 (token 사용)
        const message: Message = {
          ...androidMessage,
          ...iosMessage,
          token: dto.token, // 특정 기기에 전송
        };
        response = await firebaseApp.messaging().send(message);
      } else if (dto.topic) {
        if (dto.topic === 'ALL_ANDROID') {
          // android 전체
          const topicMessage: Message = {
            ...androidMessage,
            topic: dto.topic, // OS별 토픽 사용
          };
          response = await firebaseApp.messaging().send(topicMessage);
        } else if (dto.topic === 'ALL_IOS') {
          // ios 전체
          const topicMessage: Message = {
            ...iosMessage,
            topic: dto.topic, // OS별 토픽 사용
          };
          response = await firebaseApp.messaging().send(topicMessage);
        } else if (dto.topic === 'ALL_OS') {
          // 모든 os
          const android: Message = {
            ...androidMessage,
            topic: 'ALL_ANDROID', // OS별 토픽 사용
          };
          const ios: Message = {
            ...iosMessage,
            topic: 'ALL_IOS', // OS별 토픽 사용
          };
          response = await Promise.all([
            firebaseApp.messaging().send(android),
            firebaseApp.messaging().send(ios),
          ]);
        }
        // 토픽 푸시 (topic 사용)
      } else {
        throw new HttpException(
          '디바이스 토큰 또는 토픽이 필요합니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

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
}
