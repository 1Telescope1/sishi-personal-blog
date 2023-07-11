import { request } from "@/utils/request";
import { Article, ArticleList, ArticleParams } from "./type";

// 获取文章列表
export const reqGetArticleList = () => request<Article[]>(`/article`);

// 分页获取文章
export const reqGetArticlesPage = (paramas: ArticleParams) =>
  request<ArticleList>(`/article/allPage`, "GET", paramas);

// 获取文章总数
export const reqArticleTotal=()=>request<number>(`/article/length`);

// 根据文章id获取文章
export const reqArticleById=(id:string)=>request<Article>(`/article/${id}`)