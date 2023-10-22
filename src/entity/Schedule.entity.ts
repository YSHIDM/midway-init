// 定时任务：前端可修改时间
import { Column, Entity } from 'typeorm'
import { Base } from './Base.entity'

@Entity()
export class Schedule extends Base {
  @Column({
    comment: '定时器名称',
  })
  name: string;

  @Column({
    name: 'source_id',
    comment: '定时器记录来源id',
  })
  sourceId: string;

  @Column({
    name: 'job_id',
    comment: 'bull job 对象 id',
  })
  jobId: string;

  @Column({
    comment: '定时器功能作用',
  })
  action: string;

  @Column({
    comment: '定时器类型,0:默认定时器,1:前端展示,2:间隔定时器',
  })
  type: number;

  @Column({
    name: 'time_offsets',
    comment: '提醒时间偏移时间，形如：[{"unit":"days","num":1,"state":1}]',
  })
  timeOffsets: string;

  @Column({
    comment: '提醒时间，字符串数组，形如：["0","9","30","*","*","*"]',
  })
  cron: string;

  @Column({
    comment: '消息接收人',
  })
  receiver: string;

  @Column({
    comment: '状态; 1:开启, 0: 关闭; 默认值为 1',
  })
  state: number;

  @Column({
    comment: '定时器排序',
  })
  sort: number;
}
