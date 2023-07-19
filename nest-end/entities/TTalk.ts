import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TUserInfo } from "./TUserInfo";

@Index("talk_userId", ["userId"], {})
@Entity("t_talk", { schema: "aurora" })
export class TTalk {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "说说id" })
  id: number;

  @Column("int", { name: "user_id", comment: "用户id" })
  userId: number;

  @Column("varchar", { name: "content", comment: "说说内容", length: 2000 })
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

  @ManyToOne(() => TUserInfo, (tUserInfo) => tUserInfo.tTalks, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: TUserInfo;
}
