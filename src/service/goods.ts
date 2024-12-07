import { BaseService } from '../service/base';
import { CommonService } from './common';
import { Goods } from '../entity';
import { Inject, Provide } from '@midwayjs/decorator';

import { RedisService } from '@midwayjs/redis';
// import { RedisServiceFactory } from '@midwayjs/redis';
// import { IGoods } from '../interface';

@Provide()
export class GoodsService extends BaseService<Goods> {
  // model;
  constructor () {
    super();
    // this.model = Goods;
  }
  @Inject()
  redisSvc: RedisService;
  @Inject()
  commonSvc: CommonService;

  // @Inject()
  // redisServiceFactory: RedisServiceFactory;

  async addGoods(obj) {
    obj.id = this.getId('GOD');
    obj.creator = 'YSHI';
    return await this.model.save(obj)
  }

  async saveGoods(obj) {
    let data;
    if (obj.id) {
      data = await this.update(obj);
    } else {
      data = await this.addGoods(obj);
    }
    return { code: this.okCode, data };
  }
  async batchAddGoods(goodsList) {
    const data = await this.batchAdd(goodsList);
    return { code: this.okCode, data };
  }
  async deleteGoodsById(id) {
    await this.delete({ id });
    return { code: this.okCode };
  }
  async getGoodsById(id) {
    const data = await this.byPk(id);
    return { code: this.okCode, data };
  }
  async getPage({ search = '', filter = {}, pageSize = 10, currentPage = 1, }: {
    search?: string; filter?: any; pageSize?: number; currentPage: number; type: string;
  }) {
    const skip = (currentPage - 1) * pageSize;

    let where = {};
    if (search) {
    //   where = {
    //     name: {
    //       [Op.like]: `%${search}%`,
    //     },
    //   };
    }
    if (filter) {
      // const { } = filter;
      // if() {}
      // if() {}
    }

    let data = await this.model.findAndCount({

      where,
      take: pageSize,
      skip,
      // order: [['updatedAt', 'DESC']],
      // distinct: true, // 去除从表数据行数
    }).then(this.commonSvc.getPageHandler(pageSize, currentPage));
    if (!data) {
      data = { rows: [], count: 0, currentPage, totalPages: 0 };
    }
    return { code: this.okCode, data };
  }

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
