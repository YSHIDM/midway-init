import { BaseService } from './base';
import { CommonService } from './common';
import { Task } from '../entity/Task';
import { Inject, Provide } from '@midwayjs/decorator';
import { Op } from 'sequelize';
import { RedisService } from '@midwayjs/redis';
import { Context } from '@midwayjs/web';
// import { RedisServiceFactory } from '@midwayjs/redis';
// import { ITask } from '../interface';

@Provide()
export class TaskService extends BaseService {
  model;
  constructor() {
    super();
    this.model = Task;
  }
  @Inject()
  ctx: Context;
  @Inject()
  redisSvc: RedisService;
  @Inject()
  commonSvc: CommonService;

  // @Inject()
  // redisServiceFactory: RedisServiceFactory;

  async addTask(obj) {
    obj.id = this.getId('TASK');
    obj.index = 0;
    obj.node = 'planning';
    obj.isArchive = false;
    obj.isClose = false;
    obj.history = [{
      index: obj.index,
      node: obj.node,
      time: new Date(),
    }];
    console.log('this.ctx :>>', this.ctx)
    obj.creator = 'YSHI';
    return await Task.create(obj).then(d => d.toJSON());
  }

  async saveTask(obj) {
    let data;
    if (obj.id) {
      data = await this.update(obj);
    } else {
      data = await this.addTask(obj);
    }
    return { code: this.okCode, data };
  }
  // async batchAddTask(taskList) {
  //   const data = await this.batchAdd(taskList);
  //   return { code: this.okCode, data }
  // }
  async getPage({
    search = '',
    filter = {
      node: '',
      isArchive: false,
      isClose: false,
    },
    pageSize = 10,
    currentPage = 1,
  }) {
    const offset = (currentPage - 1) * pageSize;
    let where = {};
    if (search) {
      where = {
        name: {
          [Op.like]: `%${search}%`,
        },
      };
    }
    if (filter) {
      // task 的类型
      const { node, isArchive, isClose } = filter;
      if (node) {
        where[Op.and] = {
          node,
          isArchive,
          isClose,
        };
      } else if (isArchive) {
        where['isArchive'] = isArchive;
      } else if (isClose) {
        where['isClose'] = isClose;
      }
    }

    let data = await Task.findAndCountAll({
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
  async getTaskById(id) {
    const data = await this.byPk(id);
    return { code: this.okCode, data };
  }
  /**
   * 按 id 删除任务
   * @param {string} id 任务 id
   * @return {Promise<{code: number}>} 删除
   */
  async deleteTaskById(id) {
    await this.delete({ id });
    return { code: this.okCode };
  }
  /**
   * 任务执行到下一步
   * @param {string} id 任务 id
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async taskNext(id) {
    const nextNode = {
      planning: 'ongoing',
      ongoing: 'testing',
      testing: 'done',
    };
    let where = {};
    const task = await Task.findByPk(id, { raw: true }); // this.byPk(id)

    if (!nextNode[task.node]) {
      return { code: 8000, data: null };
    }
    const node = nextNode[task.node];
    task.history.push({ node, time: new Date() });
    where = { id, node, history: task.history };
    const data = await this.update(where);
    return { code: this.okCode, data };
  }
  /**
   * 完成任务
   * @param {string} id 任务 id
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async taskDone(id) {
    const node = 'done';
    const task = await this.byPk(id);
    task.history.push({ node, time: new Date() });
    const data = await this.update({ id, node, history: task.history });
    return { code: this.okCode, data };
  }
  /**
   * 关闭任务
   * @param {string} id 任务ID
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async closeTask(id) {
    const data = await this.update({ id, isClose: true });
    return { code: this.okCode, data };
  }
  /**
   * 还原任务
   * @param {string} id 任务ID
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async restoreTask(id) {
    const data = await this.update({ id, isClose: false });
    return { code: this.okCode, data };
  }
  /**
   * 归档任务
   * @param {string} id 任务ID
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async taskArchive(id) {
    const data = await this.update({ id, isArchive: true });
    return { code: this.okCode, data };
  }
  async getTaskByNode(node: string) {
    const data = await this.getList({ node, isArchive: false, isClose: false });
    return { code: this.okCode, data };
  }
  async getArchiveTask() {
    const data = await this.getList({ isArchive: true, isClose: false });
    return { code: this.okCode, data };
  }
  async getCloseTask() {
    const data = await this.getList({ isClose: true });
    return { code: this.okCode, data };
  }
}
