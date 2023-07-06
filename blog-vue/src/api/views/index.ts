import { request } from "@/utils/request";

// 获取浏览量
export const reqGetViews=()=>request<number>(`/views/views`)

// 增加浏览量
export const reqAddViews=(data:any)=>request<boolean>(`views`,'POST',data)