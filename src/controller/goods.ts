
import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { Context } from 'egg';
import { GoodsService } from '../service/goods';
import { CacheManager } from '@midwayjs/cache';
import { RedisService } from '@midwayjs/redis';

@Controller('/goods')
export class GoodsController {

  @Inject()
  ctx: Context;
  @Inject()
  goodsSvc: GoodsService
  @Inject()
  cache: CacheManager; // 依赖注入CacheManager
  @Inject()
  redisService: RedisService;

  @Post('/saveGoods')
  async saveGoods(@Body() goods) {
    return await this.goodsSvc.saveGoods(goods);
  }
  @Post('/batchAddGoods')
  async batchAddGoods(@Body() goodsList) {
    return await this.goodsSvc.batchAdd(goodsList);
  }
  @Post('/getPage')
  async getPage(@Body() query) {
    return await this.goodsSvc.getPage(query);
  }

}
