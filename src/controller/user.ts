import { Application as SocketApplication } from '@midwayjs/socketio';
import { Application } from '@midwayjs/web';
import { CacheManager } from '@midwayjs/cache';
import { CommonService } from '../service/common';
import { Context } from 'egg';
import { RedisService } from '@midwayjs/redis';
import { UserService } from '../service/user';
import {
  App,
  Body,
  Config,
  Controller,
  Get,
  Inject,
  MidwayFrameworkType,
  Post,
} from '@midwayjs/decorator';

@Controller('/user')
export class UserController {
  @App()
  app: Application;
  @Inject()
  ctx: Context;
  @App(MidwayFrameworkType.WS_IO)
  socketApp: SocketApplication;
  @Inject()
  userService: UserService;
  @Inject()
  cache: CacheManager; // 依赖注入CacheManager
  @Inject()
  redisService: RedisService;
  @Inject()
  commonService: CommonService;
  @Config('statusCode')
  statusCode;

  @Get()
  async invoke() {
    // 对 / 下的连接做广播
    this.socketApp.of('/').emit('hi', 'everyone');
  }
  @Get('/get/:uid')
  async getUser() {
    const params = this.ctx.params;
    let data: { uid: string; username: string; phone: string; email: string } =
      await this.cache.get(params.uid);
    if (!data) {
      data = await this.userService.getUser(params);
      // 设置缓存内容
      console.info('data.uid :>>', data.uid);
      await this.cache.set(data.uid, data);
      console.info(
        'this.cache.cacheConfig :>>',
        this.cache.cacheConfig.store.create.toString()
      );
    }
    // 错误的
    // this.redisService.client.call("JSON.SET", "doc", "$", '{"f1": {"a":1}, "f2":{"a":2}}')
    // this.redisService.client.call("JSON.GET", "doc", "$..f1")
    return { code: 2000, data };
  }
  @Get('/getPublicKey')
  getPublicKey() {
    const { publicKey, privateKey } = this.commonService.getKeyPair();
    const publicKeyMd5 = this.commonService.md5(publicKey);
    this.redisService.set(publicKeyMd5, privateKey);
    // 5 分钟有效期
    // this.redisService.expire(publicKeyMd5, 300)
    this.ctx.set('publicKeyMd5', publicKeyMd5);
    this.ctx.set('Access-Control-Expose-Headers', 'publicKeyMd5');
    return { code: this.userService.okCode, data: publicKey };
  }
  /**
   * 登录
   * @param user 用户信息
   */
  @Post('/signIn')
  async signIn(@Body() user) {
    const { nickname, encryptPassword } = user;
    const userData = await this.userService.getData({ nickname });
    if (!userData) {
      return this.statusCode.ERROR.USER.NO_USER;
    }
    // 抽离 常量 @Config
    const publicKeyMd5 = this.ctx.get('publicKeyMd5');
    const privateKey = await this.redisService.get(publicKeyMd5);
    if (!privateKey) {
      return this.statusCode.ERROR.AUTHENTICATION.SIGNIN_TIMEOUT;
    }
    let password: string = this.commonService.getPrivateDecryptData(
      encryptPassword,
      privateKey
    );
    password = this.commonService.md5(password);
    if (password === userData.password) {
      await this.userService.createToken({ nickname });
    } else {
      return this.statusCode.ERROR.USER.PW_ERROR;
    }
    this.ctx.remove('publicKeyMd5');
    this.redisService.del('publicKeyMd5');
    userData.password = void 0;
    return { code: this.userService.okCode, data: userData };
    // verify
  }
  /**
   * 注册
   * @param user 用户信息
   */
  @Post('/signUp')
  async signUp(@Body() user) {
    const { nickname, encryptPassword } = user;
    const userData = await this.userService.getData({ nickname });
    if (userData) {
      return this.statusCode.ERROR.USER.REPEAT_NICKNAME;
    }
    // 抽离 常量 @Config
    const publicKeyMd5 = this.ctx.get('publicKeyMd5');
    const privateKey = await this.redisService.get(publicKeyMd5);
    if (!privateKey) {
      return this.statusCode.ERROR.AUTHENTICATION.SIGNIN_TIMEOUT;
    }
    let password: string = this.commonService.getPrivateDecryptData(
      encryptPassword,
      privateKey
    );
    password = this.commonService.md5(password);
    const data = await this.userService.saveUser({ nickname, password, creator: nickname });
    await this.userService.createToken({ nickname });
    this.ctx.remove('publicKeyMd5');
    this.redisService.del('publicKeyMd5');
    return { code: this.userService.okCode, data };
  }
  @Post('/logout')
  async logout() {
    return await this.userService.logout()
  }
}
