import { request } from "@/utils/request";
import {Article, ArticleList, ArticleParams, CreateArticle} from "./type";

// 获取文章列表
export const reqGetArticleList = () => request<Article[]>(`/article`);

// 分页获取文章
export const reqGetArticlesPage = (paramas: ArticleParams) =>
  request<ArticleList>(`/article/page`, "GET", paramas);

// 获取文章总数
export const reqArticleTotal=()=>request<number>(`/article/length`);

// 根据文章id获取文章
export const reqArticleById=(id:string)=>request<Article>(`/article/${id}`)

// 发表或更新文章
export const reqPublishArticle=(data:CreateArticle)=>request<any>(`/article`,'POST',data)

// 逻辑删除文章
export const reqDeleteArticle=(id:number)=>request<any>(`/article/${id}`,'DELETE')