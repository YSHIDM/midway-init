// 字典：中文标题与英文标志对照表，建议id = DIC + name + 随机字符串
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from './Base.entity'
import { Directory } from './Directory.entity'

@Entity()
export class Dictionary extends Base {

  @Column({
    comment: '字典名称-英文',
  })
  name: string;

  @Column({
    comment: '字典标题-中文',
  })
  title: string

  @ManyToOne(() => Directory, directory => directory.dictionarys)
  @JoinColumn({ name: 'directory_id' })
  // 字典
  directory: Directory;

  @Column({
    comment: '排序',
  })
  sort: number;

}
