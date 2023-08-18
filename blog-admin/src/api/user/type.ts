import {PaginationParams} from "@/model";

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

export interface UserRole {
	id: number;
	roleName: string;
}

export interface Menu {
	id: number;
	name: string;
	path: string;
	component: string;
	icon: string;
	createTime: string;
	updateTime: string;
	orderNum: number;
	parentId?: any;
	isHidden: number;
}

export interface User {
	id: number;
	email?: any;
	nickname: string;
	avatar: string;
	intro?: any;
	website?: any;
	isSubscribe?: any;
	isDisable: number;
	createTime: string;
	updateTime: string;
	userRole: UserRole;
	menus: Menu[];
}

export interface LoginUser {
	userinfo:User,
	token:string
}

export interface userForm{
  nickname:string
  password:string
  confirmPwd?:string
	identifyCode?:string
}

export interface Record {
	id: number;
	email?: any;
	nickname: string;
	avatar: string;
	intro?: any;
	website?: any;
	isSubscribe?: any;
	isDisable: number;
	createTime: string;
	updateTime: string;
	userRole: {
		id: number,
		roleName: string
	}
}

export interface UserPage extends PaginationParams{
	records: Record[];
}

export interface UserParams extends PaginationParams {
	nickname:string | null
}