// 即时任务：立即去做
import { Column, Entity } from 'typeorm'
import { Base } from './Base.entity'

@Entity()
export class Todo extends Base {
  @Column({
    comment: '标题',
  })
  title: string;

  @Column({
    name: 'plan_time',
    comment: '计划时间,生成cron',
  })
  planTime: string;

  @Column({
    name: 'cycle_value',
    comment: '重复间隔数值',
  })
  cycleValue: number;
  @Column({
    name: 'cycle_unit',
    comment: '循环单位;1:秒,2:分,3:时,4:日,5:月,6:年',
  })
  cycleUnit: number;
  @Column({
    name: 'period_value',
    comment: '持续数值',
  })
  periodValue: number;
  @Column({
    name: 'period_unit',
    comment: '持续单位;1:秒,2:分,3:时,4:日,5:月,6:年',
  })
  periodUnit: number;

  @Column({
    name: 'is_abiding',
    comment: '是否常驻',
  })
  isAbiding: boolean;

  @Column({
    name: 'is_archive',
    comment: '是否归档',
  })
  isArchive: boolean;
}
