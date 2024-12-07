// Directory 目录：由多个同类型（type 等）的dic组合而成，用于编辑管理dic
import { Entity, Column, OneToMany, Tree, TreeParent, JoinColumn } from 'typeorm'
import { Base } from './Base.entity'
import { Dictionary } from './Dictionary.entity';

@Entity()
@Tree('closure-table')
export class Directory extends Base {

  @Column({
    comment: '文档名称',
  })
  name: string;

  @OneToMany(() => Dictionary, dictionary => dictionary.directory)
  dictionarys: Dictionary[]

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parentId: Directory;
 
}
