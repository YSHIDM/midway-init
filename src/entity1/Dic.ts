/** 存储空间 */
import { Column, HasMany, Table } from 'sequelize-typescript';
import { Doc } from './Doc';
import { Base } from './Base';

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'dic', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，goods
})
export class Dic extends Base {
  @Column({
    comment: '字典名称',
  })
  name: string;

  @HasMany(() => Doc, 'dic_id')
  // 文档数组
  docs: Doc[];

  @Column({
    comment: '类型,如：颜色，季节，方向等描述文字',
  })
  type: string;

  @Column({
    field: 'is_delete',
    comment: '软删除',
  })
  isDelete: boolean;

  @Column({
    comment: '描述',
  })
  desc: string;
}
