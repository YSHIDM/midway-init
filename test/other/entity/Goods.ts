// JoinColumn, ManyToOne, OneToMany,
import { Column, Entity, PrimaryColumn, Tree, TreeChildren, TreeParent } from 'typeorm'

@Entity('goods3')
@Tree('materialized-path')
export class Goods {

  @PrimaryColumn()
  id!: string

  @Column({
    comment: '物品名称',
  })
  name!: string;

  @TreeChildren()
  children?: Goods[];

  @TreeParent()
  parent?: Goods;

  // @ManyToOne(() => Goods, (goods: Goods) => goods.children)
  // @JoinColumn({ name: 'parentId' })
  // parent?: Goods;

  // @OneToMany(() => Goods, (goods: Goods) => goods.parent)
  // children!: Goods[];
}
