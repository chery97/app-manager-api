import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import moment from 'moment';
import { randomDigitNumber } from 'src/common/util/gsUtill';
export const multerOptionsFactory = (): MulterOptions => {
  // s3 인스턴스를 생성합니다.
  const s3 = new S3Client({
    // endpoint: process.env.AWS_ENDPOINT,
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_API_ACCESS_KEY,
      secretAccessKey: process.env.AWS_API_SECRET_KEY,
    },
  });
  const currentDate = moment().format('YYYYMMDD');
  return {
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET,
      key(_req, file, done) {
        const ext = path.extname(file.originalname); // 파일의 확장자 추출
        const basename = path.basename(file.originalname, ext); // 파일 이름
        // 파일 이름이 중복되는 것을 방지하기 위해 파일이름_날짜.확장자 형식으로 설정합니다.
        done(null, `${currentDate}/${Date.now()}_` + randomDigitNumber());
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  };
};
