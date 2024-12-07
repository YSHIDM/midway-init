import { Inject, Controller, Post, Query, Get, Param, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { IGetUserResponse } from '../interface';
// import { RabbitmqService } from '../service/rabbitmq.ts1';
import { UserService } from '../service/user';
import { DBTestService } from '../service/dbTest';
import { TreeService } from '../service/Tree';
import { TagService } from '../service/tag';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;
  @Inject()
  dbTestService: DBTestService;
  @Inject()
  treeService: TreeService;
  @Inject()
  tagService: TagService;
  // @Inject()
  // rabbitmqService: RabbitmqService;

  @Post('/get_user')
  async getUser(@Query('uid') uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
  @Post('/get_user1')
  async getUser1(@Query('uid') uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
  @Get('/get_user')
  async getUser2(@Query('uid') uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
  @Get('/3/:uid')
  async getUser3(): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid: this.ctx.params.uid });

    // this.rabbitmqService.sendToQueue('tasks', user);
    return { success: true, message: 'OK', data: user };
  }
  @Get('/:uid')
  async getUser4(@Param('uid') uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
  @Get('/123')
  async name() {
    return { code: 2000, msg: '123', data: { a: 123 } }
  }
  @Get('/test')
  async testDB() {
    return await this.dbTestService.test1()
  }
  @Post('/Tree')
  async testTree(@Body('parentId') parentId: string, @Body('id') id: string) {
    // const root = await this.treeService.getData({
    //   id: parentId
    // })
    // await this.treeService.addNode({
    //   id: this.treeService.getId('tree'),
    //   name,
    //   isLeaf: true,
    //   deletedVersion: '',
    //   showRecycle: false,
    //   desc: '',
    //   creator: 'ys',
    //   createdAt: new Date(),
    //   modifier: 'ys',
    //   updatedAt: new Date()
    // }, root)
    await this.treeService.test()
    // let s = await this.treeService.getData({ id })
    // const p = await this.treeService.getData({ id: parentId })

    // await this.treeService.getTargetNodeList(s, 'all')
    // await this.treeService.getTargetNodeList(p,'children')
    // await this.treeService.getTargetNodeList(s,'top')
    // await this.treeService.getTargetNodeList(s,'topBranch')
    // await this.treeService.getTargetNodeList(s,'topLeaf')
    // await this.treeService.getTargetNodeList(s,'allLeaf')

    // await this.treeService.copyNode(s, p)
    // const list = await this.treeService.getTargetNodeList(p,'children')
    // console.log('list :>>', JSON.stringify(list, null, 2))


    // await this.treeService.moveNode(s, p)
    // await this.treeService.deleteNode(s)

    // await this.treeService.recoveryNode(s)
    // await this.treeService.getRecycledNode()
    // s = await this.treeService.getData({ id })
    // await this.treeService.restoreNode(s)

    // -------------
    // let tag = await this.tagService.getData({ id })
    // await this.tagService.getTargetNodeList(tag, 'all')

  }
}
