import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserInfo } from "src/api/user-info/entities/user-info.entity";
import { TalkComment } from "src/api/talk-comment/entities/talk-comment.entity";

@Index("talk_userId", ["userId"], {})
@Entity("t_talk", { schema: "aurora" })
export class Talk {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "说说id" })
  id: number;

  @Column("int", { name: "user_id", comment: "用户id",default: () => 1 })
  userId: number;

  @Column("longtext", { name: "content", comment: "说说内容" })
  content: string;

  @Column("varchar", {
    name: "images",
    nullable: true,
    comment: "图片",
    length: 2500,
  })
  images: string | null;

  @Column("tinyint", {
    name: "is_top",
    comment: "是否置顶",
    width: 1,
    default: () => "'0'",
  })
  isTop: boolean;

  @Column("tinyint", {
    name: "status",
    comment: "状态 1.公开 2.私密",
    width: 1,
    default: () => "'1'",
  })
  status: boolean;

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

  @Column("int", { name: "views", comment: "浏览量", default: () => "'0'" })
  views: number;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.talks, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  userinfo: UserInfo;

  @OneToMany(() => TalkComment, (talkComment) => talkComment.talk)
  talkComments: TalkComment[];
}
