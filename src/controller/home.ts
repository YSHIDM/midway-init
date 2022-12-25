import { Controller, Get, Inject } from '@midwayjs/decorator';
import { QueueJobService } from '../service/queueJob';
import { RabbitmqService } from '../service/rabbitmq';
import { JwtMiddleware } from '../middleware/jwt.middleware';

@Controller('/home', { middleware: [JwtMiddleware] })
export class HomeController {
  @Inject()
  queueJobService: QueueJobService;
  @Inject()
  rabbitmqService: RabbitmqService;
  @Get('/tom')
  async home() {
    const user = {
      name: 'tom',
      age: 24,
    };
    // this.rabbitmqService.sendToQueue('direct1', user);
    this.rabbitmqService.sendToQueue('q1', user);
    this.rabbitmqService.sendToQueue('direct_logs', user);
    // this.rabbitmqService.sendToQueue('abc', user);
    // this.rabbitmqService.sendToQueue('bcd', user);
    // this.rabbitmqService.sendToQueue('tasks', user);
    // const data = await this.queueJobService.addSchedule({});
    return { success: true, message: 'OK', data: 123 };
  }
}
