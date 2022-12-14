import {
  Consumer,
  MSListenerType,
  RabbitMQListener,
  Inject,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/rabbitmq';
import { ConsumeMessage } from 'amqplib';

@Consumer(MSListenerType.RABBITMQ)
export class UserConsumer {
  @Inject()
  ctx: Context;

  @RabbitMQListener('tasks')
  async gotData(msg: ConsumeMessage) {
    console.info('msg :>>', msg.content.toString('utf8'));
    this.ctx.channel.ack(msg);
  }
}
