// import { app, assert } from 'midway-mock/bootstrap';

import { createApp, close } from "@midwayjs/mock";
import { Application, Framework } from "@midwayjs/koa";

import { MusicPlaylistService } from '../../src/service/musicPlaylist';

describe('test/service/musicPlaylist.test.ts', () => {
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
    const mpl = await app.getApplicationContext().getAsync<MusicPlaylistService>(MusicPlaylistService)
    const data = await mpl.addMusicPlaylist({name: 'ceshi', type: '音乐'})
    console.log('data :>>', data)
  });
});