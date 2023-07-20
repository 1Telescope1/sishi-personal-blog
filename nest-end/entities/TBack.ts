import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("t_back", { schema: "aurora" })
export class TBack {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "content", nullable: true, comment: "内容" })
  content: string | null;

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

  @Column("varchar", { name: "url", comment: "网址", length: 255 })
  url: string;
}
