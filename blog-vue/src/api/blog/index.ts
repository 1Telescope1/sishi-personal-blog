import { request } from "@/utils/request";

export const getBlogDetail=()=>request<number[]>(`/blog`)