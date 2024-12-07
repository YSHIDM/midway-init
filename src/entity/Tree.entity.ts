import {
  Entity,
  Column,
} from "typeorm"
import { Base } from './Base.entity'

@Entity()
export class Tree extends Base {

  @Column({
    comment: '文件绝对路径',
    nullable: true,
  })
  branch?: string

  @Column({
    comment: '是否是叶子节点',
    nullable: true,
    name: 'is_leaf',
  })
  isLeaf: boolean;

  @Column({
    comment: '回收版本号',
    nullable: true,
    name: 'deleted_version',
  })
  deletedVersion: string;

  @Column({
    comment: '是否在回收站展示',
    name: 'show_recycle',
  })
  showRecycle: boolean;
}
