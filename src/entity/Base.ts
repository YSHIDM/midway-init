/** 个人物品 */
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript'

@Table
export class Base extends Model {
  @Column({
    comment: '创建人',
  })
  creator: string;

  @CreatedAt
  @Column({
    field: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @Column({
    comment: '修改人',
  })
  modifier: string;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    comment: '修改时间',
  })
  updatedAt: Date;
}
