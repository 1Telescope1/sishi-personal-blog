import SparkMD5 from 'spark-md5'
import type { ChunkInfo } from './type'

const hashMap = new Map()
export function createChunk(
  file: File,
  index: number,
  chunkSize: number,
): Promise<ChunkInfo> {
  return new Promise((resolve, reject) => {
    const start = index * chunkSize;
    const end = Math.min(start + chunkSize, file.size); // 修复可能超出文件大小的问题
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const fileBuffer = e.target?.result as ArrayBuffer;
      const chunk = fileBuffer.slice(0, end - start); // 提取切片内容
      resolve({
        index,
        chunk
      });
    };
    fileReader.readAsArrayBuffer(file.slice(start, end));
  });
}
