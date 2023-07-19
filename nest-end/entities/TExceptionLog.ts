import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("t_exception_log", { schema: "aurora" })
export class TExceptionLog {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "opt_uri", comment: "请求接口", length: 255 })
  optUri: string;

  @Column("varchar", { name: "opt_method", comment: "请求方式", length: 255 })
  optMethod: string;

  @Column("varchar", {
    name: "request_method",
    nullable: true,
    comment: "请求方式",
    length: 255,
  })
  requestMethod: string | null;

  @Column("varchar", {
    name: "request_param",
    nullable: true,
    comment: "请求参数",
    length: 2000,
  })
  requestParam: string | null;

  @Column("varchar", {
    name: "opt_desc",
    nullable: true,
    comment: "操作描述",
    length: 255,
  })
  optDesc: string | null;

  @Column("text", {
    name: "exception_info",
    nullable: true,
    comment: "异常信息",
  })
  exceptionInfo: string | null;

  @Column("varchar", {
    name: "ip_address",
    nullable: true,
    comment: "ip",
    length: 255,
  })
  ipAddress: string | null;

  @Column("varchar", {
    name: "ip_source",
    nullable: true,
    comment: "ip来源",
    length: 255,
  })
  ipSource: string | null;

  @Column("datetime", {
    name: "create_time",
    comment: "操作时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;
}
