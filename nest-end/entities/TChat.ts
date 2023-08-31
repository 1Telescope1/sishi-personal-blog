import { Column, Entity } from "typeorm";

@Entity("t_chat", { schema: "aurora" })
export class TChat {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "ip", comment: "ip", length: 100 })
  ip: string;

  @Column("varchar", {
    name: "userId",
    nullable: true,
    comment: "用户id",
    length: 100,
  })
  userId: string | null;

  @Column("datetime", {
    name: "create_time",
    comment: "发布于时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;

  @Column("varchar", { name: "content", comment: "内容", length: 255 })
  content: string;
}
