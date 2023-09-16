import { request } from "@/utils/request";
import {ViewsPage, ViewsParams} from "@/api/views/type.ts";

// 获取浏览量
export const reqGetViews=()=>request<number>(`/views/views`)

// 增加浏览量
export const reqAddViews=(data:any)=>request<boolean>(`/views`,'POST',data)

// 分页获取浏览量
export const reqViewsPage=(params:ViewsParams)=>request<ViewsPage>(`/views/page`,'GET',params)

// 删除浏览记录
export const reqDelView=(id:number)=>request<any>(`/views/${id}`,'DELETE')

// 批量删除浏览记录
export const reqDelViewsByIds=(ids:number[])=>request<any>(`/views/ids`,'POST',ids)