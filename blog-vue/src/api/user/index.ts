import { request } from "@/utils/request";
import { LoginUser, User, userForm } from "./type";

// 获取用户信息
export const reqUserInfo=(id:any)=>request<User>(`userinfo/${id}`)

// 登录
export const reqLoign=(data:userForm)=>request<LoginUser>(`/auth/signin`,'POST',data)

// 注册
export const reqRegister=(data:userForm)=>request<LoginUser>(`/auth/signup`,'POST',data)
