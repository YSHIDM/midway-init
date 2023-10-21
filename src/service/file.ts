import { BaseService } from './base';
import { CommonService } from './common';
import { Context } from '@midwayjs/koa';
import { File } from '../entity/File';
import { Config, Inject, Provide } from '@midwayjs/decorator';
import { Op } from 'sequelize';
import { RedisService } from '@midwayjs/redis';
// import { UploadOptions } from '@midwayjs/upload';
// import * as path from 'path';
import { parseFile } from '../utils/fileTools';

@Provide()
export class FileService extends BaseService {
  model;
  constructor() {
    super();
    this.model = File;
  }
  @Inject()
  ctx: Context;
  @Inject()
  redisSvc: RedisService;
  @Inject()
  commonSvc: CommonService;
  @Config('uploadPath')
  uploadPath: string;

  async addFile(obj) {
    obj.id = this.getId('FILE');
    obj.creator = 'YSHI';
    return await this.model.create(obj).then(d => d.toJSON());
  }
  async upload(files: { filename: string; data: string }[]) {
    let data = await Promise.all(files.map(async file => {
      // const filePath = path.join(this.config.tmpdir, file.filename)
      // file.data.pipe(createWriteStream(filePath))
      return await parseFile(file.data, this.uploadPath+file.filename)
    }))
    return { code: this.okCode, data };
  }
  async getFile(query) {
    return { name: '123' }
  }


  /**
 * 指定目录下文件或文件夹
 * @param {string} logic_path 目标文件夹
 * @param {'all'|'children'|'top'|'topFile'|'topDir'|'allFile'} type 查询类型
 */
  async getTargetFileList(logic_path: string, type: QueryType = 'all'):
    Promise<{ [Op.or]: Query[] } | Query> {
    const subfolderOption: Query = {
      logic_path: { [Op.regexp]: `^${logic_path}/` },
      deleted_version: null,
      isDir: void 0,
    };
    // 顶级目录
    const topLevel: Query = {
      logic_path,
      deleted_version: null,
      isDir: void 0,
    };
    const logic_path_reg = escapeRegExp(logic_path)
    const topReg = `^${logic_path_reg}/[^/]+$`;
    let query: { [Op.or]: Query[] } | Query = { [Op.or]: [subfolderOption, topLevel] };
    switch (type) {
      case 'children':
        topLevel.isDir = false;
        break;
      case 'top':
        subfolderOption.logic_path[Op.regexp] = topReg;
        subfolderOption.isDir = true;
        topLevel.isDir = false;
        break;
      case 'topFile':
        topLevel.isDir = false;
        query = topLevel
        break;
      case 'topDir':
        subfolderOption.logic_path[Op.regexp] = topReg;
        subfolderOption.isDir = true;
        query = subfolderOption;
        break;
      case 'allFile':
        subfolderOption.isDir = false;
        topLevel.isDir = false;
        break;
    }
    return query
  }
}
type Query = {
  logic_path: string | { [Op.regexp]: string };
  deleted_version: null | string;
  isDir: undefined | boolean;
}
type QueryType = 'all' | 'children' | 'top' | 'topFile' | 'topDir' | 'allFile'
