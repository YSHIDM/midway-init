// 文件
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { Base } from './Base.entity'
// import { FileToFileGroup } from './FileToFileGroup.entity';
import { File } from './File.entity';

@Entity('file_group')
export class FileGroup extends Base {
  @Column({
    comment: '歌单名',
  })
  name: string;

  @Column({
    comment: '文件列表类型，音乐、视频等',
  })
  type: string

  @ManyToMany(() => File)
  @JoinTable({
    name: 'file__file_group',
    joinColumn: {
      name: 'file_group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: "file_id",
      referencedColumnName: "id"
    }
  })
  files: File[];

  // @OneToMany(() => FileToFileGroup, fileToFileGroup => fileToFileGroup.fileGroup)
  // fileToFileGroups: FileToFileGroup[];
}
