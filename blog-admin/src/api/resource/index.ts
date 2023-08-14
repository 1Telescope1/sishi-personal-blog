import {request} from "@/utils/request.ts";
import {Resource, ResourceParams} from "@/api/resource/type.ts";

// 新增或修改资源
export const reqAddOrUpdResource=(data:Resource)=>request<any>(`/resource`,'POST',data)

// 删除资源
export const reqDelResource=(id:number)=>request<any>(`/resource/${id}`,'DELETE')

// 按资源模获取资源
export const reqResourceByName=(params:ResourceParams)=>request<Resource[]>(`/resource`,'GET',params)