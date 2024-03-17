import { fragmentFile } from './fragmentFile'
import type { FileInfo, Options } from './type'

// 大文件分片上传函数
export function fragmentUpload(file: File, options?: Options) {
  // ...
  const { perCallback, lastCallback, chunkSize } = options || {}
  fragmentFile(file, chunkSize).then((chunks) => {
    const fileInfo = {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      chunks,
    }
    // perCallback && perCallback({ ...fileInfo, isDone: fileCount === 0 })
    lastCallback && lastCallback(fileInfo)
  })


}

// fragmentUpload('input[type="file"]', {
//   perCallback: (fileInfo) => {
//     console.log('单个文件每一次调用', fileInfo)
//   },
//   lastCallback: (files) => {
//     console.log('所有文件最后一次总和的调用', files)
//   },
// })
