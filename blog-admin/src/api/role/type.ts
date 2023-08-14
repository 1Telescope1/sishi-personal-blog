export interface Role {
  id: number;
  roleName: string;
  isDisable: number;
  createTime: string;
  updateTime: string;
  menuId?:number[];
  resourceId?:number[]
}

export interface RoleParams {
  id?:number,
  roleName:string
}

export interface RoleMenu {
  roleId:number,
  menuId:number
}

export interface RoleResource {
  roleId:number,
  resourceId:number
}

export interface  RolePermission {
  roleId:number,
  roleMenu?:RoleMenu[]
  roleResource?:RoleResource[]
}


