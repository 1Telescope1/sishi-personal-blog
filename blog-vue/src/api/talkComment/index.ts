import { request } from "@/utils/request"
import { CommentParams, TalkComment } from "./type"
// 根据说说获取评论
export const reqTalkComment=(id:number)=>request<TalkComment[]>(`/talkcomment/talk/${id}`)

// 发送评论
export const reqAddTalkComment=(data:CommentParams)=>request<null>(`/talkcomment`,'POST',data)

// 删除评论
export const reqDelTalkComment=(id:number)=>request<boolean>(`/talkcomment/${id}`,'DELETE')