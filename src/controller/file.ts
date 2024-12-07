import {
  Body,
  // Body,
  Controller,
  Del,
  Fields,
  Files,
  Get,
  Inject,
  Param,
  Post,
  Query
} from '@midwayjs/decorator';
import { CacheManager } from '@midwayjs/cache';
import { Context } from '@midwayjs/koa';
import { FileService } from '../service/file';
import { RedisService } from '@midwayjs/redis';
import { File } from '../entity';


@Controller('/file')
export class FileController {

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
    // console.log('fields :>>', fields)
    return await this.fileSvc.upload(files)
  }
  
  @Get('/getFile')
  async getFile() {
    return await this.fileSvc.getFile({})
  }
  @Get('/getFileByPage')
  async getFileByPage(@Query('query') query: File, @Query('page') page = 0, @Query('take') take = 20) {
    return await this.fileSvc.getFileByPage(query, page, take)
  }
  @Get('/recordFile')
  async recordFile(@Query('filePath') filePath: string) {
    return await this.fileSvc.recordFile(filePath)
  }
  @Get('/parseFiles')
  async parseFiles() {
    return await this.fileSvc.parseFiles()
  }
  @Get('/getDuplicateFile')
  async getDuplicateFile() {
    return await this.fileSvc.getDuplicateFile()
  }
  @Del('/deleteFile')
  async deleteFile(@Body() { filePath }) {
    return await this.fileSvc.deleteFile(filePath)
  }
  @Del('/deleteFiles')
  async deleteFiles(@Body() { filePaths }) {
    return await this.fileSvc.deleteFiles(filePaths)
  }
  @Get('/downloadFile/:id')
  async downloadFile(@Param('id') id: string) {
    return this.fileSvc.downloadFile(id)
  }
  /**
   * 
   * @param dirPath 参数改为文件id，通过id重新文件路径，更安全（添加为接口2）
   * @param type 
   * @returns 
   */
  @Get('/getTargetFileList')
  async getTargetFileList(@Query('dirPath') dirPath: string, @Query('type') type: 'children'|'top'|'topFile'|'topDir'|'allFile') {
    return this.fileSvc.getTargetFileList(dirPath, type)
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
