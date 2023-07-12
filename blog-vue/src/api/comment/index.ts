import { request } from "@/utils/request";
import { CommentList, CommentParams } from "./type";

// 根据文章id获取评论列表
export const reqCommentByArticle=(id:string)=>request<CommentList[]>(`/comment/tree/${id}`)

// 发送评论
export const reqSendComment=(data:CommentParams)=>request<null>(`/comment`,"POST",data)

// 删除评论
export const reqDelComment=(id:number)=>request<boolean>(`/comment/${id}`,"DELETE")