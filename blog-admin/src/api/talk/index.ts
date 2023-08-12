import { request } from "@/utils/request";
import { Talk } from "./type";


// 获取所有公布说说
export const reqAllTalkByStatus=()=>request<Talk[]>(`/talk`)

// 根据说说id获取说说
export const reqTalkById=(id:number)=>request<Talk>(`/talk/${id}`)

// 获取全部说说
export const reqAllTalk=()=>request<Talk[]>(`/talk/all`)

// 删除说说
export const reqDelTalk=(id:number)=>request<any>(`/talk/${id}`,'DELETE')

// 更新说说
export const reqUpdateTalk=(data:{id:number,content:string})=>request<any>(`/talk`,'PATCH',data)

export const reqAddOrUpdTalk=(data:{content:string})=>request<any>(`/talk`,'POST',data)