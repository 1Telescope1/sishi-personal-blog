import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menu } from "src/api/menu/entities/menu.entity";
import { Role } from "src/api/role/entities/role.entity";

@Index("menu", ["menuId"], {})
@Index("role", ["roleId"], {})
@Entity("t_role_menu", { schema: "aurora" })
export class RoleMenu {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键" })
  id: number;

  @Column("int", { name: "role_id", nullable: true, comment: "角色id" })
  roleId: number | null;

  @Column("int", { name: "menu_id", nullable: true, comment: "菜单id" })
  menuId: number | null;

  @ManyToOne(() => Menu, (menu) => menu.roleMenus, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "menu_id", referencedColumnName: "id" }])
  menu: Menu;

  @ManyToOne(() => Role, (role) => role.roleMenus, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Role;
}
