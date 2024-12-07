import {
  Body,
  // Body,
  Controller,
  Del,
  Get,
  Inject,
  Post,
  Query
} from '@midwayjs/decorator';
import { CacheManager } from '@midwayjs/cache';
import { Context } from '@midwayjs/koa';
import { DirectoryService } from '../service/directory';
import { RedisService } from '@midwayjs/redis';
import { Directory } from '../entity';


@Controller('/directory')
export class DirectoryController {

  @Inject()
  ctx: Context;
  @Inject()
  directorySvc: DirectoryService
  @Inject()
  cache: CacheManager; // 依赖注入CacheManager
  @Inject()
  redisService: RedisService;

  // @Get('/getDirectory')
  // async getDirectory(@Query('query') query: Directory, @Query('page') page = 0, @Query('take') take = 20) {
  //   return await 
  // }
  @Post('/addDirectory')
  async addDirectory(@Body() directory: Directory) {
    return await this.directorySvc.addDirectory(directory)
  }
  @Get('/getDirectoryByPage')
  async getDirectoryByPage(@Query('query') query: Directory, @Query('page') page = 0, @Query('take') take = 20) {
    return await this.directorySvc.getDirectoryByPage(query, page, take)
  }

  @Del('/deleteDirectoryById')
  async deleteDirectoryById(@Body() { id }) {
    return await this.directorySvc.deleteDirectoryById(id)
  }
  // @Del('/deleteDirectorys')
  // async deleteFiles(@Body() { ids }) {
  //   return await this.directorySvc.deleteDirectory(id)
  // }

}
