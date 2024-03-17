import type { ChunkInfo } from './type'
import Worker from './work.ts?worker'

const THREAD_COUNT = navigator.hardwareConcurrency || 4 //表示可用的硬件线程数，如果浏览器不支持 navigator.hardwareConcurrency 属性，将默认值设为 4
export function fragmentFile(
  file: File,
  CHUNK_SIZE: number = 1024, //分片大小默认为5MB
): Promise<ChunkInfo[]> {
  return new Promise((resolve) => {

    const result: any = [] //存储分片后的数据
    let finishCount = 0 //记录已经完成处理的线程数。
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE) //计算了文件需要分成的总分片数量
    const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT) //计算了每个线程需要处理的分片数量
    // 创建了多个 Worker 线程，并在每个线程中处理对应的分片数据
    for (let i = 0; i < THREAD_COUNT; i++) {

      const worker = new Worker()
      const startIndex = i * workerChunkCount //从第几片开始分
      let endIndex = startIndex + workerChunkCount //从第几片结束
      if (endIndex > chunkCount) {
        endIndex = chunkCount
      }
      worker.postMessage({ file, i, CHUNK_SIZE, startIndex, endIndex }) //发送了分片处理的相关信息，包括文件、分片索引范围等

      worker.onmessage = ({ data }) => {
        for (let i = startIndex; i < endIndex; i++)
          result[i] = data[i - startIndex]

        worker.terminate() //停止work进程
        finishCount++
        if (finishCount === THREAD_COUNT)
          resolve(result)
      }
    }
  })
}
