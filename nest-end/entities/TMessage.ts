import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TUserInfo } from "./TUserInfo";

@Index("fk_comment_user", ["userId"], {})
@Entity("t_message", { schema: "aurora" })
export class TMessage {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键" })
  id: number;

  @Column("int", { name: "user_id", comment: "评论用户Id" })
  userId: number;

  @Column("text", { name: "comment_content", comment: "评论内容" })
  commentContent: string;

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
    comment: "更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date;

  @ManyToOne(() => TUserInfo, (tUserInfo) => tUserInfo.tMessages, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: TUserInfo;
}
