import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TComment } from "./TComment";
import { TMessage } from "./TMessage";
import { TTalk } from "./TTalk";
import { TTalkComment } from "./TTalkComment";
import { TUserRole } from "./TUserRole";

@Entity("t_user_info", { schema: "aurora" })
export class TUserInfo {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "用户ID" })
  id: number;

  @Column("varchar", {
    name: "email",
    nullable: true,
    comment: "邮箱号",
    length: 50,
  })
  email: string | null;

  @Column("varchar", { name: "nickname", comment: "用户昵称", length: 50 })
  nickname: string;

  @Column("varchar", { name: "avatar", comment: "用户头像", length: 1024 })
  avatar: string;

  @Column("varchar", {
    name: "intro",
    nullable: true,
    comment: "用户简介",
    length: 255,
  })
  intro: string | null;

  @Column("varchar", {
    name: "website",
    nullable: true,
    comment: "个人网站",
    length: 255,
  })
  website: string | null;

  @Column("tinyint", {
    name: "is_subscribe",
    nullable: true,
    comment: "是否订阅",
    width: 1,
  })
  isSubscribe: boolean | null;

  @Column("tinyint", {
    name: "is_disable",
    comment: "是否禁用",
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

  @Column("varchar", { name: "password", comment: "密码", length: 255 })
  password: string;

  @OneToMany(() => TComment, (tComment) => tComment.user)
  tComments: TComment[];

  @OneToMany(() => TMessage, (tMessage) => tMessage.user)
  tMessages: TMessage[];

  @OneToMany(() => TTalk, (tTalk) => tTalk.user)
  tTalks: TTalk[];

  @OneToMany(() => TTalkComment, (tTalkComment) => tTalkComment.user)
  tTalkComments: TTalkComment[];

  @OneToMany(() => TUserRole, (tUserRole) => tUserRole.user)
  tUserRoles: TUserRole[];
}
