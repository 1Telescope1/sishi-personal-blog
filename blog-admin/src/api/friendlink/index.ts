import { request } from "@/utils/request";
import {Link, LinkDetail, LinkPage, LinkParams} from "./type";

// 添加或编辑友链
export const reqAddFriend = (data:Link) =>request<boolean>(`/friendlink`, "POST" ,data );

// 获取友链
export const reqFriendList=()=>request<LinkDetail[]>(`/friendlink`)

// 删除友链
export const reqDelFriendLink=(id:number)=>request<any>(`/friendlink/${id}`,'DELETE')

export const reqFriendLinkByPage=(params:LinkParams)=>request<LinkPage>(`/friendlink/page`,'GET',params)