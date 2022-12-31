import { Context } from '@midwayjs/web';
import { customAlphabet } from 'nanoid';
import { Inject, Provide } from '@midwayjs/decorator';
import { Op } from 'sequelize';
import { RedisService } from '@midwayjs/redis';


@Provide()
export class BaseService {
  model; // 继承
  okCode: 2000;
  constructor() {
    this.okCode = 2000;
  }
  @Inject()
  ctx: Context;
  @Inject()
  redisService: RedisService;

  /**
   * 获取一个 id
   * @param {string} prefix id 前缀
   * @return {string} id
   */
  getCode(alphabet: string): (prefix: string, length?: number) => string {
    return (prefix: string, length = 10) => {
      const customNanoid = customAlphabet(alphabet, length - prefix.length);
      return prefix + customNanoid();
    };
  }
  /**
   * 获取主键
   * @param {string} prefix 前缀
   * @return {string} id
   */
  getId(prefix) {
    return this.getCode(
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'
    )(prefix);
  }
  /**
   * 批量新增
   * @param {any[]} objArray 数据列表
   * @return {Promise<any[]>} 批量保存的数据
   */
  async batchAdd(objArray) {
    return await this.model
      .bulkCreate(objArray)
      .then(data => data.map(d => d.toJSON()));
  }

  /**
   * 按 id 查询
   * @param {string} id 主键
   * @return {Promise<any>} model数据
   */
  byPk(id) {
    return this.model.findByPk(id);
  }
  /**
   * 按条件查询数据
   * @param {any} where 条件
   * @return {Promise<any>} model数据
   */
  async getData(where = void 0) {
    return this.model.findOne({ where, raw: true });
  }
  /**
   * 按条件查询数据列表
   * @param {any} where 条件
   * @param {any} extraOptions 用于排序
   * @return {Promise<any[]>} model数据列表
   */
  async getList(where = void 0, extraOptions = void 0): Promise<any[]> {
    const order = [];
    if (extraOptions) {
      const { sort } = extraOptions;
      if (sort) {
        order.push(sort);
      }
    }
    order.push(['updatedAt', 'DESC']);
    const query = {
      where: undefined,
      raw: true,
      order,
    };
    if (where) {
      query.where = where;
    }
    return this.model.findAll(query);
  }
  /**
   * 修改记录
   * @param {any} obj 新的记录
   * @return {Promise<any>} model数据
   */
  async update(obj) {
    // TODO: 修改人
    obj.modifier = this.ctx.state.user.nickname;
    return this.model
      .update(obj, {
        where: {
          id: {
            [Op.eq]: obj.id,
          },
        },
        // individualHooks: true,
        returning: true,
      })
      .then(ds => ds[1].map(i => i.toJSON())[0]);
  }
  /**
   * 按条件删除记录
   * @param {any} where 条件
   * @return {Promise<number>} model数据
   */
  async delete(where) {
    if (!where || Object.keys(where).length === 0) {
      return 0;
    }
    return this.model.destroy({ where });
  }
  resultData(data?, code = this.okCode) {
    return { code, data };
  }
  // /**
  //  * 包装 app.messenger.sendToAgent
  //  * @param action 事件名称
  //  * @param data 事件参数
  //  */
  // sendToAgent(action, data) {
  //   this.app.messenger.sendToAgent(action, [data, this.ctx.state.user]);
  // }

  // @Inject()
  // redisServiceFactory: RedisServiceFactory;

  // async(params: type) {

  // }

  // async invoke() {
  //   await this.redisService.set('foo', 'bar');
  //   // const redis1 = await this.redisServiceFactory.get('instance1');
  //   // const redis2 = await this.redisServiceFactory.get('instance3');
  //   const result = await this.redisService.get('foo');
  //   console.info('result :>>', result)
  //   // result => bar
  // }

  // async getUser2() {
  //   //获取缓存内容
  //   let result = await this.cache.get(`name`);
  //   return result;
  // }

  // async reset() {
  //   await this.cache.reset(); // 清空对应 store 的内容
  // }
}
