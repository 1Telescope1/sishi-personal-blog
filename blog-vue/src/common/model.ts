export interface Tag {
	tagName: string;
  id:number
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