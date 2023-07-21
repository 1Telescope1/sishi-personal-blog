import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "src/api/role/entities/role.entity";
import { UserInfo } from "src/api/user-info/entities/user-info.entity";

@Index("role_id", ["roleId"], {})
@Index("user_id", ["userId"], {})
@Entity("t_user_role", { schema: "aurora" })
export class UserRole {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true, comment: "用户id" })
  userId: number | null;

  @Column("int", { name: "role_id", nullable: true, comment: "角色id" })
  roleId: number | null;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Role;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.userRoles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  userinfo: UserInfo;
}
