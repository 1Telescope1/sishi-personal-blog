import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { File } from '../file/entities/file.entity';
import * as crypto from 'crypto';
import {FileService} from "../file/file.service";

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;

  private readonly Client={
    endPoint: '192.168.2.105',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
  }

  constructor(
    private readonly fileService: FileService,
  ) {
    this.minioClient = new Minio.Client(this.Client);
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
