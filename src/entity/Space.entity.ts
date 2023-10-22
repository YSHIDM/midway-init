// 字典：
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Base } from './Base.entity'
import { Goods } from './Goods.entity';

@Entity()
export class Space extends Base {

  @Column({
    comment: '空间名称',
  })
  name: string;

  @Column({
    comment: '二维码',
  })
  qrcode: string;

  @OneToMany(() => Goods, goods => goods.space)
  goodsList: Goods[]

  @ManyToOne(() => Space, space => space.children)
  @JoinColumn({ name: 'main_id' })
  parent: Space

  @OneToMany(() => Space, space => space.parent)
  children: Space[]

  @Column({
    type: 'simple-array',
    comment: '标签数组，从dic 中选择',
  })
  tags: string[];

}
