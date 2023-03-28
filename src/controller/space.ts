
import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
// import { Context } from '@midwayjs/koa';
import { SpaceService } from '../service/space';
// import { CacheManager } from '@midwayjs/cache';
// import { RedisService } from '@midwayjs/redis';

@Controller('/space')
export class SpaceController {

  // @Inject()
  // ctx: Context;
  @Inject()
  spaceSvc: SpaceService
  // @Inject()
  // cache: CacheManager; // 依赖注入CacheManager
  // @Inject()
  // redisService: RedisService;

  @Post('/saveSpace')
  async saveSpace(@Body() space) {
    return await this.spaceSvc.saveSpace(space);
  }
  @Post('/batchAddSpace')
  async batchAddSpace(@Body() spaceList) {
    return await this.spaceSvc.batchAdd(spaceList);
  }
  @Post('/deleteSpaceById')
  async deleteSpaceById(@Body() { id }) {
    return await this.spaceSvc.deleteSpaceById(id);
  }
  @Post('/getSpaceById')
  async getSpaceById(@Body() { id }) {
    console.log('id :>>', id)
    return await this.spaceSvc.getSpaceById(id)
  }
  @Post('getSpaceWithGoodsById')
  async getSpaceWithGoodsById(@Body() { id }) {
    return await this.spaceSvc.getSpaceWithGoodsById(id)
  }
  @Post('/getPage')
  async getPage(@Body() query) {
    return await this.spaceSvc.getPage(query);
  }
}
