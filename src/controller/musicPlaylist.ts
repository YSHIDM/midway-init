import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
} from '@midwayjs/decorator';
import { CacheManager } from '@midwayjs/cache';
import { Context } from '@midwayjs/koa';
import { MusicPlaylistService } from '../service/musicPlaylist';
import { RedisService } from '@midwayjs/redis';


@Controller('/musicPlaylist')
export class FileController {

  @Inject()
  ctx: Context;
  @Inject()
  musicPlaylistSvc: MusicPlaylistService
  @Inject()
  cache: CacheManager; // 依赖注入CacheManager
  @Inject()
  redisService: RedisService;

  @Post('/addMusicPlaylist')
  async addMusicPlaylist(@Body() fileGroup) {
    return await this.musicPlaylistSvc.addMusicPlaylist(fileGroup)
  }
  @Post('/addFilesToList/:id')
  async addFilesToList(@Param('id') id, @Body('names') names) {
    return await this.musicPlaylistSvc.addFilesToList(id, names)
  }
}
