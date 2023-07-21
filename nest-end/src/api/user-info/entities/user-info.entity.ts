import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Comment } from "src/api/comment/entities/comment.entity";
import { Message } from "src/api/message/entities/message.entity";
import { Talk } from "src/api/talk/entities/talk.entity";
import { TalkComment } from "src/api/talk-comment/entities/talk-comment.entity";
import { UserRole } from "src/api/user-role/entities/user-role.entity";
import { Article } from "src/api/article/entities/article.entity";

@Entity("t_user_info", { schema: "aurora" })
export class UserInfo {
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

  @OneToMany(() => Comment, (comment) => comment.userinfo)
  comments: Comment[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Talk, (talk) => talk.userinfo)
  talks: Talk[];

  @OneToMany(() => TalkComment, (talkComment) => talkComment.userinfo)
  talkComments: TalkComment[];

  @OneToMany(() => UserRole, (userRole) => userRole.userinfo)
  userRoles: UserRole[];

  @OneToMany(() => Article, (article) => article.userinfo)
  articles: Article[];
}
