// import { app, assert } from 'midway-mock/bootstrap';

import { createApp, close } from "@midwayjs/mock";
import { Application, Framework } from "@midwayjs/koa";

import { FileService } from '../../src/service/file';

describe('test/service/user.test.ts', () => {
  let app: Application;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('#getUser', async () => {
    // 取出 userService
    const user = await app.getApplicationContext().getAsync<FileService>(FileService)
    const data = await user.getFile({ id: 1 });
    console.log('data :>>', data)
  });
});