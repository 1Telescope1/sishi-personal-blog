export interface Link {
    url: string,
    name: string,
    avatar: string,
    description: string,
    email: string,
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