import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TMenu } from "./TMenu";
import { TRole } from "./TRole";

@Index("menuId", ["menuId"], {})
@Index("roleId_menu", ["roleId"], {})
@Entity("t_role_menu", { schema: "aurora" })
export class TRoleMenu {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键" })
  id: number;

  @Column("int", { name: "role_id", nullable: true, comment: "角色id" })
  roleId: number | null;

  @Column("int", { name: "menu_id", nullable: true, comment: "菜单id" })
  menuId: number | null;

  @ManyToOne(() => TMenu, (tMenu) => tMenu.tRoleMenus, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "menu_id", referencedColumnName: "id" }])
  menu: TMenu;

  @ManyToOne(() => TRole, (tRole) => tRole.tRoleMenus, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: TRole;
}
