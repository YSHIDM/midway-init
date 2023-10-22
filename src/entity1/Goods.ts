/** 个人物品 */
import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Space } from './Space';
import { Base } from './Base';
const { ARRAY, STRING } = DataType;

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'goods', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，goods
})
export class Goods extends Base {
  @Column({
    comment: '物品名称',
  })
  name: string;

  @ForeignKey(() => Space)
  @Column({
    field: 'space_id',
    comment: '存储位置id',
  })
  spaceId: string;

  @BelongsTo(() => Space)
  // 存储位置
  space: string;

  @Column({
    comment: '标签数组，档案id',
    type: ARRAY(STRING),
  })
  tags: string[];

  @Column({
    comment: '描述',
  })
  desc: string;
}
