import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TArticle } from "./TArticle";

@Entity("t_tag", { schema: "aurora" })
export class TTag {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "tag_name", comment: "标签名", length: 20 })
  tagName: string;

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

  @OneToMany(() => TArticle, (tArticle) => tArticle.tag)
  tArticles: TArticle[];
}
