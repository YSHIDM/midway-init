import { BaseService } from './base';
import { CommonService } from './common';
// import { Context } from '@midwayjs/koa';
import { Inject, Provide } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';
// write

import { InjectEntityModel } from '@midwayjs/typeorm';
// import { Dictionary } from '../entity/Dictionary.entity';
import { Repository, } from 'typeorm';
import { ILogger } from '@midwayjs/logger';
import { Tag } from '../entity';

@Provide()
export class DBTestService extends BaseService<Tag> {

  @Inject()
  logger: ILogger;
  @Inject()
  redisSvc: RedisService;
  @Inject()
  commonSvc: CommonService;

  @InjectEntityModel(Tag)
  TagTreeModel: Repository<Tag>;


  async test1() {
    const tgt1 = await this.TagTreeModel.findOneBy({id: 'TGTvKusIvZUwJp3thdY3'});
    const tt2 = {
      id: this.getId('TGT'),
      name: '电影',
      children: [tgt1]
    }
    await this.TagTreeModel.save(tt2);
    // const tree = await this.TagTreeModel.manager.getTreeRepository(Tag).findTrees()
    // console.log('tree :>>', JSON.stringify(tree, null, 2))
    return 'ok';
  }
  // async getDictionaryByPage(query: Dictionary, page, take = 20) {
  //   const skip = page * take
  //   const options: FindManyOptions<Dictionary> = {
  //     order: { name: 'ASC' },
  //     skip,
  //     take,
  //   }
  //   const where: FindOptionsWhere<Dictionary> = { name: query.name }

  //   options.where = where
  //   return this.DictionaryModel.findAndCount(options)
  // }
  // async deleteDictionary(id: string) {
  //   return await this.delete({ id })
  // }
}
