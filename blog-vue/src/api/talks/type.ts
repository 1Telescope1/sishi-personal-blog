export interface Talk {
	id: number;
	title?: any;
	content: string;
	user: string;
	time: string;
	avatarUrl: string;
	html: string;
}

export interface TalkComment {
	id: number;
	content: string;
	userId: number;
	time: string;
	pid: number;
	originId: number;
	articleId: number;
	username: string;
	avatarUrl: string;
	children?: any;
	pusername: string;
	puserId: number;
}

export interface TalkCommentList {
	id: number;
	content: string;
	userId: number;
	time: string;
	pid?: any;
	originId?: any;
	articleId: number;
	username: string;
	avatarUrl: string;
	children: TalkComment[];
	pusername?: any;
	puserId?: any;
}

export interface CommentParams {
  articleId: string;
  content: string;
  pid: number | null;
}

