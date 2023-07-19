import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleResource } from "src/api/role-resource/entities/role-resource.entity";
import { UserRole } from "src/api/user-role/entities/user-role.entity";
import { RoleMenu } from "src/api/role-menu/entities/role-menu.entity";

@Entity("t_role", { schema: "aurora" })
export class Role {
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

  @Column("datetime", {
    name: "create_time",
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    comment: "更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date | null;

  @OneToMany(() => RoleMenu, (roleMenu) => roleMenu.role)
  roleMenus: RoleMenu[];

  @OneToMany(() => RoleResource, (roleResource) => roleResource.role)
  roleResources: RoleResource[];

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
