import { Repository } from 'typeorm';
import { Tree } from '../entity/Tree.entity';
import { BaseService } from './base';
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { TreeService } from './Tree';
import { Tag } from '../entity';

/**
 * @example
 * const tree = new Tree(this.FileModel)
 * const fileList = await tree.getTargetFileList('', 'top')
 */
@Provide()
export class TagService extends BaseService<Tag> {
  @InjectEntityModel(Tag)
  declare model: Repository<Tag>

  // @Inject()
  treeService: TreeService;
  constructor () {
    super()
  }
  /**
   * 获取指定目录下文件或文件夹
   * @param {string} branch 目标文件夹
   * @param {'all'|'children'|'top'|'topLeaf'|'topBranch'|'allLeaf'} type
   * type|解释
   * -|-
   * all|全部
   * children|子文件及文件夹
   * top|顶级子文件及文件夹
   * topLeaf|顶级子文件
   * topBranch|顶级子文件夹
   * allLeaf|全部文件
   */
  async getTargetNodeList(node: Tag, type: QueryType) {
    const treeService = new TreeService(this.model)
    const list = await treeService.getTargetNodeList(node, type)
    console.log('list :>>', JSON.stringify(list.map(node => [node.id, node.branch]), null, 2))
  }
  async addNode(newNode: Tag, parent: Tag) {
    if (parent.isLeaf) {
      this.model.save({
        id: parent.id,
        isLeaf: false,
      })
    }
    newNode.branch = parent.branch + '/' + parent.id
    this.model.save(newNode)
  }
  async copyNode(node: Tree, parent: Tree) {

    const treeService = new TreeService(this.model)
    const list = await treeService.copyNode(node, parent)
    console.log(list)
  }
  async moveNode(node: Tree, parent: Tree) {
    const newBranch = parent.branch ? parent.branch + '/' + parent.id : parent.id
    const { id, branch } = node
    const childrenBranch = branch ? branch + '/' + id : id
    const re = await this.model
      .createQueryBuilder()
      .update()
      .set({ branch: () => `REPLACE(branch, '${node.branch}', '${newBranch}')` })
      .where('branch LIKE :childrenBranch', { childrenBranch: childrenBranch + '%' })
      .orWhere('id = :prefix', { prefix: id })
      .execute()
    console.log('re :>>', re)
  }
  // async renameNode(node: Tree) {
  //   this.model.save({id: node.id, name: node.n})
  // }
  async deleteNode(node: Tree) {
    const { id, branch } = node
    const childrenBranch = branch ? branch + '/' + id : id
    const sql = this.model
      .createQueryBuilder()
      .delete()
      .where('branch LIKE :prefix', { prefix: childrenBranch + '%' })
      .orWhere('id = :prefix', { prefix: id })
      .getSql()
    console.log('deleteNode :>>', sql)
  }
  async recoveryNode(node: Tree) {
    const deletedVersion = ''
    const { id, branch } = node
    const childrenBranch = branch ? branch + '/' + id : id
    const sql = this.model
      .createQueryBuilder()
      .update()
      .set({ deletedVersion })
      .where('branch LIKE :prefix', { prefix: childrenBranch + '%' })
      .getSql()
    console.log('recoveryNode :>>', sql)
    const sql2 = this.model
      .createQueryBuilder()
      .update()
      .set({ deletedVersion, showRecycle: true })
      .where('id = :prefix', { prefix: id })
      .getSql()
    console.log('recoveryNode2 :>>', sql2)
  }
  async restoreNode(node: Tree) {
    const { deletedVersion } = node
    const sql = this.model
      .createQueryBuilder()
      .update()
      .set({ deletedVersion: '', showRecycle: false })
      .where('deleted_version = :prefix', { prefix: deletedVersion })
      .getSql()
    console.log('restoreNode :>>', sql)
  }
  async getFecycledNode() {
    return this.model.findBy({ showRecycle: true })
  }
}

type QueryType =
  'all'        // 111
  | 'children' // 111
  | 'top'      // 111
  | 'topLeaf'  // 111
  | 'topBranch'   // 111
  | 'allLeaf'  // 111
