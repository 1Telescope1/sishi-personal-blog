import {PaginationParams} from "@/model";

export interface Views {
  id: number;
  ip: string;
  address: string;
  createTime: string;
}

export interface ViewsPage extends PaginationParams {
  records: Views[];
  total: number;
  pageSize: number;
  pageNum: number;
}

export interface ViewsParams extends PaginationParams {
  address:string
}