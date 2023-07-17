export interface Article {
	id: number;
	title: string;
	content: string;
	author: string;
	time: string;
	tag: string;
	coverUrl: string;
	authorUrl: string;
	cnt: number;
}

export interface ArticleParams {
	total:number | null
  pageNum:number
  pageSize:number
	sumPage:number
  title?:string
  content?:string
  author?:string
  tag?:string
}


export interface ArticleList {
	records: Article[];
	total: number;
	size: number;
	current: number;
	orders: any[];
	optimizeCountSql: boolean;
	searchCount: boolean;
	countId?: any;
	maxLimit?: any;
	pages: number;
}

export interface Pagination {
	total:number
	pageSize:number
	pageNum:number
}
