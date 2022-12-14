import {
  Consumer,
  MSListenerType,
  RabbitMQListener,
  Inject,
  App,
} from '@midwayjs/decorator';
import { Context, Application } from '@midwayjs/rabbitmq';
import { ConsumeMessage } from 'amqplib';

@Consumer(MSListenerType.RABBITMQ)
export class FanoutUserConsumer {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Inject()
  logger;
  /* exclusive：有两个作用，一：当连接关闭时connection.close()该队列是否会自动删除；
      二：该队列是否是私有的private，如果不是排外的，可以使用两个消费者都访问同一个队列，没有任何问题，
      如果是排外的，会对当前队列加锁，其他通道channel是不能访问的，如果强制访问会报异常。
      原文链接：https://blog.csdn.net/blue_show/article/details/123697695 */
  @RabbitMQListener('abc', {
    exchange: 'logs',
    exchangeOptions: {
      type: 'fanout',
      durable: false,
    },
    exclusive: false,
    consumeOptions: {
      noAck: true,
    },
  })
  async gotData(msg: ConsumeMessage) {
    this.logger.info('test output1 =>', msg.content.toString('utf8'));
    // TODO
  }

  @RabbitMQListener('bcd', {
    exchange: 'logs',
    exchangeOptions: {
      type: 'fanout',
      durable: false,
    },
    exclusive: false,
    consumeOptions: {
      noAck: true,
    },
  })
  async gotData2(msg: ConsumeMessage) {
    this.logger.info('test output2 =>', msg.content.toString('utf8'));
    // TODO
  }
}
