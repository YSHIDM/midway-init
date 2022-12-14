/** 个人物品 */
import { Table, Column } from 'sequelize-typescript';
import { Base } from './Base';

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'schedule', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，goods
})
export class Schedule extends Base {
  // @PrimaryKey
  // id: string;

  @Column({
    comment: '定时器名称',
  })
  name: string;

  @Column({
    field: 'source_id',
    comment: '定时器记录来源id',
  })
  sourceId: string;

  @Column({
    comment: '定时器功能作用',
  })
  action: string;

  @Column({
    comment: '定时器类型',
  })
  type: string;

  @Column({
    field: 'time_offsets',
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
    comment: '定时器描述',
  })
  desc: string;

  @Column({
    comment: '定时器排序',
  })
  index: number;
}
