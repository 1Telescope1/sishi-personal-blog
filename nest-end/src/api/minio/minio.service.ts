import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { File } from '../file/entities/file.entity';
import * as crypto from 'crypto';
import {FileService} from "../file/file.service";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService {
  constructor(
    private readonly fileService: FileService,
    private configService: ConfigService
  ) {
    this.minioClient = new Minio.Client(this.Client);
  }

  private readonly minioClient: Minio.Client;
  private readonly Client={
    endPoint: this.configService.get('MINIO_HOST'),
    port: this.configService.get('MINIO_PORT') | 9000,
    useSSL: false,
    accessKey: this.configService.get('MINIO_USERNAME'),
    secretKey: this.configService.get('MINIO_PASSWORD')
  }



  async uploadFile(bucketName: string, file: any, data: Buffer) {
    const lastDotIndex = file.originalname.lastIndexOf('.');
    const splitArray = [
      file.originalname.substring(0, lastDotIndex),
      file.originalname.substring(lastDotIndex + 1),
    ];
    const hash  = crypto
      .createHash('md5')
      .update(file.buffer)
      .digest('hex');
    const originalName=`${hash}.${splitArray[1]}`
    const fileEntity = new File();
    fileEntity.size = file.size / 1000;
    fileEntity.name = splitArray[0];
    fileEntity.type = splitArray[1];
    fileEntity.url = this.getUrl(bucketName,originalName);
    await this.minioClient.putObject(bucketName, originalName, data);
    const flag=await this.fileService.isExist(fileEntity.url)
    if(flag.length<1)  await this.fileService.create(fileEntity)
    return fileEntity
  }

  getUrl(bucketName: string,originalName:string) {
    return `http://${this.Client.endPoint}:${this.Client.port}/${bucketName}/${originalName}`
  }
}
