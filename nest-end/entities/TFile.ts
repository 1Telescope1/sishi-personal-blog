import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("t_file", { schema: "aurora" })
export class TFile {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "url", comment: "文件路径", length: 100 })
  url: string;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "文件名字",
    length: 30,
  })
  name: string | null;

  @Column("varchar", { name: "type", comment: "文件类型", length: 20 })
  type: string;

  @Column("double", {
    name: "size",
    comment: "文件大小（kb）",
    precision: 20,
    scale: 0,
  })
  size: number;

  @Column("datetime", {
    name: "create_time",
    comment: "上传时间",
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
}
