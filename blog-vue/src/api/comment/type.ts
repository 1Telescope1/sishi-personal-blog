export interface ChildrenComment {
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

export interface CommentList {
  id: number;
  content: string;
  userId: number;
  time: string;
  pid?: any;
  originId?: any;
  articleId: number;
  username: string;
  avatarUrl: string;
  children: ChildrenComment[];
  pusername?: any;
  puserId?: any;
}

export interface CommentParams {
  articleId: string;
  content: string;
  pid: number | null;
}
