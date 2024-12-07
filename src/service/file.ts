import { BaseService } from './base';
import { CommonService } from './common';
// import { Context } from '@midwayjs/koa';
import { Config, Inject, Provide } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';
// import { UploadOptions } from '@midwayjs/upload';
// import * as path from 'path';
import * as fs from 'fs';
// write
import { deleteFile, dirTreeToList, parseFile, simpleParseFile } from '../utils/fileTools';

import { InjectEntityModel } from '@midwayjs/typeorm';
import { File } from '../entity';
import { FindManyOptions, FindOptionsWhere, ILike, Repository, } from 'typeorm';
import { ILogger } from '@midwayjs/logger';
// import { TreeService } from './tree';

@Provide()
export class FileService extends BaseService<File> {
  // @Inject()
  // ctx: Context;
  @Inject()
  logger: ILogger;
  @Inject()
  redisSvc: RedisService;
  @Inject()
  commonSvc: CommonService;
  @Config('uploadPath')
  uploadPath: string;

  @InjectEntityModel(File)
  FileModel: Repository<File>;

  // Tree 示例
  async test<T>(model: Repository<T>): Promise<T[]> {

    this.FileModel
      .createQueryBuilder()
      .update()
      .set({ tags: ()=> '', title: ()=> '' })
      .where('t.branch LIKE :prefix', { prefix: 'branch' + '%' })
      .orWhere('t.id = :prefix', { prefix: 'id' })
      .printSql()

    // const tree = new TreeService(this.FileModel)
    // const fileList = await tree.getTargetNodeList(, 'top')
    // console.log(fileList)
    const files = await this.byPk('')
    console.log(files)
    return model.find()
  }

  async addFile(obj) {
    obj.id = this.getId('FILE');
    obj.creator = 'YSHI';
    return this.FileModel.create(obj)
  }
  async upload(files: { filename: string; data: string }[]) {
    let fileList = await Promise.all(files.map(async file => {
      // const filePath = path.join(this.config.tmpdir, file.filename)
      // file.data.pipe(createWriteStream(filePath))
      // console.log('this.uploadPath+file.filename :>>', this.uploadPath + file.filename)
      return await parseFile(file.data)
    }))
    const data = await this.batchAdd(fileList)
    return { code: this.okCode, data }
  }
  async downloadFile(id: string) {
    const file = await this.FileModel.findOneBy({ id })
    // 设置响应体
    const fileStream = fs.createReadStream(file.filePath)

    if (!file.mime) {
      // const { fileTypeFromStream } = await import('file-type');
      const { fileTypeFromStream } = await (eval('import("file-type")') as Promise<typeof import('file-type')>);

      const { mime } = await fileTypeFromStream(fileStream)
      file.mime = mime
      await this.FileModel.save({ id, mime })
    }
    this.ctx.body = fileStream
    this.ctx.set({
      'Content-Type': file.mime,
      'Content-Disposition': `attachment; filename=${encodeURIComponent(file.filename)}`,
      'Content-Transfer-Encoding': 'binary',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });
    return this.ctx.body;
  }
  async getFile(query) {
    return this.FileModel.find(query)
  }
  async getFileByPage(query: File, page, take = 20) {
    const skip = page * take
    const options: FindManyOptions<File> = {
      order: { filePath: 'ASC' },
      skip,
      take,
    }
    const where: FindOptionsWhere<File> = { isDir: false }
    if (query?.filename) {
      where.lowerName = ILike(`%${query.filename}%`)
    }
    if (query?.dirPath) {
      where.dirPath = query.dirPath
    }

    options.where = where
    return this.FileModel.findAndCount(options)
  }
  /**
   * 记录文件夹下所有子文件
   * @param filePath
   * @returns
   */
  async recordFile(filePath) {
    // const set = new Set()
    // for (let i = 0; i < 350; i++) {
    //   const id = this.getId('FILE')
    //   if (set.has(id)) {
    //     console.log('id :>>', id)
    //   } else {
    //     set.add(id)
    //   }
    // }
    // console.log(set)
    this._recordFile(filePath)
    return { code: this.okCode };
  }
  async _recordFile(filePath) {
    const errorList = []
    await dirTreeToList(filePath, async file => {
      const data = simpleParseFile(file)
      // if (data.error) {
      //   errorList.push(file)
      // } else {
      //   data.id = this.getId('FILE')
      // }
      data.id = this.getId('FILE')
      console.log('data :>>', data)
      // write('D:/files.txt', JSON.stringify(data, null, 2))
      await this.FileModel.save(data)
    }, async dir => {
      console.log(dir)
      const data = simpleParseFile(dir, true)
      data.id = this.getId('FILE')
      console.log('data :>>', data)
      await this.FileModel.save(data)
    })
    // await this.FileModel.save(fileList)
    console.log('errorList :>>', errorList)
  }
  /**
   * 获取文件详细信息，如音乐作家等
   * @returns
   */
  async parseFiles() {
    const take = 3000
    const skip = 0 * take
    this.FileModel.find({
      // where: { isDir: false, md5: IsNull() },
      where: { isDir: false, isParse: false },
      order: { filePath: 'ASC' },
      skip,
      take,
    }).then(async files => {
      for (const file of files) {
        const data = await parseFile(file.filePath)
          .catch(() => console.log(file.filePath))
        data.id = file.id
        data.isParse = true
        console.log('data :>>', data)
        this.FileModel.save(data)
      }
      console.log(files.length)
      console.log('ok')
    })
    this.FileModel.find({

    })
    return { code: this.okCode };
  }
  /**
   * 获取重复文件
   * @returns
   */
  async getDuplicateFile() {
    const files = await this.FileModel
      .query(`SELECT *
      FROM file f
      WHERE f.md5 in (
        SELECT md5
        FROM file
        where md5 is NOT NULL
        GROUP BY md5
        HAVING COUNT(*) >= 2
      )
      ORDER BY "f"."md5" DESC`);
    console.log(files.length)
    const data = {}
    for (const file of files) {
      if (data[file.md5]) {
        data[file.md5].push(file.file_path)
      } else {
        data[file.md5] = [file.file_path]
      }
    }

    // // 按文件夹查询
    return { group: Object.keys(data).length, length: files.length, data }
  }
  /**
   * 删除文件
   */
  async deleteFile(filePath: string) {
    await deleteFile(filePath)
    return await this.FileModel.delete({ filePath })
  }
  /**
   * 删除文件
   * @param filePaths
   * @returns
   */
  async deleteFiles(filePaths: string) {
    for (const file of filePaths) {
      this.deleteFile(file)
    }
    return { code: this.okCode }
  }
  /**
   * 获取指定目录下文件或文件夹
   * @param {string} dirPath 目标文件夹
   * @param {QueryType} type 查询类型；子文件及文件夹，顶级子文件及文件夹，顶级子文件，顶级子文件夹，
   */
  async getTargetFileList(dirPath: string, type: QueryType) {
    console.log('dirPath :>>', dirPath)
    console.log('type :>>', type)

    let filesBuild = this.FileModel
      .createQueryBuilder('file')
    // .andWhere()
    // .getMany()

    switch (type) {
      case 'children':
        filesBuild = filesBuild.where('file.dir_path LIKE :prefix', { prefix: `${dirPath}%` })
        break;
      case 'top':
        filesBuild = filesBuild.where('file.dir_path = :prefix', { prefix: `${dirPath}` })
        break;
      case 'topFile':
        filesBuild = filesBuild.where('file.dir_path = :prefix', { prefix: `${dirPath}` })
          .andWhere('is_dir = false')
        break;
      case 'topDir':
        filesBuild = filesBuild.where('file.dir_path = :prefix', { prefix: `${dirPath}` })
          .andWhere('is_dir = true')
        break;
      case 'allFile':
        filesBuild = filesBuild.where('file.dir_path LIKE :prefix', { prefix: `${dirPath}%` })
          .andWhere('is_dir = false')
        break;
    }

    return await filesBuild.getMany()
  }

  /**
   * 按文件名获取文件信息
   * @param names 文件名列表
   * @returns
   */
  async getFilesByNameList(names) {
    return this.FileModel.createQueryBuilder('file')
      .where("file.fileName LIKE ANY(:names)", { names: names.map(name => `%${name}%`) })
      .getMany();
  }
}
type QueryType = 'children' | 'top' | 'topFile' | 'topDir' | 'allFile'
