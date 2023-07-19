import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TRoleMenu } from "./TRoleMenu";
import { TRoleResource } from "./TRoleResource";
import { TUserRole } from "./TUserRole";

@Entity("t_role", { schema: "aurora" })
export class TRole {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键id" })
  id: number;

  @Column("varchar", { name: "role_name", comment: "角色名", length: 20 })
  roleName: string;

  @Column("tinyint", {
    name: "is_disable",
    comment: "是否禁用  0否 1是",
    width: 1,
    default: () => "'0'",
  })
  isDisable: boolean;

  @Column("datetime", { name: "create_time", comment: "创建时间" })
  createTime: Date;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    comment: "更新时间",
  })
  updateTime: Date | null;

  @OneToMany(() => TRoleMenu, (tRoleMenu) => tRoleMenu.role)
  tRoleMenus: TRoleMenu[];

  @OneToMany(() => TRoleResource, (tRoleResource) => tRoleResource.role)
  tRoleResources: TRoleResource[];

  @OneToMany(() => TUserRole, (tUserRole) => tUserRole.role)
  tUserRoles: TUserRole[];
}
