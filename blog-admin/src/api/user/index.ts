import { request } from "@/utils/request";
import {LoginUser, UserInfo, userForm, UserParams, UserPage} from "./type";

// 创建或修改用户
export const reqSaveOrAddUser=(data:UserInfo)=>request<any>(`/userinfo`,'POST',data)

// 获取用户信息
export const reqUserInfo=(id:any)=>request<UserInfo>(`userinfo/${id}`)

// 登录
export const reqLoign=(data:userForm)=>request<LoginUser>(`/auth/signin`,'POST',data)

// 注册
export const reqRegister=(data:userForm)=>request<any>(`/auth/signup`,'POST',data)

// 获取所有用户
export const reqAllUser=()=>request<UserInfo>(`/userinfo`)

// 禁用用户
export const reqDisableUser=(id:number)=>request<any>(`/userinfo/${id}`,'DELETE')

// 分页获取用户
export const reqGetUserByPage=(params:UserParams)=>request<UserPage>(`/userinfo/page`,'GET',params)

// 是否禁用用户
export const reqIsDisAbleUser=(id:number,flag:number)=>request<any>(`/userinfo/${id}/${flag}`,'DELETE')

