// 字典：
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from './Base.entity'
import { Space } from './Space.entity';

@Entity()
export class Goods extends Base {
  @Column({
    comment: '物品名称',
  })
  name: string;

  @ManyToOne(() => Space, space => space.goodsList)
  @JoinColumn({ name: 'main_id' })
  space: Space;

  @Column({
    type: 'simple-array',
    comment: '标签数组，从dic 中选择',
  })
  tags: string[];
}
