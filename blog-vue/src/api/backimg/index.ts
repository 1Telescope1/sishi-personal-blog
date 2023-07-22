import { Result } from "@/model";
import { request } from "@/utils/request";
import { backImg } from "./type";

export const getBackImages=()=>request<backImg[]>('/back','GET')