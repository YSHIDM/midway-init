// 文档：由多个同类型（type 等）的dic组合而成，用于编辑管理dic
import { Entity, Column, OneToMany } from 'typeorm'
import { Base } from './Base.entity'
import { Dic } from './Dic.entity';

@Entity()
export class Doc extends Base {

  @Column({
    comment: '文档名称',
  })
  name: string;

  @OneToMany(() => Dic, dic => dic.doc)
  docs: Doc[]

  @Column({
    comment: '类型,如：颜色，季节，方向等描述文字',
  })
  type: string;

}
