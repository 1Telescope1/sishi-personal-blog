import { request } from "@/utils/request";
import { LoginUser, UserInfo } from "./type";

// 获取用户信息
export const reqUserInfo=(id:any)=>request<UserInfo>(`user/${id}`)

// 登录
export const reqLoign=(data:{username:string,password:string})=>request<LoginUser>(`/user/login`,'POST',data)