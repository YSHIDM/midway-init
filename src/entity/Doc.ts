/** 文档 */
import { Column, ForeignKey, BelongsTo, Table } from 'sequelize-typescript';
import { Dic } from './Dic';
import { Base } from './Base';

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'doc', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，goods
})
export class Doc extends Base {
  @Column({
    comment: '文档名称',
  })
  name: string;

  @ForeignKey(() => Dic)
  @Column({
    field: 'dic_id',
    comment: '字典id',
  })
  dicId: string;

  @BelongsTo(() => Dic)
  // 字典
  dic: Dic;

  @Column({
    comment: '排序',
  })
  sort: number;

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
