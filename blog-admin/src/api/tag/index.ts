import { request } from "@/utils/request";
import { Tag } from '@/model/index.ts';

// 获取所有标签
export const reqTags=()=>request<Tag[]>('/tag','GET')

// 获取标签总数
export const reqTagTotal=()=>request<number>(`/tag/length`);