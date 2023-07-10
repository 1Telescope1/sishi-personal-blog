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

export interface UserMenu {
	id: number;
	path: string;
	name: string;
	icon: string;
	pid?: any;
	pagePath: string;
	children: any[];
	sort: number;
	privilege: string;
}

export interface LoginUser {
	id: number;
	username: string;
	password: string;
	email?: any;
	avatarUrl: string;
	token: string;
	role: string;
	menus: UserMenu[];
	loginType?: any;
	address?: any;
	identifyCode?: any;
}

export interface userForm{
  username:string
  password:string
  confirmPwd?:string
	identifyCode?:string
}