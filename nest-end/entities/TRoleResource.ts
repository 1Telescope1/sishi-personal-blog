import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TResource } from "./TResource";
import { TRole } from "./TRole";

@Index("resourceId", ["resourceId"], {})
@Index("roleId", ["roleId"], {})
@Entity("t_role_resource", { schema: "aurora" })
export class TRoleResource {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "role_id", nullable: true, comment: "角色id" })
  roleId: number | null;

  @Column("int", { name: "resource_id", nullable: true, comment: "权限id" })
  resourceId: number | null;

  @ManyToOne(() => TResource, (tResource) => tResource.tRoleResources, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "resource_id", referencedColumnName: "id" }])
  resource: TResource;

  @ManyToOne(() => TRole, (tRole) => tRole.tRoleResources, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: TRole;
}
