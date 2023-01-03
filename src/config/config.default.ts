import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
import { STATUS_CODE } from '../constant/STATUS_CODE';
// import { JobCron } from '../entity/jobCron.ts1';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1669288995587_6254',
    egg: {
      port: 7001,
    },
    redis: {
      client: {
        port: 6378, // Redis port
        host: '127.0.0.1', // Redis host
        db: 1,
      },
    },
    bull: {
      // 默认的队列配置
      defaultQueueOptions: {
        redis: {
          port: 6378,
          host: '127.0.0.1',
          // password: 'foobared',
        },
      },
      // 默认的任务配置
      defaultJobOptions: {
        // 保留 10 条记录
        removeOnComplete: 10,
      },
    },
    security: {
      csrf: {
        enable: true,
        type: 'ctoken',
        useSession: false,
        cookieName: 'csrfToken',
        sessionName: 'csrfToken',
        headerName: 'x-csrf-token',
        bodyName: '_csrf',
        queryName: '_csrf',
        refererWhiteList: [],
      },
      cors: {
        credentials: false,
      },
    },
    sequelize: {
      dataSource: {
        // 第一个数据源，数据源的名字可以完全自定义
        default: {
          database: 'midway_init',
          username: 'postgres',
          password: 'postgres',
          host: '127.0.0.1',
          port: 5434,
          encrypt: false,
          dialect: 'postgres',
          define: { charset: 'utf8' },
          timezone: '+08:00',
          logging: console.log,
          entities: ['./entity'],
          // 本地的时候，可以通过 sync: true 直接 createTable
          sync: false,
          // modelPaths: [join(__dirname, './config')],
        },
      },
    },
    jwt: {
      secret: 'xxxxxxxxxxxxxx', // fs.readFileSync('xxxxx.key')
      expiresIn: 2 * 60 * 60, // https://github.com/vercel/ms
    },
    statusCode: STATUS_CODE,
  } as MidwayConfig;
};
