/** 文件 */
import { Column, Table, DataType, HasMany } from 'sequelize-typescript'; // HasMany
import { Base, E } from './Base';

const { ARRAY, STRING, NUMBER } = DataType;
@Table({
  timestamps: true, // 自动维护时间
  tableName: 'file', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，goods
})
export class File extends Base {
  @Column({
    comment: '文件名',
  })
  filename: string;

  @Column({
    field: 'lower_name',
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
    comment: `标签（爱好、特征等）${E
      }文件类型（图片、音乐、视频、文档、文本等）根据文件后缀自动添加`,
    type: ARRAY(STRING),
  })
  tags: string[];

  @Column({
    field: 'file_path',
    comment: '文件绝对路径',
  })
  filePath: string;

  @Column({
    comment: '时长',
  })
  duration: number;

  @Column({
    comment: '文件大小',
  })
  size: string;

  @Column({
    comment: '分辨率',
    type: ARRAY(NUMBER),
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
    comment: '散列值',
  })
  md5: string;

  @Column({
    comment: '文件描述',
  })
  desc: string;

  @HasMany(() => File, 'annex_id_list')
  // 文档数组
  annex: File[];

  @Column({
    field: 'annex_id_list',
    comment: '附件（歌词、字幕）',
    type: ARRAY(STRING),
  })
  annexIdList: string[];

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
    field: 'is_dir',
  })
  isDir: boolean;

  @Column({
    comment: '回收版本号',
    field: 'deleted_version',
  })
  deletedVersion: string;

  @Column({
    comment: '是否在回收站展示',
    field: 'show_recycle',
  })
  showRecycle: boolean;
}
