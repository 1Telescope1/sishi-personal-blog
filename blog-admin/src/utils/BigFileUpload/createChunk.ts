import SparkMD5 from 'spark-md5'
import type { ChunkInfo } from './type'
import { uploadFile } from '../../api/minio';
import { reqGetFile } from '@/api/file';

const hashMap = new Map()
export function createChunk(
  file: File,
  index: number,
  chunkSize: number,
): Promise<ChunkInfo> {
  return new Promise((resolve, reject) => {
    const start = index * chunkSize;
    const end = Math.min(start + chunkSize, file.size); // 修复可能超出文件大小的问题
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    console.log('createChunk.ts', file);

    fileReader.onload = (e) => {
      const fileBuffer = e.target?.result as ArrayBuffer;
      spark.append(fileBuffer);
      const hash = spark.end();
      const chunk = fileBuffer.slice(0, end - start); // 提取切片内容
      const formData = new FormData();
      formData.append('chunk', new Blob([chunk])); // 创建一个 Blob 对象，作为 FormData 的值
      formData.append('hash', hash);
      formData.append('index', String(index));
      console.log(formData, 123);

      resolve({
        start,
        end,
        index,
        hash,
        fileBuffer
      });
      // 发送 POST 请求将切片上传到后端
      // reqGetFile().then(response => {
      //   console.log(response);

      //   resolve({ start, end, index, hash })
      //   if (response.ok) {
      //     resolve({
      //       start,
      //       end,
      //       index,
      //       hash,
      //     });
      //   } else {
      //     reject(new Error('Failed to upload chunk'));
      //   }
      // })
      //   .catch(error => {
      //     reject(error);
      //   })


    };
    fileReader.readAsArrayBuffer(file.slice(start, end));
  });
}
