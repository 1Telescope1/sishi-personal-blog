import { Result } from "@/model";
import { request } from "@/utils/request";
import {backImg, Img} from "./type";

//新增或更新图片
export const reqAddOrUpdateImg=(data:Img)=>request<any>(`/back`,'POST',data)

// 获取所有图片
export const reqGetBackImages=()=>request<backImg[]>('/back','GET')

// 删除图片
export const reqDeleteImg=(id:number)=>request<any>(`/back/${id}`,'DELETE')