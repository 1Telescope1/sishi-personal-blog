import { UserInfo } from "@/model";

export interface Talk {
	id: number;
	userId: number;
	content: string;
	images?: any;
	isTop: number;
	status: number;
	createTime: string;
	updateTime: string;
	views: number;
	userinfo: UserInfo;
}

