export interface Menu {
  id?: number;
  name: string;
  path: string;
  component: string;
  icon: string;
  createTime?: string;
  updateTime?: string;
  orderNum: number;
  parentId?: number;
  isHidden?: number;
  children?: Menu[];
}

export interface MenuParams {
  name:string
}