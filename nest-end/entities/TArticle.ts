import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TArticleTag } from "./TArticleTag";

@Entity("t_article", { schema: "aurora" })
export class TArticle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", comment: "作者" })
  userId: number;

  @Column("int", { name: "category_id", nullable: true, comment: "文章分类" })
  categoryId: number | null;

  @Column("varchar", {
    name: "article_cover",
    nullable: true,
    comment: "文章缩略图",
    length: 1024,
  })
  articleCover: string | null;

  @Column("varchar", { name: "article_title", comment: "标题", length: 50 })
  articleTitle: string;

  @Column("longtext", { name: "article_content", comment: "内容" })
  articleContent: string;

  @Column("tinyint", {
    name: "is_top",
    comment: "是否置顶 0否 1是",
    width: 1,
    default: () => "'0'",
  })
  isTop: boolean;

  @Column("tinyint", {
    name: "is_featured",
    comment: "是否推荐 0否 1是",
    width: 1,
    default: () => "'0'",
  })
  isFeatured: boolean;

  @Column("tinyint", {
    name: "is_delete",
    comment: "是否删除  0否 1是",
    width: 1,
    default: () => "'0'",
  })
  isDelete: boolean;

  @Column("tinyint", {
    name: "status",
    comment: "状态值 1公开 2私密 3草稿",
    width: 1,
    default: () => "'1'",
  })
  status: boolean;

  @Column("tinyint", {
    name: "type",
    comment: "文章类型 1原创 2转载 3翻译",
    width: 1,
    default: () => "'1'",
  })
  type: boolean;

  @Column("varchar", {
    name: "password",
    nullable: true,
    comment: "访问密码",
    length: 255,
  })
  password: string | null;

  @Column("varchar", {
    name: "original_url",
    nullable: true,
    comment: "原文链接",
    length: 255,
  })
  originalUrl: string | null;

  @Column("datetime", { name: "create_time", comment: "发表时间" })
  createTime: Date;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    comment: "更新时间",
  })
  updateTime: Date | null;

  @Column("int", { name: "views", comment: "浏览量", default: () => "'0'" })
  views: number;

  @OneToMany(() => TArticleTag, (tArticleTag) => tArticleTag.article)
  tArticleTags: TArticleTag[];
}
