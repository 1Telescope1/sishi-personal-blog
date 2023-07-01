import { request } from "@/utils/request";

export const reqTags=()=>request('/tag','GET')