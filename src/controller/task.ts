import {
  // App,
  Body,
  // Config,
  Controller,
  Inject,
  // MidwayFrameworkType,
  Post
} from '@midwayjs/decorator';
// import { Application as SocketApplication } from '@midwayjs/socketio';
// import { CacheManager } from '@midwayjs/cache';
// import { CommonService } from '../service/common';
// import { Context } from '@midwayjs/koa';
// import { RedisService } from '@midwayjs/redis';
import { TaskService } from '../service/task';
// import { Application } from '@midwayjs/web';
@Controller('/task')
export class UserController {


  // @App()
  // app: Application;
  // @Inject()
  // ctx: Context;
  // @App(MidwayFrameworkType.WS_IO)
  // socketApp: SocketApplication;
  @Inject()
  taskService: TaskService
  // @Inject()
  // cache: CacheManager; // 依赖注入CacheManager
  // @Inject()
  // redisService: RedisService;
  // @Inject()
  // commonService: CommonService;
  // @Config('statusCode')
  // statusCode;

  @Post('/saveTask')
  async saveTask(@Body() task) {
    return await this.taskService.saveTask(task)
  }
  @Post('/getTaskById')
  async getTaskById(@Body() { id }) {
    return await this.taskService.getTaskById(id)
  }
  @Post('/deleteTaskById')
  async deleteTaskById(@Body() { id }) {
    return await this.taskService.deleteTaskById(id)
  }
  @Post('/taskNext')
  async taskNext(@Body() { id }) {
    return await this.taskService.taskNext(id)
  }
  @Post('/taskDone')
  async taskDone(@Body() { id }) {
    return await this.taskService.taskDone(id)
  }
  @Post('/closeTask')
  async closeTask(@Body() { id }) {
    return await this.taskService.closeTask(id)
  }
  @Post('/restoreTask')
  async restoreTask(@Body() { id }) {
    return await this.taskService.restoreTask(id)
  }
  @Post('/taskArchive')
  async taskArchive(@Body() { id }) {
    return await this.taskService.taskArchive(id)
  }

  @Post('/getPage')
  async getPage(@Body() query: {
    search?: string;
    filter?: {
      node: string,
      isArchive: boolean,
      isClose: boolean
    };
    pageSize?: number;
    currentPage: number;
  }) {
    return await this.taskService.getPage(query)
  }
  @Post('/getTaskByNode')
  async getTaskByNode(@Body() { node }) {
    return await this.taskService.getTaskByNode(node)
  }
  @Post('/getArchiveTask')
  async getArchiveTask() {
    return await this.taskService.getArchiveTask()
  }
  @Post('/getCloseTask')
  async getCloseTask() {
    return await this.taskService.getCloseTask()
  }
}
