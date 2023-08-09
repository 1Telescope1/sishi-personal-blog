import { Controller, Get,Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import {Result} from "../../common/result";

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file:any){
    const data=await this.minioService.uploadFile('files', file, file.buffer);
    return new Result(data);
  }


}
