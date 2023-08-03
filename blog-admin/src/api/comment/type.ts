import {UserInfo, ReplyInfo, PaginationParams} from "@/model";

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

export interface CommentAdminParams extends PaginationParams{
	content:string | null,
	nickname:string |null,
	title:string |null
}

export interface Record {
	id: number;
	userId: number;
	commentContent: string;
	replyCommentId: number;
	parentId: number;
	isDelete: number;
	isReview: number;
	createTime: string;
	updateTime: string;
	articleId: number;
	nickname: string;
	avatar: string;
	articleTitle: string;
	articleCover: string;
	replyUser?: ReplyInfo;
}

export interface CommentPage {
	records: Record[];
	total: number;
	pageSize: number;
	pageNum: number;
}
