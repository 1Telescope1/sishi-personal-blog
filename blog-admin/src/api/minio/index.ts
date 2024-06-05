import { request } from "@/utils/request";

export const uploadImageAction = import.meta.env.VITE_BASE_API + "/minio/upload/avatar"
export const uploadFileAction = import.meta.env.VITE_BASE_API + "minio/upload/file"

// 上传文件
export const uploadFile = (data: any) => request<any>('/minio/upload/file', 'POST', data)

// 上传切片
export const uploadChunk = (data: any) => request<boolean>('/minio/upload/chunk', 'POST', data)

// 合并切片
export const mergeFile = (data: any) => request<any>('/minio/mergeFile', 'POST', data)

// 校验文件需要续传
export const vertifyFile = (data: any) => request<any[]>('/minio/vertifyFile', 'POST', data)

