import {request} from "@/utils/request.ts";
import {Role, RoleParams, RolePermission} from "@/api/role/type.ts";

//新建或更新角色
export const reqAddOrUpdRole=(data:RoleParams)=>request<any>(`/role`,'POST',data)

// 根据角色名获取角色
export const reqAllRole=(params:RoleParams)=>request<Role[]>(`/role`,'GET',params)

// 禁用角色
export const reqDisableRole=(id:number)=>request<any>(`/role/${id}`,'DELETE')

// 改变角色禁用状态
export const reqChangeDisable=(id:number,isDisable:number)=>request<any>(`/role/${id}/${isDisable}`,'GET')

// 为角色分配资源
export const reqChangeRoleResource=(data:RolePermission)=>request<any>(`/role/resource`,'POST',data)

// 为角色分配菜单
export const reqChangeRoleMenu=(data:RolePermission)=>request<any>('/role/menu','POST',data)