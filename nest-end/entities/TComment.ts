import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TArticle } from "./TArticle";
import { TUserInfo } from "./TUserInfo";

@Index("comment_articleId", ["articleId"], {})
@Index("fk_comment_parent", ["parentId"], {})
@Index("fk_comment_user", ["userId"], {})
@Entity("t_comment", { schema: "aurora" })
export class TComment {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键" })
  id: number;

  @Column("int", { name: "user_id", comment: "评论用户Id" })
  userId: number;

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

  @Column("datetime", {
    name: "create_time",
    comment: "评论时间",
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

  @Column("int", { name: "article_id", comment: "文章id" })
  articleId: number;

  @ManyToOne(() => TArticle, (tArticle) => tArticle.tComments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "id" }])
  article: TArticle;

  @ManyToOne(() => TUserInfo, (tUserInfo) => tUserInfo.tComments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: TUserInfo;
}
