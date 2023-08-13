import {Menu, MenuParams} from "@/api/menu/type.ts";
import {request} from "@/utils/request.ts";

// 新增或修改菜单
export const reqAddOrUpdMenu=(data:Menu)=>request<any>(`/menu`,'POST',data)

// 删除菜单
export const reqDelMenu=(id:number)=>request<any>(`/menu/${id}`,'DELETE')

// 设置菜单是否隐藏
export const reqMenuISHidden=(id:number,isHidden:number)=>request<any>(`/menu/${id}/${isHidden}`,'GET')

// 通过菜单名获取菜单
export const reqMenuByName=(params:MenuParams)=>request<Menu[]>(`/menu`,'GET',params)