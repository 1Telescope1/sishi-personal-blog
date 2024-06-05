
import { Result } from "@/model";
import { request } from "@/utils/request";
import { File } from "./type";

//新增或更新文件
export const reqAddOrUpdateFile = (data: any) => request<any>(`/file`, 'POST', data)

// 获取所有图片
export const reqGetFile = () => request<File[]>('/file', 'GET')

// 删除文件
export const reqDeleteFile = (id: number) => request<any>(`/file/${id}`, 'DELETE')