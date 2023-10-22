import { Entity, PrimaryColumn, Column } from 'typeorm'
import { CONSTANT } from '../constant/CONSTANT'
/** 空字符串 */
export const E = CONSTANT.EMPTY

@Entity()
export class Base {

  @PrimaryColumn()
  id: string

  @Column({
    name: 'is_delete',
    comment: '软删除',
  })
  isDelete: boolean;

  @Column({
    name: 'delete_version',
    comment: '删除版本号',
  })
  deleteVersion: string;

  @Column({
    comment: '描述',
  })
  desc: string;

  @Column({
    nullable: true
  })
  creator: string
  @Column({
    name: 'created_at',
  })
  createdAt: string
  @Column({
    nullable: true
  })
  modifier: string
  @Column({
    name: 'updated_at',
  })
  updatedAt: string
}
