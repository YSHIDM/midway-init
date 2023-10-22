// 用户 另 userInfo name，phone，email
import { Column, Table } from 'sequelize-typescript';
import { Base } from './Base';

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'user', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，Spaces
})
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
