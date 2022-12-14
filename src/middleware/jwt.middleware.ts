import { Config, Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/web';
// import { httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { CommonService } from '../service/common';

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
          // 过期

          const commonService =
            await ctx.requestContext.getAsync<CommonService>(CommonService);
          const b = await commonService.validToken(token);
          if (!b) {
            return this.statusCode.ERROR.AUTHENTICATION.TOKEN_EXPIRE;
          }
          const tokenUser = await this.jwtService.decode(token);
          await commonService.createToken({ nickname: tokenUser['nickname'] });
        } else if (messageArray.includes(e.message)) {
          // 无效的token
          return this.statusCode.ERROR.AUTHENTICATION.BAD_TOKEN;
        } else {
          throw e;
        }
      }
      // 有这个人吗
      await next();
    };
  }

  ignore(ctx: Context): boolean {
    // 下面的路由将忽略此中间件
    return (
      ctx.path === '/user/getPublicKey' ||
      ctx.path === '/user/signIn' ||
      ctx.path === '/user/signUp'
    );
  }
}
