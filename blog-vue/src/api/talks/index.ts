import { request } from "@/utils/request";
import { CommentParams, Talk, TalkCommentList } from "./type";

// 获取说说总数
export const reqTalkTotal=()=>request<number>(`/talks/length`);

// 获取所有说说
export const reqAllTalk=()=>request<Talk[]>(`/talks`)

// 根据说说id获取说说
export const reqTalkById=(id:number)=>request<Talk>(`/talks/${id}`)

// 根据说说获取评论
export const reqTalkComment=(id:string)=>request<TalkCommentList[]>(`/talkscomment/tree/${id}`)

// 发送评论
export const reqAddComment=(data:CommentParams)=>request<null>(`/talkscomment`,'POST',data)

// 删除评论
export const reqDelComment=(id:number)=>request<boolean>(`/talkscomment/${id}`,'DELETE')