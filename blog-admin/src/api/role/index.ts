import {request} from "@/utils/request.ts";
import {Role, RoleParams} from "@/api/role/type.ts";

//新建或更新角色
export const reqAddOrUpdRole=(data:RoleParams)=>request<any>(`/role`,'POST',data)

// 根据角色名获取角色
export const reqAllRole=(params:RoleParams)=>request<Role[]>(`/role`,'GET',params)

// 禁用角色
export const reqDisableRole=(id:number)=>request<any>(`/role/${id}`,'DELETE')

export const reqChangeDisable=(id:number,isDisable:number)=>request<any>(`/role/${id}/${isDisable}`,'GET')