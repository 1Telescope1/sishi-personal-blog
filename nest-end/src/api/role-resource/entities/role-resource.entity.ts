import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Resource } from "src/api/resource/entities/resource.entity";
import { Role } from "src/api/role/entities/role.entity";

@Index("resourceId", ["resourceId"], {})
@Index("roleId", ["roleId"], {})
@Entity("t_role_resource", { schema: "aurora" })
export class RoleResource {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "role_id", nullable: true, comment: "角色id" })
  roleId: number | null;

  @Column("int", { name: "resource_id", nullable: true, comment: "权限id" })
  resourceId: number | null;

  @ManyToOne(() => Resource, (resource) => resource.roleResources, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "resource_id", referencedColumnName: "id" }])
  resource: Resource;

  @ManyToOne(() => Role, (role) => role.roleResources, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Role;
}
