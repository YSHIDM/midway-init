// 用户：添加 好友 等字段?
import { Column, Entity } from 'typeorm'
import { Base } from './Base.entity'

@Entity()
export class User extends Base {
  @Column({
    comment: '别名',
  })
  nickname: string;

  @Column({
    comment: '密码',
  })
  password: string;
}
