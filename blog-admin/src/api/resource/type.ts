export interface Resource {
  id: number;
  resourceName: string;
  url?: any;
  requestMethod?: any;
  parentId?: any;
  isAnonymous: number;
  createTime: string;
  updateTime?: any;
  children?: Resource[];
}

export interface ResourceParams {
  resourceName:string
}