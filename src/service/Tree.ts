import { Repository } from 'typeorm';
import { Tree } from '../entity';
import { BaseService } from './base';
import { Provide } from '@midwayjs/decorator';
import { getCode } from '../utils/stringtools';
import { InjectEntityModel } from '@midwayjs/typeorm';

/**
 * @example
 * const tree = new Tree(this.FileModel)
 * const fileList = await tree.getTargetFileList('', 'top')
 * 下一步，开发 recoveryNode getFecycledNode restoreNode deleteNode
 */
@Provide()
export class TreeService extends BaseService<Tree> {
  // 变成通用类注释掉 @InjectEntityModel(Tree) 即可
  @InjectEntityModel(Tree)
  declare model: Repository<Tree>
  constructor (model: Repository<Tree>) {
    super()
    this.model = model
  }
  async test() {
    console.log('this.ctx :>>', this.ctx)
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
  async getTargetNodeList(node: Tree, type: QueryType) {
    const { id, branch } = node
    const childrenBranch = branch ? branch + '/' + id : id

    let build = this.model
      .createQueryBuilder('t')

    switch (type) {
      case 'all':
        build = build.where('t.branch LIKE :childrenBranch', { childrenBranch: childrenBranch + '%' })
          .orWhere('t.id = :id', { id })
        break;
      case 'children':
        build = build.where('t.branch LIKE :childrenBranch', { childrenBranch: childrenBranch + '%' })
        break;
      case 'top':
        build = build.where('t.branch = :childrenBranch', { childrenBranch })
        break;
      case 'topLeaf':
        build = build.where('t.branch = :childrenBranch', { childrenBranch })
          .andWhere('is_leaf = true')
        break;
      case 'topBranch':
        build = build.where('t.branch = :childrenBranch', { childrenBranch })
          .andWhere('is_leaf = false')
        break;
      case 'allLeaf':
        build = build.where('t.branch LIKE :childrenBranch', { childrenBranch: childrenBranch + '%' })
          .andWhere('is_leaf = true')
        break;
    }

    return await build.getMany()
  }
  async addNode(newNode: Tree, parent: Tree) {
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
    const nodeList = await this.getTargetNodeList(node, 'all')
    console.log('nodeList :>>', JSON.stringify(nodeList, null, 2))
    const newBranch = parent.branch ? parent.branch + '/' + parent.id : parent.id
    const nodeListData = this.copyNodeData(nodeList, node.branch, newBranch)
    console.log('nodeListData :>>', JSON.stringify(nodeListData, null, 2))
     await this.model.save(nodeListData)
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
    const deletedVersion = getCode('DEL')
    const { id, branch } = node
    const childrenBranch = branch ? branch + '/' + id : id
    const sql = await this.model
      .createQueryBuilder()
      .update()
      .set({ deletedVersion })
      .where('branch LIKE :prefix', { prefix: childrenBranch + '%' })
      .execute()
    console.log('recoveryNode :>>', sql)
    const sql2 = await this.model
      .createQueryBuilder()
      .update()
      .set({ deletedVersion, showRecycle: true })
      .where('id = :prefix', { prefix: id })
      .execute()
    console.log('recoveryNode2 :>>', sql2)
  }
  async restoreNode(node: Tree) {
    const { deletedVersion } = node
    const sql = await this.model
      .createQueryBuilder()
      .update()
      .set({ deletedVersion: '', showRecycle: false })
      .where('deleted_version = :prefix', { prefix: deletedVersion })
      .execute()
    console.log('restoreNode :>>', sql)
  }
  async getRecycledNode() {
    const re = await this.model.findBy({ showRecycle: true })
    console.log('re :>>', JSON.stringify(re, null, 2))
  }
  /**
   * 修改节点 id 和 branch
   * @param nodeArray 节点列表
   * @param branch 节点路径
   * @param newBranch 新节点路径
   * @returns
   */
  copyNodeData(nodeArray, branch, newBranch) {
    const idMap = new Map()
    idMap.set(branch, newBranch)
    const nodeList = nodeArray.map(node => {
      const newId = getCode('tree')
      idMap.set(node.id, newId)
      return { ...node, id: newId, }
    })
    const regex = new RegExp([...idMap.keys()].join('|'), 'g');
    nodeList.forEach(node => {
      node.branch = node.branch.replaceAll(regex, matched => idMap.get(matched));
    })
    return nodeList
  }

  /**
   * 新增文件
   * 复制文件
   * 移动文件或文件夹
   * 文件或文件夹重命名
   * 删除文件
   * 回收文件或文件夹
   * 还原文件或文件夹
   * 回收站文件列表
   * is_dir->is_leaf true->false
   *
   */
}

type QueryType =
  'all'        // 111
  | 'children' // 111
  | 'top'      // 111
  | 'topLeaf'  // 111
  | 'topBranch'   // 111
  | 'allLeaf'  // 111

// type TreeObj = {
//   id: string
//   name: string
//   branch: string
//   isLeaf: boolean
//   deletedVersion: string
//   showRecycle: string
//   desc: string
//   creator: string
//   createdAt: Date
//   modifier: string
//   updatedAt: Date
// }

// export interface ObjectLiteral {
//   [key: string]: any;
// }
// export type QueryDeepPartialEntity<Tree> = _QueryDeepPartialEntity<ObjectLiteral extends Tree ? unknown : Tree>;
// type _QueryDeepPartialEntity<Tree> = {
//     [P in keyof Tree]?: (Tree[P] extends Array<infer U> ? Array<_QueryDeepPartialEntity<U>> : Tree[P] extends ReadonlyArray<infer U> ? ReadonlyArray<_QueryDeepPartialEntity<U>> : _QueryDeepPartialEntity<Tree[P]>) | (() => string);
// };
// interface Tree {
// }
// const obj: QueryDeepPartialEntity<Tree extends TreeObj ? Tree : unknown> = {
//   id: '',

// }
