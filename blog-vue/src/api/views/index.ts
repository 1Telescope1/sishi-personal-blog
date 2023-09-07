import { request } from "@/utils/request";

// 获取浏览量
export const reqGetViews=()=>request<number>(`/views/cnt`)

// 增加浏览量
export const reqAddViews=(data:any)=>request<any>(`views`,'POST',data)