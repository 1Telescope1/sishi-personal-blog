import {PaginationParams} from "@/model";

export interface Exception {
  id: number;
  optUri: string;
  optMethod: string;
  requestParam: string;
  optDesc?: any;
  exceptionInfo: string;
  ipAddress: string;
  ipSource?: any;
  createTime: string;
}

export interface ExceptionPage extends PaginationParams {
  records:Exception[]
}

export interface Operation {
  id: number;
  optModule?: any;
  optType?: any;
  optUri: string;
  optMethod?: any;
  optDesc?: any;
  requestParam: string;
  requestMethod: string;
  responseData?: any;
  userId: number;
  nickname: string;
  ipAddress: string;
  ipSource?: any;
  createTime: string;
  updateTime: string;
}

export interface OperationPage extends PaginationParams {
  records:Operation[]
}