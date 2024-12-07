import { BaseService } from './base';
import { CommonService } from './common';
import { Inject, Provide } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';
// write

import { InjectEntityModel } from '@midwayjs/typeorm';
import { Dictionary } from '../entity';
import { FindManyOptions, FindOptionsWhere, Repository, } from 'typeorm';
import { ILogger } from '@midwayjs/logger';

@Provide()
export class DictionaryService extends BaseService<Dictionary> {

  @Inject()
  logger: ILogger;
  @Inject()
  redisSvc: RedisService;
  @Inject()
  commonSvc: CommonService;
  @InjectEntityModel(Dictionary)
  DictionaryModel: Repository<Dictionary>;
  @InjectEntityModel(Dictionary)
  declare model: Repository<Dictionary>

  constructor () {
    super();
  }
  async addDictionary(obj) {
    obj.id = this.getId('DIC');
    obj.creator = 'YSHI';
    return await this.model.save(obj)
  }
  async getDictionaryByPage(query: Dictionary, page, take = 20) {
    const skip = page * take
    const options: FindManyOptions<Dictionary> = {
      order: { name: 'ASC' },
      skip,
      take,
    }
    const where: FindOptionsWhere<Dictionary> = { name: query.name }

    options.where = where
    return this.DictionaryModel.findAndCount(options)
  }
  async deleteDictionary(id: string) {
    return await this.delete({ id })
  }
}
