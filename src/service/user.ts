import { BaseService } from './base';
import { CommonService } from './common';
import { Config, Inject, Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { RedisService } from '@midwayjs/redis';
import { User } from '../entity/User';
import { RabbitmqService } from './rabbitmq';
import { JwtService } from '@midwayjs/jwt';
import { Context } from '@midwayjs/web';
// import { RedisServiceFactory } from '@midwayjs/redis';

@Provide()
export class UserService extends BaseService {
  model;
  constructor() {
    super();
    this.model = User;
  }

  @Inject()
  ctx: Context;
  @Config('jwt')
  jwtConfig;
  @Inject()
  jwtService: JwtService;
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
    console.log('this.ctx :>>', this.ctx)
    obj.creator = obj.creator || this.ctx.user.nickname;
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

  async createToken(user) {
    const { secret, expiresIn } = this.jwtConfig;

    const token = await this.jwtService.sign(user, secret, {
      expiresIn,
    });
    this.ctx.set('token', token);
    this.ctx.set('Access-Control-Expose-Headers', 'token');
    const tokenKey = 'token:' + this.commonSvc.md5(token);
    await this.redisService.set(tokenKey, 1);
    await this.redisService.expire(tokenKey, expiresIn * 2);
  }
  /**
   * 是否存在 redis 记录
   * @param token
   * @returns
   */
  async validToken(token) {
    const tokenKey = 'token:' + this.commonSvc.md5(token);
    const tokenKeyValue = await this.redisService.get(tokenKey);
    return !!tokenKeyValue;
  }
  async removeToken(token) {
    this.ctx.cookies.set('token', '', { maxAge: 0 })
    const tokenKey = 'token:' + this.commonSvc.md5(token);
    await this.redisService.del(tokenKey);
  }
}
