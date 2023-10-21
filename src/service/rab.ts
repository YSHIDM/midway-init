import { Provide, Scope, ScopeEnum, Init, Config } from '@midwayjs/decorator';
import { Connection, Channel, Message, Options } from 'amqplib';
import * as rabbitmq from 'amqplib';

interface IRabbitConf {
  hostname: string;
  prot: number;
  username: string;
  password: string;
  queueName: string[];
}

@Scope(ScopeEnum.Singleton) // singleon 单例模式 全局唯一 ，进程级别
@Provide('rabbitmqService1')
export class RabbitmqService {
  public config: Options.Connect;
  public connection: Connection;
  public channel: Channel;
  private isAsert: Record<string, boolean>;
  private queueNames: string[];
  private isCheck: boolean;

  // 注意这个地方， 使用的是config文件中的配置，所以记得要在config中配置
  @Config('rabbit')
  rabbitConf: IRabbitConf;

  @Init()
  async connect() {
    console.log('正在连接rabbitmq');

    this.config = Object.assign(
      {
        protocol: 'amqp',
        hostname: '49.232.26.20',
        port: 5672,
        username: 'fgc1101',
        password: 'fgc19941030',
        frameMax: 0,
        heartbeat: 0,
        vhost: '/',
      },
      this.rabbitConf
    );

    console.log(this.rabbitConf);
    this.connection = await rabbitmq.connect(this.config);
    await this.creatChannel();
    this.queueNames = this.rabbitConf.queueName || [];
    this.isAsert = {};
    this.isCheck = false;
  }

  async checkQueue() {
    if (!this.channel) {
      await this.creatChannel();
    }
    for (const queueName of this.queueNames) {
      const checkQueue = await this.channel.checkQueue(queueName);
      if (checkQueue?.queue === queueName) this.isAsert[queueName] = true;
    }
    this.isCheck = true;
  }

  close() {
    this.connection.close();
  }

  async creatChannel() {
    this.channel = await this.connection.createChannel();
  }

  async push(
    queueName: string,
    msg: string,
    option?: { priority?: number; durable?: boolean; siId?: string }
  ) {
    const options = {
      priority: 0,
      durable: true,
      headers: { time: 0, siId: option?.siId },
      ...option,
    };
    if (!this.queueNames.includes(queueName)) {
      console.log(`you did not define default queueName ${queueName}`);
      return new Error(`you did not define default queueName ${queueName}`);
    }

    if (!this.isCheck) {
      await this.checkQueue();
    }
    if (!this.isAsert[queueName]) {
      this.channel.assertQueue(queueName, { durable: options.durable });
      this.isAsert[queueName] = true;
    }
    this.channel.sendToQueue(queueName, Buffer.from(msg), options);
  }

  async pull(queueName: string): Promise<false | Message> {
    if (!this.queueNames.includes(queueName)) {
      throw new Error(`you did not default queueName ${queueName}`);
    }

    if (!this.isCheck) {
      await this.checkQueue();
    }
    if (!this.isAsert[queueName]) {
      await this.channel.assertQueue(queueName, { durable: true });
      await this.channel.prefetch(1);
      this.isAsert[queueName] = true;
    }
    return this.channel.get(queueName, { noAck: false });
  }

  async repush(msg: Message) {
    const { fields, properties, content } = msg;
    if (!this.isCheck) {
      await this.checkQueue();
    }
    if (!this.isAsert[fields.routingKey]) {
      this.channel.assertQueue(fields.routingKey, { durable: true });
      this.channel.prefetch(1);
      this.isAsert[fields.routingKey] = true;
    }
    const { headers } = properties;

    this.channel.ack(msg);
    headers.time++;
    this.channel.sendToQueue(fields.routingKey, content, properties);
  }

  ack(msg: Message) {
    this.channel.ack(msg);
  }

  nack(msg: Message) {
    this.channel.nack(msg);
  }
}
