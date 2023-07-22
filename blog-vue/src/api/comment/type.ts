import { UserInfo,ReplyInfo } from "@/common/model";

export interface Article {
	id: number;
	articleTitle: string;
}

export interface Comment {
	id: number;
	userId: number;
	commentContent: string;
	replyCommentId?: number | null;
	parentId?: number | null;
	isDelete: number;
	isReview: number;
	createTime: string;
	updateTime: string;
	articleId: number;
	userinfo: UserInfo;
	article: Article;
	children: Comment[];
	replyInfo: ReplyInfo;
}



export interface CommentParams {
  id?:number
  userId: number |undefined;
	commentContent: string;
	replyCommentId?: any;
	isDelete?: number;
	isReview?: number;
	articleId: number;
  parentId:number | null
}
