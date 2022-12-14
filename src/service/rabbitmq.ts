import {
  Provide,
  Scope,
  ScopeEnum,
  Init,
  Autoload,
  Destroy,
  Config,
} from '@midwayjs/decorator';
import * as amqp from 'amqp-connection-manager';

@Autoload()
@Provide()
@Scope(ScopeEnum.Singleton) // Singleton 单例，全局唯一（进程级别）
export class RabbitmqService {
  private connection: amqp.AmqpConnectionManager;

  private channelWrapper;
  @Config('rabbitmq')
  rabbitConf: { url: amqp.ConnectionUrl };

  @Init()
  async connect() {
    // 创建连接，你可以把配置放在 Config 中，然后注入进来
    this.connection = amqp.connect(this.rabbitConf.url);

    // 创建 channel
    this.channelWrapper = this.connection.createChannel({
      json: true,
      // setup: function (channel) {
      //   return Promise.all([
      //     // 绑定队列
      //     channel.assertQueue('tasks', { durable: true }),
      //   ]);
      // },
    });
  }

  // 发送消息
  public async sendToQueue(queueName: string, data: any) {
    return this.channelWrapper.sendToQueue(queueName, data);
  }

  @Destroy()
  async close() {
    await this.channelWrapper.close();
    await this.connection.close();
  }
}
