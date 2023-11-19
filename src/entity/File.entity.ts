// 文件
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Base, E } from './Base.entity'

@Entity()
export class File extends Base {
  @Column({
    comment: '文件名',
  })
  filename: string;

  @Column({
    name: 'lower_name',
    comment: '文件名小写',
  })
  lowerName: string;

  @Column({
    comment: '文件别名',
  })
  alias: string;

  @Column({
    comment: '带点文件后缀',
  })
  ext: string;

  @Column({
    type: 'simple-array',
    comment: `标签（爱好、特征等）${E
      }文件类型（图片、音乐、视频、文档、文本等）根据文件后缀自动添加`,
  })
  tags: string[];

  @Column({
    name: 'file_path',
    comment: '文件绝对路径',
  })
  filePath: string;

  @Column({
    comment: '时长',
    // type: 'double'
  })
  duration: number;

  @Column({
    comment: '文件大小',
  })
  size: string;

  @Column({
    type: 'simple-array',
    comment: '分辨率',
  })
  resolution: number[];

  @Column({
    comment: '文件标题',
  })
  title: string;

  @Column({
    comment: '艺术家',
  })
  artist: string;

  @Column({
    name: 'pageize',
    comment: '页数',
  })
  pageSize: number;

  @Column({
    comment: '散列值',
  })
  md5: string;

  @Column({
    comment: '文件描述',
  })
  desc: string;


  @ManyToOne(() => File, file => file.annexList)
  @JoinColumn({ name: 'main_id' })
  mainFile: File

  @OneToMany(() => File, file => file.mainFile)
  annexList: File[]

  @Column({
    comment: '密钥（一句话）',
  })
  secret: string;

  @Column({
    comment: '加密等级：1：未加密；2：加密文件名；3：加密后缀；4：加密文件',
  })
  level: number;

  @Column({
    comment: '是否是目录',
    name: 'is_dir',
  })
  isDir: boolean;

  @Column({
    comment: '回收版本号',
    name: 'deleted_version',
  })
  deletedVersion: string;

  @Column({
    comment: '是否在回收站展示',
    name: 'show_recycle',
  })
  showRecycle: boolean;

  // // TODO: 能用吗？
  // isDelete: undefined;
}
