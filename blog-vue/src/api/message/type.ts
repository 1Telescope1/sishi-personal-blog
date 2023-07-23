import { UserInfo } from "@/common/model";

export interface Message {
	id: number;
	commentContent: string;
	isDelete: number;
	isReview: number;
	createTime: string;
	updateTime: string;
	user: UserInfo;
}

