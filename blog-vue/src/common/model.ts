export interface Tag {
	tagName: string;
  id:number
  createTime?: string;
	updateTime?: string;
}

export interface UserInfo {
	nickname: string;
	avatar: string;
}

export interface ReplyInfo {
	nickname?: any;
	avatar?: any;
}