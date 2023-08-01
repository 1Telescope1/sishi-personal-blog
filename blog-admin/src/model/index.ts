export interface Result<T> {
  status:number
  data:T
  message:string | null,
  success:boolean
}

export interface Tag {
	tagName: string;
  id?:number|null
  createTime?: string;
	updateTime?: string;
}

export interface UserInfo {
	id?:number,
	nickname: string;
	avatar: string;
}

export interface ReplyInfo {
	id?:number,
	nickname?: any;
	avatar?: any;
}

export interface PaginationParams {
	total?: number;
	pageSize: number;
	pageNum: number;
}

