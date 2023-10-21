import { BullQueue, InjectQueue } from '@midwayjs/bull';
import {
  WSController,
  OnWSConnection,
  Inject,
  OnWSMessage,
  WSEmit,
  Controller,
  Get,
  App,
} from '@midwayjs/decorator';
import { Context, Application as SocketApplication } from '@midwayjs/socketio';

@Controller('/')
@WSController('/')
export class HelloSocketController {
  @Inject()
  ctx: Context;

  @App('socketIO')
  socketApp: SocketApplication;

  @InjectQueue('test')
  testQueue: BullQueue;

  @OnWSConnection()
  async onConnectionMethod() {
    console.log('on client connect', this.ctx.id);
  }

  @Get('/2')
  @OnWSMessage('myEvent')
  @WSEmit('myEventResult')
  async gotMessage() {
    // 立即执行这个任务
    await this.testQueue?.runJob({
      aaa: 1,
      bbb: 2,
    });
    // this.testQueue.addListener('test1', () => console.log(123));
    await this.testQueue.add({
      a: 123
    }, {
      repeat: { cron: '0 36 1 * * *' },
    });
    console.log('123 :>>', 123);

    // { repeat: { cron: '15 3 * * *' } }
    // this.socketApp.of('/123').emit('myEventResult', 'everyone');
    // this.socketApp.of('/').emit('myEventResult', 'everyone222');
    // this.socketApp.of('/1').emit('myEventResult', 'everyone11');
    return 'hello world!'; // 这里将 hello world 字符串返回给客户端
  }
}
