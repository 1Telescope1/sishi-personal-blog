import {request} from "@/utils/request.ts";
import {Chat} from "@/api/chat/type.ts";

// 获取全部聊天
export const reqAllChat=()=>request<Chat>(`/chat`,'GET')

// 发送聊天
export const reqSendChat=(data:{content:string,userId?:number})=>request<any>(`/chat`,'POST',data)