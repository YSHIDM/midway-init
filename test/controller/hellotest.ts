import { createApp, close } from '@midwayjs/mock'
import { createSocketIOClient } from '@midwayjs/mock';
import { Application, Framework } from '@midwayjs/koa';
// import { once } from 'events';

describe('/test/index.test.ts', () => {
  let app: Application

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });
  it('should test create socket app', async () => {

    // // 创建一个服务
    // const app = await createApp<Framework>();

    // 创建一个对应的客户端
    const client = await createSocketIOClient({
      port: 3000,
    });

    // 拿到结果返回
    const data = await new Promise(resolve => {
      client.on('myEventResult', resolve);
      // 发送事件
      client.send('myEvent', 1, 2, 3);
    });

    // 判断结果
    expect(data).toEqual({
      name: 'harry',
      result: 6,
    });

    // // 关闭客户端
    // await client.close();
    //     // 关闭服务端
    // await close(app);
  });

});
