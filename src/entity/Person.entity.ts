// 人员：人员详细信息与隐私，姓名、性别、年龄、地址、身份证、手机号、生日、qq、邮箱、等
import { Column, Entity } from 'typeorm'
import { Base } from './Base.entity'

@Entity()
export class Person extends Base {
  @Column({
    comment: '人名',
  })
  name: string;
}
