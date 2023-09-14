import {PaginationParams} from "@/model";

export interface Chat {
  id: number;
  ip: string;
  userId: number;
  createTime: string;
  content: string;
  nickname: string;
  avatar: string;
}

export interface ChatPage extends PaginationParams{
  records: Chat[];
  total: number;
  pageSize: number;
  pageNum: number;
}

export interface ChatParams extends PaginationParams {
  content:string
}