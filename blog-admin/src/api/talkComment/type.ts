import {PaginationParams, ReplyInfo, UserInfo} from "@/model";

export interface TalkComment {
	id: number;
	userId: number;
	commentContent: string;
	replyCommentId?: any;
	parentId?: any;
	isDelete: number;
	isReview: number;
	createTime: string;
	updateTime: string;
	talkId: number;
	userinfo: UserInfo;
	children: TalkComment[];
	replyInfo: ReplyInfo;
}

export interface CommentParams {
  id?:number
  userId: number |undefined;
	commentContent: string;
	replyCommentId?: any;
	isDelete?: number;
	isReview?: number;
	talkId: number;
  parentId:number | null
}

export interface Record {
	id: number;
	userId: number;
	commentContent: string;
	replyCommentId?: any;
	parentId?: any;
	isDelete: number;
	isReview: number;
	createTime: string;
	updateTime: string;
	talkId: number;
	nickname: string;
	avatar: string;
}

export interface TalkCommentPage {
	records: Record[];
	total: number;
	pageSize: number;
	pageNum: number;
}

export interface TalkCommentParams extends PaginationParams {
	content:string | null,
	nickname:string |null
}