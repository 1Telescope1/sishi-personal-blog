import { request } from "@/utils/request";
import { Message } from "./type";

// 获取最新留言
export const reqFiveMessage=()=>request<Message[]>(`/message/five`)