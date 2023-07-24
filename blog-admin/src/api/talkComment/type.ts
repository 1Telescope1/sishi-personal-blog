import { ReplyInfo, UserInfo } from "@/model";

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