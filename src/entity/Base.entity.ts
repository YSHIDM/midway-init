import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm'
import { CONSTANT } from '../constant/CONSTANT'
/** 空字符串 */
export const E = CONSTANT.EMPTY

@Entity()
export class Base {

  @PrimaryColumn()
  id: string

  // @Column({
  //   name: 'is_delete',
  //   comment: '软删除',
  // })
  // isDelete: boolean;

  // @Column({
  //   name: 'deleted_version',
  //   comment: '删除版本号',
  // })
  // deletedVersion: string;

  @Column({
    comment: '描述',
    nullable: true,
  })
  desc: string;

  @Column({
    nullable: true
  })
  creator: string

  @CreateDateColumn({ name: 'created_at', default: () => 'NOW()' })
  createdAt: Date;

  @Column({
    nullable: true
  })
  modifier: string

  @UpdateDateColumn({ name: 'updated_at', default: () => 'NOW()' })
  updatedAt: Date
}
