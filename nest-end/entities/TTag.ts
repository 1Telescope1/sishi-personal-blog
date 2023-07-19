import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TArticleTag } from "./TArticleTag";

@Entity("t_tag", { schema: "aurora" })
export class TTag {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "tag_name", comment: "标签名", length: 20 })
  tagName: string;

  @Column("datetime", { name: "create_time", comment: "创建时间" })
  createTime: Date;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    comment: "更新时间",
  })
  updateTime: Date | null;

  @OneToMany(() => TArticleTag, (tArticleTag) => tArticleTag.tag)
  tArticleTags: TArticleTag[];
}
