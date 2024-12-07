import {
  Entity,
  Column,
} from "typeorm"
import { Tree } from './Tree.entity'

@Entity('tag')
export class Tag extends Tree {
  @Column()
  name: string
}
