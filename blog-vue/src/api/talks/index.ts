import { request } from "@/utils/request";
import { Talk } from "./type";

// 获取说说总数
export const reqTalkTotal=()=>request<number>(`/talks/length`);

// 获取所有说说
export const reqAllTalk=()=>request<Talk[]>(`/talks`)