import * as bull from '@midwayjs/bull';
import * as bullBoard from '@midwayjs/bull-board';
import * as cache from '@midwayjs/cache';
import * as crossDomain from '@midwayjs/cross-domain';
import * as info from '@midwayjs/info';
import * as jwt from '@midwayjs/jwt';
import * as koa from '@midwayjs/koa';
import * as rabbitmq from '@midwayjs/rabbitmq';
import * as redis from '@midwayjs/redis';
import * as sequelize from '@midwayjs/sequelize';
import * as socketio from '@midwayjs/socketio';
import * as upload from '@midwayjs/upload';
import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle, Inject } from '@midwayjs/core';
import { join } from 'path';
// import { JwtMiddleware } from './middleware/jwt.middleware';
// import { ScheduleService } from './service/schedule';
// import { UserService } from './service/user';

@Configuration({
  imports: [
    koa,
    bull,
    bullBoard,
    redis,
    socketio,
    sequelize,
    cache,
    jwt,
    info,
    crossDomain,
    rabbitmq,
    upload,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: koa.Application;
  @Inject()
  bullFramework: bull.Framework;
  // @App('bull')
  // bullApp: bull.Application;

  async onReady() {
    // this.app.useMiddleware([AuthenticationMiddleware, JwtMiddleware]);
    // console.log(111111, 'onReady');
    // // 在这个阶段，装饰器队列还未创建，使用 API 提前手动创建队列，装饰器会复用同名队列
    // const queue = this.bullFramework.createQueue('test2');
    // console.log('queue.name :>>', queue)
    // // 通过队列手动执行清理
    // await queue.obliterate({ force: true });
    // // queue.process(data => console.log('data123 :>>', data.data));
    // const userService: UserService = await this.app.applicationContext.getAsync(
    //   'userService'
    // );
    // console.log(userService.getUser({ uid: '123' }));
    // // this.bullApp.useMiddleare( /*中间件*/);
    // // this.bullApp.useFilter( /*过滤器*/);
  }
  async onServerReady() {
    // const scheduleService: ScheduleService =
    //   await this.app.applicationContext.getAsync('scheduleService');
    // await scheduleService.loadSchedule();
    // console.log(22222222222, 'onServerReady');
    // // 获取 Processor 相关的队列
    // const testQueue = this.bullFramework.getQueue('test2');
    // // 立即执行这个任务
    // // const job =
    // await testQueue?.runJob({ a: 'asd' }, { delay: 10000 });
    // // 更新进度
    // await job.progress(60);
    // // 获取进度
    // const progress = await job.process();
    // // => 60
    // const state = await job.getState();
    // // state => 'delayed' 延迟状态
    // // state => 'completed' 完成状态
  }
}
