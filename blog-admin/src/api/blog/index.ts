import { request } from "@/utils/request";

export const getBlogDetail=()=>request<number[]>(`/blog`)


export const reqGetAdminBlogDetail=()=>request<number[]>(`/blog/detail`)