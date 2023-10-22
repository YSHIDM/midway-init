// 字典：
import { Column, Entity } from 'typeorm'
import { Base } from './Base.entity'

@Entity('task_node')
export class TaskNode extends Base {
  @Column({
    comment: '英文名',
  })
  name: string;

  @Column({
    comment: '标题',
  })
  title: string;

  @Column({
    comment: '别名',
  })
  alias: string;

  @Column({
    comment: '排序',
  })
  sort: string;
}
