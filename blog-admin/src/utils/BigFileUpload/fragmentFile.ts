import { reqAddOrUpdateFile, reqGetFile } from '@/api/file'
import type { ChunkInfo } from './type'
import Worker from './work.ts?worker'
import { uploadChunk, mergeFile, vertifyFile } from '@/api/minio'


const THREAD_COUNT = navigator.hardwareConcurrency || 4 //表示可用的硬件线程数，如果浏览器不支持 navigator.hardwareConcurrency 属性，将默认值设为 4
export function fragmentFile(
  file: File,
  CHUNK_SIZE: number = 1024 * 1024 * 10, //分片大小默认为5MB
): Promise<ChunkInfo[]> {
  return new Promise(async (resolve) => {
    const result: any = [] //存储分片后的数据
    let neededChunkList: any[] = []; //需要上传的分片序列 number[]
    let finishCount = 0 //记录已经完成处理的线程数。
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE) //计算了文件需要分成的总分片数量
    const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT) //计算了每个线程需要处理的分片数量
    console.log(`文件大小${file.size} 总线程${THREAD_COUNT} 总分片数${chunkCount} 每个线程需要处理的分片数${workerChunkCount}`);
    const { lastModified, name, size } = file
    const fileHash = `${lastModified}-${name}-${size}`
    const dotIndex = name.lastIndexOf('.');
    let extname = ''
    if (dotIndex !== -1) {
      extname = name.slice(dotIndex + 1);
    }
    const res = await vertifyFile({ fileHash, totalCount: chunkCount, extname })
    neededChunkList = res.data


    // 创建了多个 Worker 线程，并在每个线程中处理对应的分片数据
    for (let i = 0; i < THREAD_COUNT; i++) {
      const worker = new Worker()
      const startIndex = i * workerChunkCount //从第几片开始分
      let endIndex = startIndex + workerChunkCount //从第几片结束
      if (endIndex > chunkCount) {
        endIndex = chunkCount
      }
      worker.postMessage({ file, i, CHUNK_SIZE, startIndex, endIndex }) //发送了分片处理的相关信息，包括文件、分片索引范围等

      worker.onmessage = async ({ data }) => {
        for (let i = startIndex; i < endIndex; i++) {
          const element = data[i - startIndex]
          if (!neededChunkList.includes(element.index + 1)) {
            result[i] = element
            continue
          }
          const formData = new FormData();
          // 创建一个 Blob 对象，作为 FormData 的值
          formData.append('chunk', new Blob([element.chunk]));
          formData.append('index', element.index + 1);
          formData.append('fileHash', fileHash);
          await uploadChunk(formData)
          result[i] = element
        }

        worker.terminate() //停止work进程
        finishCount++
        if (finishCount === THREAD_COUNT) {
          const data = { fileHash, extname }
          const res = await mergeFile(data)
          console.log(res, 123);

          resolve(result)
        }

      }
    }
  })
}
