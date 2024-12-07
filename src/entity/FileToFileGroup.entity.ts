// 文件
import { Column, Entity} from 'typeorm'
import { Base } from './Base.entity'
// import { File } from './File.entity'
// import { FileGroup } from './FileGroup.entity'

@Entity('file__file_group')
export class FileToFileGroup extends Base {
  
  @Column({
    name: 'file_id',
    nullable: true,
  })
  fileId: string;
  @Column({
    name: 'file_group_id',
    nullable: true,
  })
  fileGroupId: string;

  // @ManyToOne(() => File, file => file.fileToFileGroups)
  // @JoinColumn({ name: 'file_id' })
  // file: File

  // @ManyToOne(() => FileGroup, fileGroup => fileGroup.fileToFileGroups)
  // @JoinColumn({ name: 'file_group_id' })
  // fileGroup: FileGroup
}
