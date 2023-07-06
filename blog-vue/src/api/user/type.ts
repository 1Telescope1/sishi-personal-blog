export interface UserInfo {
	id: number;
	username: string;
	password: string;
	email?: any;
	address?: any;
	createTime: string;
	avatarUrl: string;
	role: string;
	loginType?: any;
}