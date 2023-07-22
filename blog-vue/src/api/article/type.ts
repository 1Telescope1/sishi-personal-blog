import { Tag, UserInfo } from "@/common/model";

export interface Article {
  id: number;
  userId: number;
  articleCover: string;
  articleTitle: string;
  articleContent: string;
  isTop: number;
  isFeatured: number;
  status: number;
  type: number;
  password?: any;
  originalUrl?: any;
  createTime: string;
  updateTime: string;
  views: number;
  tag: Tag;
  userinfo: UserInfo;
}

export interface ArticleParams {
  total: number | null;
  pageNum: number;
  pageSize: number;
  sumPage: number;
  articleTitle?: string;
  articleContent?: string;
  tagId?: string;
}

export interface ArticleList {
  records: Article[];
  total: number;
  pageSize: number;
  pageNum: number;
}

export interface Pagination {
  total: number;
  pageSize: number;
  pageNum: number;
}
