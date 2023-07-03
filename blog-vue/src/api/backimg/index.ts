import { Result } from "@/model";
import { request } from "@/utils/request";
import { TagData } from "./type";

export const getBackImages=()=>request<TagData[]>('/back-img','GET')