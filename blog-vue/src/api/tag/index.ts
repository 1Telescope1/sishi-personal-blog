import { request } from "@/utils/request";
import { Tag } from './type';

// 获取所有标签
export const reqTags=()=>request<Tag[]>('/tag','GET')

// 获取标签总数
export const reqTagTotal=()=>request<number>(`/tag/length`);