import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from "./entities/file.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import * as fs from 'fs-extra';
import { join } from 'path';

@Injectable()
export class FileService {
  constructor(@InjectRepository(File)
  private readonly fileRepository: Repository<File>) {
  }

  async create(file: File) {
    const data = await this.fileRepository.save(file)
    return data;
  }

  findAll() {
    const data = this.fileRepository.find()
    return data;
  }

  async remove(id: number) {
    const data = this.fileRepository.delete(id)
    return data;
  }

  async isExist(url: string) {
    const data = await this.fileRepository.find({ where: { url } })
    return data
  }

  async uploadChunk(chunk: any, body: any) {
    const { fileHash, index } = body
    // 构建了文件夹路径 dirPath
    const dirPath = join(__dirname, 'uploadedFiles', 'chunkFile', fileHash);
    const chunkPath = join(dirPath, `chunk-${index}`);
    //检查文件夹是否存在
    const hasDir = fs.existsSync(dirPath);

    if (hasDir) {
      //检查分块是否存在
      const hasChunk = fs.existsSync(join(dirPath, `chunk-${index}`));

      if (hasChunk) return;
      //添加分块
      fs.writeFile(chunkPath, chunk.buffer, (error) => {
        if (error) {
          console.error(error);
        }
      });
    } else {
      //创建文件夹,并添加当前分片  文件名为fileHash
      new Promise((resolve, reject) => {
        // 使用 fs.mkdir() 函数创建文件夹。
        fs.mkdir(
          dirPath,
          {
            recursive: true,
          },
          (error) => {
            if (error) {
              reject(false);
            } else {
              resolve(true);
            }
          },
        );
      }).then((res) => {
        console.log(res, 'file');

        if (res) {
          // 添加当前分片
          fs.writeFile(chunkPath, chunk.buffer, (error) => {
            if (error) {
              console.error(error);
            }
          });
        }
      });
    }
  }

  async vertifyFile(fileHash: string, totalCount: number, extname: string) {
    const dirPath = join(__dirname, 'uploadedFiles', 'chunkFile', fileHash);
    const filePath = dirPath + '.' + extname;
    console.log(filePath);

    let res = Array(totalCount)
      .fill(0)
      .map((_, index) => index + 1);

    try {
      //读取文件状态
      fs.statSync(filePath);
      //读取成功，即秒传
      return { neededFileList: [], message: '上传成功' };
    } catch (fileError) {
      try {
        fs.statSync(dirPath);
        const files = await fs.readdir(dirPath);
        if (files.length < totalCount) {
          //计算待上传序列
          res = res.filter((fileIndex) => {
            return !files.includes(`chunk-${fileIndex}`);
          });
          return { neededFileList: res };
        } else {
          //未进行合并,去合并
          await this.mergeFile(fileHash, extname);
          return { neededFileList: [], message: '上传成功' };
        }
      } catch (dirError) {
        //读取文件夹失败，返回全序列
        return { neededFileList: res };
      }
    }
  }

  async mergeFile(fileHash: string, extname: string) {
    const dirPath = join(__dirname, 'uploadedFiles', 'chunkFile', fileHash);
    const fullPath = join(
      __dirname,
      'uploadedFiles', 'chunkFile',
      fileHash + '.' + extname,
    );

    try {
      // 检查文件是否已存在
      await fs.promises.access(fullPath);
      return '文件已存在';
    } catch (error) {
      // 文件不存在，继续执行
    }

    // 创建写入流
    const writeStream = fs.createWriteStream(fullPath);

    // 读取文件夹，将文件夹中的所有分块进行合并
    try {
      const files = await fs.promises.readdir(dirPath);

      // 对文件进行排序
      files.sort((a, b) => {
        const indexA = parseInt(a.split('-').pop());
        const indexB = parseInt(b.split('-').pop());
        return indexA - indexB;
      });

      // 按顺序写入/合并
      for (let index = 0; index < files.length; index++) {
        const filename = files[index];
        const curFilePath = join(dirPath, filename);
        const readStream = fs.createReadStream(curFilePath);

        // 判断是否是最后一块
        const isLastChunk = index === files.length - 1;

        // 使用 await 确保异步操作完成
        await new Promise((resolve, reject) => {
          readStream.pipe(writeStream, { end: isLastChunk });
          readStream.on('end', resolve);
          readStream.on('error', reject);
        });
      }
    } catch (error) {
      console.error('Error reading directory:', error);
    }

    // 删除保存分块的文件夹
    try {
      await this.removeDir(dirPath);
    } catch (error) {
      console.error('Error removing directory:', error);
    }

    console.log('Files merged successfully');

    return '合并完成';
  }

  async removeDir(dirPath) {
    try {
      const files = await fs.promises.readdir(dirPath);
      await Promise.all(
        files.map((file) => fs.promises.unlink(join(dirPath, file))),
      );
      await fs.promises.rmdir(dirPath);
      console.log('Folder deleted successfully');
    } catch (error) {
      console.error('Error deleting folder:', error);
      throw error;
    }
  }
}
