import { request } from "@/utils/request";

// 获取说说总数
export const reqTalkTotal=()=>request<number>(`/talks/length`);