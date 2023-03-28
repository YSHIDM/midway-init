import { Inject, Controller, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { IGetUserResponse } from '../interface';
import { ScheduleService } from '../service/schedule';

@Controller('/queueJob')
export class ScheduleController {
  @Inject()
  ctx: Context;

  @Inject()
  scheduleService: ScheduleService;

  @Post('/addQueueJob')
  async getUser(@Body() schedule: any): Promise<IGetUserResponse> {
    const data = await this.scheduleService.setSchedule(schedule);
    return { success: true, message: 'OK', data };
  }
}
