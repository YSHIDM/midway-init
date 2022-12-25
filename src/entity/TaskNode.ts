/** 个人物品 */
import { Table, Column } from 'sequelize-typescript';
import { Base } from './Base';

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'task_node', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，goods
})
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
