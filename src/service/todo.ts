// 新增
// 删
// 修改-归档
// 修改-标记为常驻
// 查询全部常驻与临时
// 查询归档待办
//
//
import { BaseService } from './base';
import { CommonService } from './common';
import { Todo } from '../entity/Todo';
import { Inject, Provide } from '@midwayjs/decorator';
@Provide()
export class TodoService extends BaseService {
  model
  constructor() {
    super();
    this.model = Todo
  }
  // @Inject()
  // redisSvc: RedisService;
  @Inject()
  commonSvc: CommonService;
  /**
   * 添加待办节点
   * @param {any} obj 任务
   * @return {Promise<any>} 待办节点
   */
  async addTodo(obj) {
    obj.id = this.getId('TODO')
    obj.isAbiding = false
    obj.isArchive = false
    obj.creator = 'YSHI'
    return this.model.create(obj).then(d => d.toJSON())
  }
  async saveTodo(obj) {
    let data
    if (obj.id) {
      data = await this.update(obj);
    } else {
      data = await this.addTodo(obj);
    }
    return { code: this.okCode, data }
  }
  async getPage({
    search = '',
    filter = {
      isArchive: false,
      isAbiding: false,
    },
    pageSize = 10,
    currentPage = 1
  }) {
    const offset = (currentPage - 1) * pageSize;
    let where = { ...filter }

    let data = await Todo.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [['updatedAt', 'DESC']],
      distinct: true, // 去除从表数据行数
    }).then(this.commonSvc.getPageHandler(pageSize, currentPage));
    if (!data) {
      data = { rows: [], count: 0, currentPage, totalPages: 0 };
    }
    return { code: this.okCode, data };
  }
  /**
   * 按 id 获取待办
   * @param {string} id 待办 id
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async getTodoById(id: string) {
    const data = await this.byPk(id)
    return { code: this.okCode, data }
  }
  /**
   * 按 id 删除待办
   * @param {string} id 待办 id
   * @return {Promise<{code: number}>} 删除
   */
  async deleteTodoById(id: string) {
    await this.delete({ id })
    return { code: this.okCode }
  }
  /**
   * 归档待办
   * @param {string} id 待办ID
   * @return {Promise<{code: number, data: any}>} 待办
   */
  async todoArchive(id: string) {
    const data = await this.update({ id, isArchive: true })
    return { code: this.okCode, data }
  }
  async todoAbide(id: string) {
    const data = await this.update({ id, isAbiding: true })
    return { code: this.okCode, data }
  }
  // async getOngoingTodo() {
  //   const data = await this.getList({ isArchive: false, abiding: false })
  //   return { code: this.okCode, data }
  // }
  // async getAbidingTodo() {
  //   const data = await this.getList({ abiding: true })
  //   return { code: this.okCode, data }
  // }
  // async getArchiveTodo() {
  //   const data = await this.getList({ isArchive: true, abiding: false })
  //   return { code: this.okCode, data }
  // }
}
