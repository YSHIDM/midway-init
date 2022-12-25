/** 个人物品 */
import { Table, Column, DataType } from 'sequelize-typescript';
import { Base } from './Base';

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'task', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，goods
})
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
    field: 'plan_time',
    comment: '计划时间,生成cron',
  })
  planTime: string;

  @Column({
    comment: '节点名称',
  })
  node: 'planning' | 'ongoing' | 'testing' | 'done';

  @Column({
    comment: '历史记录',
    type: DataType.JSON,
  })
  history: any;

  @Column({
    field: 'is_archive',
    comment: '是否归档',
  })
  isArchive: boolean;

  @Column({
    field: 'is_close',
    comment: '是否关闭',
  })
  isClose: boolean;
}

// interface History {
//   node: string;
//   time: number;
// }
// [{
//   index: obj.index,
//   node: obj.node,
//   time: new Date(),
// }]
