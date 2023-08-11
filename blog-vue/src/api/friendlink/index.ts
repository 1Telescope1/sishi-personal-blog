import { request } from "@/utils/request";
import { Link, LinkDetail } from "./type";

// 添加或编辑友链
export const reqAddFriend = (data:Link) =>request<boolean>(`/friendlink`, "POST" ,data );

// 获取友链
export const reqFriendList=()=>request<LinkDetail[]>(`/friendlink/status`)