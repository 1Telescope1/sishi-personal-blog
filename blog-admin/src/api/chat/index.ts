
import {ChatPage, ChatParams} from "@/api/chat/type.ts";
import {request} from "@/utils/request.ts";

// 分页获取聊天
export const reqChatPage=(params:ChatParams)=>request<ChatPage>(`/chat/page`,'GET',params)

// 删除聊天
export const reqDelChat=(id:number)=>request<any>(`/chat/${id}`,'DELETE')

// 批量删除聊天
export const reqDelChats=(ids:number[])=>request<any>(`/chat/ids`,'POST',ids)