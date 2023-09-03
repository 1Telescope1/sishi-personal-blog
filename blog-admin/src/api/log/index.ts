import {request} from "@/utils/request.ts";
import {Exception, Operation} from "@/api/log/type.ts";

// 获取所有异常日志
export const reqAllException=()=>request<Exception[]>(`/exception-log`,'GET')

// 删除异常日志
export const reqDelException=(id:number)=>request<any>(`/exception-log/${id}`,'DELETE')

// 批量删除异常日志
export const reqDelExceptions=(ids:number[])=>request<any>(`/exception-log/ids`,'POST',ids)

// 获取所有操作日志
export const reqAllOperation=()=>request<Operation[]>(`/operation-log`,'GET')

// 删除操作日志
export const reqDelOperation=(id:number)=>request<any>(`/operation-log/${id}`,'DELETE')

// 批量删除操作日志
export const reqDelOperations=(ids:number[])=>request<any>(`/operation-log/ids`,'POST',ids)
