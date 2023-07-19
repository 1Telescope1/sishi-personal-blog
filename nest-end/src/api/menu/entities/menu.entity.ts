import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleMenu } from "src/api/role-menu/entities/role-menu.entity";

@Entity("t_menu", { schema: "aurora" })
export class Menu {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键" })
  id: number;

  @Column("varchar", { name: "name", comment: "菜单名", length: 20 })
  name: string;

  @Column("varchar", { name: "path", comment: "菜单路径", length: 50 })
  path: string;

  @Column("varchar", { name: "component", comment: "组件", length: 50 })
  component: string;

  @Column("varchar", { name: "icon", comment: "菜单icon", length: 50 })
  icon: string;

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

  @Column("tinyint", { name: "order_num", comment: "排序", width: 1 })
  orderNum: boolean;

  @Column("int", { name: "parent_id", nullable: true, comment: "父id" })
  parentId: number | null;

  @Column("tinyint", {
    name: "is_hidden",
    comment: "是否隐藏  0否1是",
    width: 1,
    default: () => "'0'",
  })
  isHidden: boolean;

  @OneToMany(() => RoleMenu, (roleMenu) => roleMenu.menu)
  roleMenus: RoleMenu[];
}
