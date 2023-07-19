import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("username", ["username"], { unique: true })
@Entity("t_user_auth", { schema: "aurora" })
export class TUserAuth {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_info_id", comment: "用户信息id" })
  userInfoId: number;

  @Column("varchar", {
    name: "username",
    unique: true,
    comment: "用户名",
    length: 50,
  })
  username: string;

  @Column("varchar", { name: "password", comment: "密码", length: 100 })
  password: string;

  @Column("tinyint", { name: "login_type", comment: "登录类型", width: 1 })
  loginType: boolean;

  @Column("varchar", {
    name: "ip_address",
    nullable: true,
    comment: "用户登录ip",
    length: 50,
  })
  ipAddress: string | null;

  @Column("varchar", {
    name: "ip_source",
    nullable: true,
    comment: "ip来源",
    length: 50,
  })
  ipSource: string | null;

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

  @Column("datetime", {
    name: "last_login_time",
    nullable: true,
    comment: "上次登录时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastLoginTime: Date | null;
}
