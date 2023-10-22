// 字典：中文标题与英文标志对照表，建议id = DIC + name + 随机字符串
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from './Base.entity'
import { Doc } from './Doc.entity'

@Entity()
export class Dic extends Base {

  @Column({
    comment: '字典名称-英文',
  })
  name: string;

  @Column({
    comment: '字典标题-中文',
  })
  title: string

  @ManyToOne(() => Doc, doc => doc.docs)
  @JoinColumn({ name: 'dic_id' })
  // 字典
  doc: Doc;

  @Column({
    comment: '排序',
  })
  sort: number;

}
