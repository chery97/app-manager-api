import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import sbgolfAccount from './json/firebase-service-account-sbgolf-test.json';
import appPrototypeAccount from './json/firebase-service-account-app-prototype.json';
import { HttpException, HttpStatus } from '@nestjs/common';

// [Jay] 고객사별 Firebase 프로젝트 등록
const firebaseApps = {
  sbgolfTest: admin.initializeApp(
    {
      credential: admin.credential.cert(sbgolfAccount as ServiceAccount),
    },
    'sbgolfTest',
  ),
  appPrototype: admin.initializeApp(
    {
      credential: admin.credential.cert(appPrototypeAccount as ServiceAccount),
    },
    'app-prototype',
  ),
};

// 특정 앱의 Firebase 인스턴스 반환
export const getFirebaseApp = (appName: string): admin.app.App => {
  if (!firebaseApps[appName]) {
    throw new HttpException('해당하는 앱이 없습니다.', HttpStatus.BAD_REQUEST);
  }
  return firebaseApps[appName];
};
