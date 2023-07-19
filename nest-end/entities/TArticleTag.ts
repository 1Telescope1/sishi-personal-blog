import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TArticle } from "./TArticle";
import { TTag } from "./TTag";

@Index("fk_article_tag_1", ["articleId"], {})
@Index("fk_article_tag_2", ["tagId"], {})
@Entity("t_article_tag", { schema: "aurora" })
export class TArticleTag {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "article_id", comment: "文章id" })
  articleId: number;

  @Column("int", { name: "tag_id", comment: "标签id" })
  tagId: number;

  @ManyToOne(() => TArticle, (tArticle) => tArticle.tArticleTags, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "id" }])
  article: TArticle;

  @ManyToOne(() => TTag, (tTag) => tTag.tArticleTags, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: TTag;
}
