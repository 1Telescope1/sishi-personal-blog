import { request } from "@/utils/request";
import { Message } from "./type";

// 获取最新留言
export const reqFiveMessage=()=>request<Message[]>(`/message/recent`)

// 获取全部留言
export const reqAllMessage=()=>request<Message[]>(`/message`)

// 新增留言
export const reqAddMessage=(data:Message)=>request<Message>(`/message`,'POST',data)