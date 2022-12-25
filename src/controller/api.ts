import { Inject, Controller, Post, Query, Get, Param } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { RabbitmqService } from '../service/rabbitmq';
import { UserService } from '../service/user';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;
  @Inject()
  rabbitmqService: RabbitmqService;

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

    this.rabbitmqService.sendToQueue('tasks', user);
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
}
