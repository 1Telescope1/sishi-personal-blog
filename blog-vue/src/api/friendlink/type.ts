export interface Link {
	linkAddress:string,
	linkName: string,
	linkAvatar: string,
	linkIntro: string,
}

export interface LinkDetail {
	id: number;
	linkName: string;
	linkAvatar: string;
	linkAddress: string;
	linkIntro: string;
	createTime: string;
	updateTime: string;
	isStatus: number;
}