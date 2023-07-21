import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TRole } from "./TRole";
import { TUserInfo } from "./TUserInfo";

@Index("role_id", ["roleId"], {})
@Index("user_id", ["userId"], {})
@Entity("t_user_role", { schema: "aurora" })
export class TUserRole {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true, comment: "用户id" })
  userId: number | null;

  @Column("int", { name: "role_id", nullable: true, comment: "角色id" })
  roleId: number | null;

  @ManyToOne(() => TRole, (tRole) => tRole.tUserRoles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: TRole;

  @ManyToOne(() => TUserInfo, (tUserInfo) => tUserInfo.tUserRoles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: TUserInfo;
}
