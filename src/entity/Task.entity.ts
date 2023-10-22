// 字典：
import { Column, Entity } from 'typeorm'
import { Base } from './Base.entity'

@Entity()
export class Task extends Base {
  @Column({
    comment: '标题',
  })
  title: string;

  @Column({
    comment: '内容',
  })
  content: string;

  @Column({
    name: 'plan_time',
    comment: '计划时间,生成cron',
  })
  planTime: string;

  @Column({
    comment: '节点名称',
  })
  node: 'planning' | 'ongoing' | 'testing' | 'done';

  @Column({
    type: 'jsonb',
    comment: '历史记录',
  })
  history: {
    node: string,
    time: Date,
  }[];

  @Column({
    name: 'is_archive',
    comment: '是否归档',
  })
  isArchive: boolean;

  @Column({
    name: 'is_close',
    comment: '是否关闭',
  })
  isClose: boolean;
}
