import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getFirebaseApp } from '../../common/config/fcm/firebase.config';

@Injectable()
export class PushService {
  async sendPush(appName: string, token: string, title: string, body: string) {
    const firebaseApp = getFirebaseApp(appName);
    const message = {
      notification: { title, body },
      token,
    };

    try {
      const response = await firebaseApp.messaging().send(message);
      console.log('성공', response);
      return response;
    } catch (error) {
      console.log('실패', error);
      throw new HttpException('발송실패', HttpStatus.BAD_REQUEST);
    }
  }
}
