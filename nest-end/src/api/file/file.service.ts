import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import {File} from "./entities/file.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class FileService {
  constructor(@InjectRepository(File)
              private readonly fileRepository: Repository<File>) {
  }

  async create(file: File) {
    const data=await this.fileRepository.save(file)
    return data;
  }

  async isExist(url:string) {
    const data=await this.fileRepository.find({where:{url}})
    return data
  }
}
