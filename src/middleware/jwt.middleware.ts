import { Config, Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/web';
import { JwtService } from '@midwayjs/jwt';
import { UserService } from '../service/user';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;
  @Config('jwt')
  jwtConfig;
  @Config('statusCode')
  statusCode;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['token']) {
        return this.statusCode.ERROR.AUTHENTICATION.NEED_TOKEN;
      }
      // 从 header 上获取校验信息
      const token = ctx.get('token');

      const userService = await ctx.requestContext.getAsync<UserService>(UserService);
      const b = await userService.hasToken(token);
      if (!b) {
        ctx.cookies.set('token', '', { maxAge: 0 })
        return this.statusCode.ERROR.AUTHENTICATION.TOKEN_EXPIRE;
      }
      let isExpired = false;
      try {
        //jwt.verify方法验证token是否有效
        await this.jwtService.verify(token, this.jwtConfig.secret, {
          complete: true,
        });
      } catch (e) {
        const messageArray = [
          'invalid token',
          'Unexpected end of JSON input',
          'invalid signature',
          'jwt malformed',
        ];
        if (e.message === 'jwt expired') {
          isExpired = true;
        } else if (messageArray.includes(e.message)) {
          // 无效的token
          await userService.removeToken(token)
          return this.statusCode.ERROR.AUTHENTICATION.BAD_TOKEN;
        } else {
          throw e;
        }
      }
      // { nickname: 'YSHI', iat: 1671853582, exp: 1671853583 }
      const jwtObj = await this.jwtService.decode(token)

      const user = await userService.getData({ nickname: jwtObj.valueOf()['nickname'] })
      if (!user) {
        await userService.removeToken(token)
        return this.statusCode.ERROR.AUTHENTICATION.USER_NOT_EXIST;
      }
      if(isExpired) {
        // 登录状态延期
        const tokenUser = await this.jwtService.decode(token);
        await userService.createToken({ nickname: tokenUser['nickname'] });
      }
      ctx.state.user = user;
      await next();
    };
  }

  ignore(ctx: Context): boolean {
    // 下面的路由将忽略此中间件
    return (
      ctx.path === '/user/getPublicKey' ||
      ctx.path === '/user/signIn' ||
      ctx.path === '/user/signUp' ||
      ctx.path === '/user/logout'
    );
  }
}
