import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import { Result } from "../../common/result";

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) { }

  @Post('upload/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: any) {
    console.log(file, 123);

    const data = await this.minioService.uploadFile('avatar', file, file.buffer);

    return new Result(data);
  }

  @Post('upload/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    const data = await this.minioService.uploadFile('file', file, file.buffer);
    return new Result(data);
  }

  @Post('upload/cover')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCover(@UploadedFile() file: any) {
    const data = await this.minioService.uploadFile('cover', file, file.buffer);
    return new Result(data);
  }


}
