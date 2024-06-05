import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import { Result } from "../../common/result";
import { RedisService } from '../redis/redis.service';
import { FileService } from '../file/file.service';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService,
    private readonly redisService: RedisService,
    private readonly fileService: FileService) { }

  @Post('upload/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: any) {
    const data = await this.minioService.uploadFile('avatar', file, file.buffer);
    return new Result(data);
  }

  @Post('upload/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    const data = await this.minioService.uploadFile('file', file, file.buffer);
    return new Result(data);
  }

  @Post('upload/chunk')
  @UseInterceptors(FileInterceptor('chunk'))
  async uploadChunk(@UploadedFile() chunk: any, @Body() body: any) {
    try {
      await this.fileService.uploadChunk(chunk, body)
      return new Result(true)
    } catch (error) {
      console.log(error);

      return new Result(false)
    }
  }

  @Post('/mergeFile')
  async mergeFile(@Body() fileInfo) {
    const { fileHash, extname } = fileInfo;
    const res = await this.fileService.mergeFile(fileHash, extname)
    return new Result(res, res);
  }

  @Post('/vertifyFile')
  async vertifyFile(@Body() fileInfo) {
    const { fileHash, totalCount, extname } = fileInfo;
    const { neededFileList, message } = await this.fileService.vertifyFile(fileHash, totalCount, extname)
    return new Result(neededFileList, message);
  }



  @Post('upload/cover')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCover(@UploadedFile() file: any) {
    const data = await this.minioService.uploadFile('cover', file, file.buffer);
    return new Result(data);
  }


}
