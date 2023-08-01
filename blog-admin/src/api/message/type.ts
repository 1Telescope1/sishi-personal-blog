import {PaginationParams, UserInfo} from "@/model";

export interface Message {
	id: number;
	commentContent: string;
	isDelete: number;
	isReview: number;
	createTime: string;
	updateTime: string;
	user: UserInfo;
}

export interface Record {
	id: number;
	userId: number;
	commentContent: string;
	isDelete: number;
	isReview: number;
	createTime: string;
	updateTime: string;
	nickname: string;
	avatar: string;
}

export interface MessagePage {
	records: Record[];
	total: number;
	pageSize: number;
	pageNum: number;
}

export interface MessageParams extends PaginationParams{
	content?:string | null,
	userId?:string |null
}

