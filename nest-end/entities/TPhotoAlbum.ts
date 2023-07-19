import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TPhoto } from "./TPhoto";

@Entity("t_photo_album", { schema: "aurora" })
export class TPhotoAlbum {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键" })
  id: number;

  @Column("varchar", { name: "album_name", comment: "相册名", length: 20 })
  albumName: string;

  @Column("varchar", { name: "album_desc", comment: "相册描述", length: 50 })
  albumDesc: string;

  @Column("varchar", { name: "album_cover", comment: "相册封面", length: 255 })
  albumCover: string;

  @Column("tinyint", {
    name: "is_delete",
    comment: "是否删除",
    width: 1,
    default: () => "'0'",
  })
  isDelete: boolean;

  @Column("tinyint", {
    name: "status",
    comment: "状态值 1公开 2私密",
    width: 1,
    default: () => "'1'",
  })
  status: boolean;

  @Column("datetime", { name: "create_time", comment: "创建时间" })
  createTime: Date;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    comment: "更新时间",
  })
  updateTime: Date | null;

  @OneToMany(() => TPhoto, (tPhoto) => tPhoto.album)
  tPhotos: TPhoto[];
}
