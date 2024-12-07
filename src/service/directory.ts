import { BaseService } from './base';
import { CommonService } from './common';
// import { Context } from '@midwayjs/koa';
import { Inject, Provide } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';
// write

import { InjectEntityModel } from '@midwayjs/typeorm';
import { Directory } from '../entity';
import { FindManyOptions, FindOptionsWhere, Repository, } from 'typeorm';
import { ILogger } from '@midwayjs/logger';

@Provide()
export class DirectoryService extends BaseService<Directory> {
  // model;
  constructor () {
    super();
    // this.model = Directory;
  }
  // @Inject()
  // ctx: Context;
  @Inject()
  logger: ILogger;
  @Inject()
  redisSvc: RedisService;
  @Inject()
  commonSvc: CommonService;

  @InjectEntityModel(Directory)
  DirectoryModel: Repository<Directory>;
  async addDirectory(obj) {
    obj.id = this.getId('DIC');
    obj.creator = 'YSHI';
    console.log('obj :>>', JSON.stringify(obj, null, 2))
    return this.DirectoryModel.save(obj)
    // this.DirectoryModel.save()
  }
  async getDirectoryByPage(query: Directory, page, take = 20) {
    const skip = page * take
    const options: FindManyOptions<Directory> = {
      order: { name: 'ASC' },
      skip,
      take,
    }
    const where: FindOptionsWhere<Directory> = { name: query.name }

    options.where = where
    return this.DirectoryModel.findAndCount(options)
  }
  async deleteDirectoryById(id: string) {
    return await this.delete({ id })
  }
}
