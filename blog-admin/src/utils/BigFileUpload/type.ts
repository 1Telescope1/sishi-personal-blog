export interface Options {
  perCallback?: (fileInfo: FileInfo & { isDone: boolean }) => void
  lastCallback?: (filesInfo: FileInfo) => void
  splitCallback?: (fileInfo: FileInfo) => void
  chunkSize?: number
}

export interface FileInfo {
  name: string
  type: string
  size: number
  lastModified: number
  chunks: ChunkInfo[]
}

export interface ChunkInfo {
  start?: number
  end?: number
  index: number
  hash?: string
  chunk: any
}

export type ChunkDetail = ChunkInfo & {
  isDone: boolean
  remaning: number
  type: string
  size: number
  lastModified: number
}

export interface Options1 {
  chunkSize?: number
  callback?: (chunk: ChunkDetail) => void
}
