import { BaseService } from '../service/base';
import { CommonService } from './common';
import { Goods } from '../entity1/Goods';
import { Inject, Provide } from '@midwayjs/decorator';
import { Op } from 'sequelize';
import { RedisService } from '@midwayjs/redis';
import { Space } from '../entity1/Space';
// import { RedisServiceFactory } from '@midwayjs/redis';
// import { ISpace } from '../interface';

@Provide()
export class SpaceService extends BaseService {
  model;
  constructor() {
    super();
    this.model = Space;
  }
  @Inject()
  redisSvc: RedisService;
  @Inject()
  commonSvc: CommonService;

  // @Inject()
  // redisServiceFactory: RedisServiceFactory;

  async addSpace(obj) {
    obj.id = this.getId('SPC');
    obj.creator = 'YSHI';
    return await Space.create(obj).then(d => d.toJSON());
  }
  async deleteSpace(where) {
    return await this.delete(where);
  }

  async saveSpace(obj) {
    let data;
    if (obj.id) {
      data = await this.update(obj);
    } else {
      data = await this.addSpace(obj);
    }
    return { code: this.okCode, data };
  }
  async batchAddSpace(spaceList) {
    const data = await this.batchAdd(spaceList);
    return { code: this.okCode, data };
  }
  async deleteSpaceById(id) {
    await this.delete({ id });
    return { code: this.okCode };
  }
  async getSpaceById(id) {
    const data = await this.byPk(id);
    return { code: this.okCode, data };
  }
  async getSpaceWithGoodsById(id) {
    return await this.getSpaceWithGoods({ id });
  }
  async getSpaceWithGoods(where) {
    const data = await Goods.findOne({
      where,
      include: [Goods, Space],
      // [{
      //   model: Goods,
      //   required: false, // left join
      // }],
      order: [['updatedAt', 'DESC']],
    }).then(d => d.toJSON());
    return { code: this.okCode, data };
  }
  async getPage({
    search = '',
    filter = {},
    pageSize = 10,
    currentPage = 1,
  }: {
    search?: string;
    filter?: any;
    pageSize?: number;
    currentPage: number;
    type: string;
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
      // const { } = filter;
      // if() {}
      // if() {}
    }

    let data = await Space.findAndCountAll({
      where,
      include: [Goods, Space],
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
}
