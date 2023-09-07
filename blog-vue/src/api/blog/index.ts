import { request } from "@/utils/request";

export const getBlogDetail=()=>request<number[]>(`/blog`)

export const reqAddViews=(data:any={})=>request<any>(`/views`,'POST',data)