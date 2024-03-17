import { request } from "@/utils/request";

export const uploadImageAction = import.meta.env.VITE_BASE_API + "/minio/upload/avatar"
export const uploadFileAction = import.meta.env.VITE_BASE_API + "/minio/upload/file"

export const uploadFile = (data: any) => request<any>('/minio/upload/avatar', 'POST', data)