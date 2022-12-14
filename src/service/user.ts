import { BaseService } from './base';
import { CommonService } from './common';
import { Inject, Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { RedisService } from '@midwayjs/redis';
import { User } from '../entity/User';
import { RabbitmqService } from './rabbitmq';
// import { RedisServiceFactory } from '@midwayjs/redis';

@Provide()
export class UserService extends BaseService {
  model;
  constructor() {
    super();
    this.model = User;
  }

  @Inject()
  redisService: RedisService;
  @Inject()
  commonSvc: CommonService;
  @Inject()
  rabbitmqService: RabbitmqService;

  // @Inject()
  // redisServiceFactory: RedisServiceFactory;

  async addUser(obj) {
    obj.id = this.getId('SPC');
    obj.creator = 'YSHI';
    return await User.create(obj).then(d => d.toJSON());
  }

  async saveUser(obj) {
    let data;
    if (obj.id) {
      data = await this.update(obj);
    } else {
      data = await this.addUser(obj);
    }
    data.password = void 0;
    await this.rabbitmqService.sendToQueue('tasks', { hello: 'world' });
    return { code: this.okCode, data };
  }

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
  async invoke() {
    await this.redisService.set('foo', 'bar');
    // const redis1 = await this.redisServiceFactory.get('instance1')
    // const redis2 = await this.redisServiceFactory.get('instance3')
    const result = await this.redisService.get('foo');
    console.info('result :>>', result);
    // result => bar
  }

  // async getUser2() {
  //   //获取缓存内容
  //   let result = await this.cache.get(`name`)
  //   return result
  // }

  // async reset() {
  //   await this.cache.reset(); // 清空对应 store 的内容
  // }
  // @Get('/get/public-key')
  getPublicKey() {
    const { publicKey, privateKey } = this.commonSvc.getKeyPair();
    this.redisService.set(this.commonSvc.md5(publicKey), privateKey);
    return { code: this.okCode, data: publicKey };
  }
}
