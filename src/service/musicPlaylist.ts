import { BaseService } from './base';
import { CommonService } from './common';
// import { Context } from '@midwayjs/koa';
import { Config, Inject, Provide } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';
// import { UploadOptions } from '@midwayjs/upload';
// import * as path from 'path';

import { InjectEntityModel } from '@midwayjs/typeorm';
import { FileGroup, FileToFileGroup } from '../entity';
import { Repository, } from 'typeorm';
import { ILogger } from '@midwayjs/logger';
import { FileService } from './file';

@Provide()
export class MusicPlaylistService extends BaseService<FileGroup> {
  // @Inject()
  // ctx: Context;
  @Inject()
  logger: ILogger;
  @Inject()
  redisSvc: RedisService;
  @Inject()
  commonSvc: CommonService;
  @Inject()
  fileSvc: FileService;
  @Config('uploadPath')
  uploadPath: string;

  @InjectEntityModel(FileGroup)
  FileGroupModel: Repository<FileGroup>;
  @InjectEntityModel(File)
  FileModel: Repository<File>;
  @InjectEntityModel(FileToFileGroup)
  FileToFileGroupModel: Repository<FileToFileGroup>;

  // model;
  // constructor () {
  //   super();
  //   this.model = this.FileGroupModel;
  // }
  async addMusicPlaylist(obj) {
    obj.id = this.getId('MPL');
    obj.creator = 'YSHI';
    return this.FileGroupModel.save(obj)
  }

  // fileGroup
  async addFilesToList(id, names) {
    let fileGroup = await this.FileGroupModel.findOneBy({ id })
    const files = await this.fileSvc.getFilesByNameList(names)

    // 不生成id
    // fileGroup.files = files
    // await this.FileGroupModel.save(fileGroup)
    const ffgList = files.map(f => ({
      id: this.getId('FFG'),
      fileId: f.id,
      fileGroupId: fileGroup.id,
    }))
    await this.FileToFileGroupModel.save(ffgList)
    // const obj = {
    //   id: this.getId('FFG--'),
    //   file: { id: files[0].id },
    //   fileGroup: { id: fileGroup.id },
    // }
    // await this.FileToFileGroupModel.save(obj)

    return await this.getFileGroupWithFiles(id)
  }

  async getFileGroupWithFiles(id) {
    return await this.FileGroupModel.findOne({
      relations: {
        // fileToFileGroups: true,
        files: true,
      },
      where: {
        id
      }
    })
  }
  // 文件夹加入歌单
}
// type QueryType = 'children' | 'top' | 'topFile' | 'topDir' | 'allFile'
