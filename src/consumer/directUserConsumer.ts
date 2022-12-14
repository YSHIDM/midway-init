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
export class DirectUserConsumer {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Inject()
  logger;

  @RabbitMQListener('direct1', {
    exchange: 'direct_logs',
    exchangeOptions: {
      type: 'direct',
      durable: false,
    },
    routingKey: '123',
    exclusive: true,
    consumeOptions: {
      noAck: true,
    },
  })
  async gotData(msg: ConsumeMessage) {
    console.log('Direct1 msg :>>', msg.content.toString('utf8'));
    // TODO: https://midwayjs.org/docs/extensions/rabbitmq
  }
  @RabbitMQListener('', {
    exchange: 'direct_logs',
    exchangeOptions: {
      type: 'direct',
      durable: false,
    },
    routingKey: '123',
    exclusive: true,
    consumeOptions: {
      noAck: true,
    },
  })
  async gotData2(msg: ConsumeMessage) {
    console.log('Direct2 msg :>>', msg.content.toString('utf8'));
    // TODO: https://midwayjs.org/docs/extensions/rabbitmq
  }
  @RabbitMQListener('', {
    exchange: 'direct_exchange2',
    exchangeOptions: {
      type: 'direct',
      durable: false,
    },
    routingKey: '234',
    exclusive: true,
    consumeOptions: {
      noAck: true,
    },
  })
  async gotData3(msg: ConsumeMessage) {
    console.log('Direct3 msg :>>', msg.content.toString('utf8'));
    // TODO: https://midwayjs.org/docs/extensions/rabbitmq
  }
}
