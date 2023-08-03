import { request } from "@/utils/request";
import {Comment, CommentAdminParams, CommentPage, CommentParams} from "./type";

// 根据文章id获取评论列表
export const reqCommentByArticle=(articleId:number)=>request<Comment[]>(`/comment/article/${articleId}`)

// 发送评论
export const reqSendComment=(data:CommentParams)=>request<null>(`/comment`,"POST",data)

// 删除评论
export const reqDelComment=(id:number)=>request<boolean>(`/comment/${id}`,"DELETE")

// 分页获取评论
export const reqCommentByPage=(params:CommentAdminParams)=>request<CommentPage>(`/comment/page`,'GET',params)