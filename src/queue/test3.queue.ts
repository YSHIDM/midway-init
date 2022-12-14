// src/queue/test.queue.ts
import { Processor, IProcessor, Context } from '@midwayjs/bull';
import { Inject } from '@midwayjs/decorator';
import * as dayjs from 'dayjs';
import { UserService } from '../service/user';

@Processor('test3', {
  removeOnComplete: 3, // 成功后移除任务记录，最多保留最近 3 条记录
  removeOnFail: 10, // 失败后移除任务记录
})
export class TestProcessor implements IProcessor {
  @Inject()
  ctx: Context;
  @Inject()
  userService: UserService;

  async execute() {
    console.log('test3:', dayjs().format('mm:ss'), ' :>>');
    // console.log('this.ctx.job :>>', this.ctx.job);
    // ...
    // const user = await this.userService.getUser({ uid: '1111' });
    // console.log('user :>>', user);
  }
}
