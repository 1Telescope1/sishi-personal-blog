import { request } from "@/utils/request";
import { Tag } from '@/model/index.ts';

// 获取所有标签
export const reqTags=()=>request<Tag[]>('/tag','GET')

// 获取标签总数
export const reqTagTotal=()=>request<number>(`/tag/length`);

// 新增或更新标签
export const reqAddOrUpdateTag=(data:Tag)=>request<Tag>(`/tag`,'POST',data)

// 删除标签
export const reqDelTag=(id:number)=>request<any>(`/tag/${id}`,'DELETE')