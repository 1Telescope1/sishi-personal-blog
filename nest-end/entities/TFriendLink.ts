import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_friend_link_user", ["linkName"], {})
@Entity("t_friend_link", { schema: "aurora" })
export class TFriendLink {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "link_name", comment: "链接名", length: 20 })
  linkName: string;

  @Column("varchar", { name: "link_avatar", comment: "链接头像", length: 255 })
  linkAvatar: string;

  @Column("varchar", { name: "link_address", comment: "链接地址", length: 50 })
  linkAddress: string;

  @Column("varchar", { name: "link_intro", comment: "链接介绍", length: 100 })
  linkIntro: string;

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
}
