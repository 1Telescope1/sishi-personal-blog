import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

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

}
