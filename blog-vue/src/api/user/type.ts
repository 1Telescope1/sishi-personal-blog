export interface UserInfo {
	id: number;
	email: string;
	nickname: string;
	password?: string;
	avatar: string;
	intro: string;
	website?: string;
	isSubscribe?: any;
	isDisable?: number;
	createTime?: string;
	updateTime?: string;
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


export interface login {
	id: number;
	email?: string;
	nickname: string;
	password: string;
	avatar: string;
	intro?: string;
	website?: string;
	isSubscribe?: any;
	isDisable: number;
	createTime: string;
	updateTime: string;
}

export interface LoginUser {
	userInfo: login;
	token: string;
}

export interface userForm{
  nickname:string
  password:string
  confirmPwd?:string
	identifyCode?:string
}