/** 存储空间 */
import { Table, Column, HasMany, DataType } from 'sequelize-typescript';
import { Goods } from './Goods';
import { Base } from './Base';
const { ARRAY, STRING } = DataType;

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'space', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，Spaces
})
export class Space extends Base {
  @Column({
    comment: '父id',
  })
  pid: string;

  @Column({
    comment: '空间名称',
  })
  name: string;

  @Column({
    comment: '二维码',
  })
  qrcode: string;

  @HasMany(() => Space, 'pid')
  // 标签数组，档案id
  spaceList: Space[];

  @HasMany(() => Goods)
  // 标签数组，档案id
  goodsList: Goods[];

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
