import { BadRequestException, Injectable } from '@nestjs/common';
import { FileDto } from './dto/file.dto';

@Injectable()
export class UploadService {
  uploadFile(file: Express.MulterS3.File) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    return {
      filePath: file.location,
      originFileName: file.originalname,
      size: file.size,
      contentType: file.contentType,
    } as FileDto;
  }
}
