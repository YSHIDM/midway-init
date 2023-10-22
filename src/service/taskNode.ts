import { BaseService } from './base';
import { CommonService } from './common';
import { TaskNode } from '../entity1/TaskNode';
import { Inject, Provide } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class TaskNodeService extends BaseService {
  model
  constructor() {
    super();
    this.model = TaskNode
  }
  @Inject()
  redisSvc: RedisService;
  @Inject()
  commonSvc: CommonService;

  // @Inject()
  // redisServiceFactory: RedisServiceFactory;

  /**
   * 添加待办节点
   * @param {any} obj 任务
   * @return {Promise<any>} 待办节点
   */
  async addTaskNode(obj) {
    obj.id = this.getId('TKNO')
    obj.creator = 'YSHI'
    return this.model.create(obj).then(d => d.toJSON())
  }
  async saveTaskNode(obj) {
    let data = null
    if (obj.id) {
      data = await this.update(obj)
    } else {
      data = await this.addTaskNode(obj)
    }
    return { code: 2000, data }
  }

  async getAllTaskNode() {
    const data = await this.getList(null, { sort: ['sort', 'ASC'] })
    return { code: 2000, data }
  }
  async getAllTaskNodeMap() {
    const data = await this.getList()
    const allTaskNodeMap = new Map()
    data.forEach(taskNode => {
      allTaskNodeMap.set(taskNode.name, taskNode.alias || taskNode.title)
    })
    return allTaskNodeMap
  }
}
