export interface Role {
  id: number;
  roleName: string;
  isDisable: number;
  createTime: string;
  updateTime: string;
}

export interface RoleParams {
  id?:number,
  roleName:string
}