import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("t_views", { schema: "aurora" })
export class TViews {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "ip", comment: "ip地址", length: 40 })
  ip: string;

  @Column("varchar", {
    name: "address",
    nullable: true,
    comment: "物理地址",
    length: 100,
  })
  address: string | null;

  @Column("datetime", {
    name: "create_time",
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;
}
