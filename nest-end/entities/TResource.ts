import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TRoleResource } from "./TRoleResource";

@Entity("t_resource", { schema: "aurora" })
export class TResource {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键" })
  id: number;

  @Column("varchar", { name: "resource_name", comment: "资源名", length: 50 })
  resourceName: string;

  @Column("varchar", {
    name: "url",
    nullable: true,
    comment: "权限路径",
    length: 255,
  })
  url: string | null;

  @Column("varchar", {
    name: "request_method",
    nullable: true,
    comment: "请求方式",
    length: 10,
  })
  requestMethod: string | null;

  @Column("int", { name: "parent_id", nullable: true, comment: "父模块id" })
  parentId: number | null;

  @Column("tinyint", {
    name: "is_anonymous",
    comment: "是否匿名访问 0否 1是",
    width: 1,
    default: () => "'0'",
  })
  isAnonymous: boolean;

  @Column("datetime", {
    name: "create_time",
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    comment: "修改时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date | null;

  @OneToMany(() => TRoleResource, (tRoleResource) => tRoleResource.resource)
  tRoleResources: TRoleResource[];
}
