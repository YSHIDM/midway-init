import {
  // Body,
  Controller,
  Fields,
  Files,
  Get,
  Inject,
  Post
} from '@midwayjs/decorator';
import { CacheManager } from '@midwayjs/cache';
import { Context } from '@midwayjs/koa';
import { FileService } from '../service/file';
import { RedisService } from '@midwayjs/redis';


@Controller('/file')
export class GoodsController {

  @Inject()
  ctx: Context;
  @Inject()
  fileSvc: FileService
  @Inject()
  cache: CacheManager; // 依赖注入CacheManager
  @Inject()
  redisService: RedisService;

  @Post('/upload')
  async upload(@Files() files, @Fields() fields) {
    // console.log('files :>>', files)

    // fieldName:'file'
    // filename:'123.txt'
    // mimeType:undefined
    // Symbol(_ext):'.txt'
    console.log('fields :>>', fields)
    return await this.fileSvc.upload(files)
  }
  @Get('/getFile')
  async getFile() {
    return await this.fileSvc.getFile({})
  }
  // @Post('/saveFile')
  // async saveGoods(@Body() file) {
  //   return await this.fileSvc.saveFile(file);
  // }


  // upload
  // download

  // getFolderTree
  // getTopFile
  // getSubFile
  // moveFile
  // recycleFile
  // restoreFile
  // renameFile
  // modifyTags(id tags)
  // encrypt(id,level, secret)
  // deleteFile(id)
  // parseLocalFile(filePath)









  // @Post('/batchAddGoods')
  // async batchAddGoods(@Body() goodsList) {
  //   return await this.goodsSvc.batchAdd(goodsList);
  // }
  // @Post('/getPage')
  // async getPage(@Body() query) {
  //   return await this.goodsSvc.getPage(query);
  // }

}
