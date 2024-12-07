// 文件
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { E } from './Base.entity'
import { Tree } from './Tree.entity'
// import { FileToFileGroup } from './FileToFileGroup.entity';
// import { FileGroup } from './FileGroup.entity';

@Entity()
export class File extends Tree {
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
    comment: '文件内容类型',
    nullable: true,
  })
  mime: string;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
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
    name: 'dir_path',
    comment: '父文件夹绝对路径',
  })
  dirPath: string;

  @Column({
    comment: '时长',
    nullable: true,
    type: 'numeric'
  })
  duration: number;

  @Column({
    comment: '文件大小',
    nullable: true,
  })
  size: number;

  @Column({
    type: 'numeric',
    array: true,
    nullable: true,
    comment: '分辨率',
  })
  resolution: number[];

  @Column({
    comment: '文件标题',
    nullable: true,
  })
  title: string;

  @Column({
    comment: '艺术家',
    nullable: true,
  })
  artist: string;

  @Column({
    name: 'page_size',
    nullable: true,
    comment: '页数',
  })
  pageSize: number;

  @Column({
    comment: '散列值',
    nullable: true,
  })
  md5: string;


  @ManyToOne(() => File, file => file.annexList)
  @JoinColumn({ name: 'main_id' })
  mainFile: File

  @OneToMany(() => File, file => file.mainFile)
  annexList: File[]

  @Column({
    comment: '密钥（一句话）',
    nullable: true,
  })
  secret: string;

  @Column({
    comment: '加密等级：1：未加密；2：加密文件名；3：加密后缀；4：加密文件',
    nullable: true,
  })
  level: number;

  @Column({
    comment: '是否是目录',
    nullable: true,
    name: 'is_dir',
  })
  isDir: boolean;

  @Column({
    comment: '已经解析过',
    name: 'is_parse'
  })
  isParse: boolean;

  // @ManyToMany(() => FileGroup)
  // @JoinTable({
  //   name: 'file__file_group',
  //   joinColumn: {
  //     name: 'file_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: "file_group_id",
  //     referencedColumnName: "id"
  //   }
  // })
  // fileGroups: FileGroup[];

  // @OneToMany(() => FileToFileGroup, fileToFileGroups => fileToFileGroups.file)
  // fileToFileGroups: FileToFileGroup[];

  // 能用吗？
  // isDelete: undefined;
}
