export interface Link {
    url: string,
    name: string,
    avatar: string,
    description: string,
    email: string,
}

export interface LinkDetail {
	id: number;
	name: string;
	description: string;
	url: string;
	avatar: string;
	flag: number;
	email: string;
	createTime: string;
}