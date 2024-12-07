import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Application, Framework } from '@midwayjs/koa';
// import * as assert from 'assert';

describe('test/controller/home.test.ts', () => {

  let app: Application;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('should GET /home', async () => {

    const app = await createApp<Framework>();
    // make request
    const result = await createHttpRequest(app)
      .get('/home/tom')
    console.log('result :>>', result)

    // use expect by jest
    // expect(result.status).toBe(200);
    // expect(result.text).toBe('Hello Midwayjs!');

    // or use assert
    // assert.deepStrictEqual(result.status, 200);
    // assert.deepStrictEqual(result.text, 'Hello Midwayjs!');
    await close(app)
  });

  // it('should POST /', async () => {
  //   // make request
  //   const result = await createHttpRequest(app)
  //     .post('/')
  //     .send({id: '1'});

  //   // use expect by jest
  //   expect(result.status).toBe(200);
  // });

});
