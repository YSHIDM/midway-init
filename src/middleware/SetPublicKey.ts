import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class B implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      await next();
      // ...
    };
  }

  // ignore(ctx: Context): boolean {
  //   // 下面的路由将忽略此中间件
  //   return ctx.path === '/'
  //     || ctx.path === '/api/auth'
  //     || ctx.path === '/api/login';
  // }
  // match(ctx: Context): boolean {
  //   // 下面的匹配到的路由会执行此中间件
  //   if (ctx.path === '/api/index') {
  //     return true;
  //   }
  // }

  static getName(): string {
    return 'report';
  }
}
