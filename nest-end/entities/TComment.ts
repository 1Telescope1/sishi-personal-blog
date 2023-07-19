import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TUserInfo } from "./TUserInfo";

@Index("fk_comment_parent", ["parentId"], {})
@Index("fk_comment_user", ["userId"], {})
@Entity("t_comment", { schema: "aurora" })
export class TComment {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键" })
  id: number;

  @Column("int", { name: "user_id", comment: "评论用户Id" })
  userId: number;

  @Column("int", { name: "topic_id", nullable: true, comment: "评论主题id" })
  topicId: number | null;

  @Column("text", { name: "comment_content", comment: "评论内容" })
  commentContent: string;

  @Column("int", {
    name: "reply_user_id",
    nullable: true,
    comment: "回复用户id",
  })
  replyUserId: number | null;

  @Column("int", { name: "parent_id", nullable: true, comment: "父评论id" })
  parentId: number | null;

  @Column("tinyint", {
    name: "type",
    comment: "评论类型 1.文章 2.留言 3.关于我 4.友链 5.说说",
  })
  type: number;

  @Column("tinyint", {
    name: "is_delete",
    comment: "是否删除  0否 1是",
    default: () => "'0'",
  })
  isDelete: number;

  @Column("tinyint", {
    name: "is_review",
    comment: "是否审核",
    width: 1,
    default: () => "'1'",
  })
  isReview: boolean;

  @Column("datetime", { name: "create_time", comment: "评论时间" })
  createTime: Date;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    comment: "更新时间",
  })
  updateTime: Date | null;

  @ManyToOne(() => TUserInfo, (tUserInfo) => tUserInfo.tComments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: TUserInfo;
}
