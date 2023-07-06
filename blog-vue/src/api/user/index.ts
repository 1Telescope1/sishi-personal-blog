import { request } from "@/utils/request";
import { UserInfo } from "./type";

export const reqUserInfo=(id:any)=>request<UserInfo>(`user/${id}`)