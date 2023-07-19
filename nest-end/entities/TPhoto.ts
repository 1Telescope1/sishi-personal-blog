import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TPhotoAlbum } from "./TPhotoAlbum";

@Index("albumId", ["albumId"], {})
@Entity("t_photo", { schema: "aurora" })
export class TPhoto {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键" })
  id: number;

  @Column("int", { name: "album_id", comment: "相册id" })
  albumId: number;

  @Column("varchar", { name: "photo_name", comment: "照片名", length: 20 })
  photoName: string;

  @Column("varchar", {
    name: "photo_desc",
    nullable: true,
    comment: "照片描述",
    length: 50,
  })
  photoDesc: string | null;

  @Column("varchar", { name: "photo_src", comment: "照片地址", length: 255 })
  photoSrc: string;

  @Column("tinyint", {
    name: "is_delete",
    comment: "是否删除",
    width: 1,
    default: () => "'0'",
  })
  isDelete: boolean;

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

  @ManyToOne(() => TPhotoAlbum, (tPhotoAlbum) => tPhotoAlbum.tPhotos, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "album_id", referencedColumnName: "id" }])
  album: TPhotoAlbum;
}
