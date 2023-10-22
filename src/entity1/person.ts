import { Table, Model, Column } from 'sequelize-typescript';
@Table({
  timestamps: true, // 自动维护时间
  tableName: 'person', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，goods
})
export class Person extends Model {
  @Column
  name: string;
}
