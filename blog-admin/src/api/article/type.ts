import { Tag, UserInfo } from "@/model";

export interface Article {
  id: number;
  userId: number;
  articleCover: string;
  articleTitle: string;
  articleContent: string;
  categoryId:number|null
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
  categoryId?:string,
  type?:string,
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

export interface CreateArticle {
  id?:number | null;
  userId: number;
  articleCover: string |null;
  articleTitle: string;
  articleContent: string;
  categoryId:number |null
  isTop: number | null;
  isFeatured: number | null;
  status: number | null;
  type: number | null;
  password: any |null;
  originalUrl: any |null;
  tagId:string
}
