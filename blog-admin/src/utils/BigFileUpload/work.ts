import { createChunk } from './createChunk'

onmessage = async (e) => {
  const { file, CHUNK_SIZE, startIndex, endIndex } = e.data
  const promises: Promise<any>[] = []

  for (let i = startIndex; i < endIndex; i++) {
    const data = createChunk(file, i, CHUNK_SIZE)
    promises.push(data)
  }

  const results = await Promise.all(promises)
  postMessage(results)
}
