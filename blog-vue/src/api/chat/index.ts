import {request} from "@/utils/request.ts";
import {Chat} from "@/api/chat/type.ts";

// 获取全部聊天
export const reqAllChat=()=>request<Chat[]>(`/chat`,'GET')

// 获取最近10条聊天
export const reqTenChats=()=>request<Chat[]>(`chat/ten`,'GET')

// 发送聊天
export const reqSendChat=(data:{content:string,userId?:number})=>request<any>(`/chat`,'POST',data)