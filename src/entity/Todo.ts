/** 个人物品 */
import { Table, Column } from 'sequelize-typescript';
import { Base } from './Base';

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'todo', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，goods
})
export class Todo extends Base {
  @Column({
    comment: '标题',
  })
  title: string;

  @Column({
    field: 'plan_time',
    comment: '计划时间,生成cron',
  })
  planTime: string;

  @Column({
    field: 'cycle_value',
    comment: '重复间隔数值',
  })
  cycleValue: number;
  @Column({
    field: 'cycle_unit',
    comment: '循环单位;1:秒,2:分,3:时,4:日,5:月,6:年',
  })
  cycleUnit: number;
  @Column({
    field: 'period_value',
    comment: '持续数值',
  })
  periodValue: number;
  @Column({
    field: 'period_unit',
    comment: '持续单位;1:秒,2:分,3:时,4:日,5:月,6:年',
  })
  periodUnit: number;

  @Column({
    field: 'is_abiding',
    comment: '是否常驻',
  })
  isAbiding: boolean;

  @Column({
    field: 'is_archive',
    comment: '是否归档',
  })
  isArchive: boolean;
}
