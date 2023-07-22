import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserInfo } from "src/api/user-info/entities/user-info.entity";
import { Article } from "src/api/article/entities/article.entity";

@Index("comment_articleId", ["articleId"], {})
@Index("fk_comment_parent", ["parentId"], {})
@Index("fk_comment_user", ["userId"], {})
@Entity("t_comment", { schema: "aurora" })
export class Comment {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键" })
  id: number;

  @Column("int", { name: "user_id", comment: "评论用户Id" })
  userId: number;

  @Column("text", { name: "comment_content", comment: "评论内容" })
  commentContent: string;

  @Column("int", {
    name: "reply_comment_id",
    nullable: true,
    comment: "回复评论的id",
  })
  replyCommentId: number | null;

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

  @Column("int", { name: "article_id", comment: "文章id" })
  articleId: number;

  @ManyToOne(() => Article, (article) => article.comments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "id" }])
  article: Article;


  @ManyToOne(() => UserInfo, (userInfo) => userInfo.comments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  userinfo: UserInfo;

  children:Comment[]

  replyInfo:{
    id:number,
    nickname:string,
    avatar:string
  }
}
