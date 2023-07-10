import { request } from "@/utils/request";
import { LoginUser, UserInfo, userForm } from "./type";

// 获取用户信息
export const reqUserInfo=(id:any)=>request<UserInfo>(`user/${id}`)

// 登录
export const reqLoign=(data:userForm)=>request<LoginUser>(`/user/login`,'POST',data)

// 注册
export const reqRegister=(data:userForm)=>request<LoginUser>(`/user/register`,'POST',data)
