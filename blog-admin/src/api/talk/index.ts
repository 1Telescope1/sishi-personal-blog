import { request } from "@/utils/request";
import { Talk } from "./type";


// 获取所有公布说说
export const reqAllTalk=()=>request<Talk[]>(`/talk`)

// 根据说说id获取说说
export const reqTalkById=(id:number)=>request<Talk>(`/talk/${id}`)

