import { request } from "@/utils/request";
import {Message, MessagePage, MessageParams} from "./type";

// 获取最新留言
export const reqFiveMessage=()=>request<Message[]>(`/message/recent`)

// 获取全部留言
export const reqAllMessage=()=>request<Message[]>(`/message`)

// 新增留言
export const reqAddMessage=(data:Message)=>request<Message>(`/message`,'POST',data)

// 分页获取留言
export const reqMessagePage=(params:MessageParams)=>request<MessagePage>(`/message/page`,'GET',params)

//逻辑删除留言
export const reqDelMessage=(id:number)=>request<any>(`/message/${id}`,'DELETE')