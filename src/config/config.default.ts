import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
import { STATUS_CODE } from '../constant/STATUS_CODE';
// import { JobCron } from '../entity/jobCron.ts1';
// import { uploadWhiteList } from '@midwayjs/upload';
// import { tmpdir } from 'os';
import { join } from 'path';
import {
  Dic, Doc, File, Goods, Person, QueueJob, Schedule, Space, Task, TaskNode, Todo, User
} from '../entity';
// import { uploadWhiteList } from '@midwayjs/upload';
// console.log('midway-upload-files', join(tmpdir(), 'midway-upload-files'))

export default (appInfo: MidwayAppInfo) => {
  // console.log('appInfo.appDir :>>', appInfo.appDir)
  // console.log('appInfo.baseDir :>>', appInfo.baseDir)
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1669288995587_6254',
    koa: {
      port: 7002,
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
    // sequelize: {
    //   dataSource: {
    //     // 第一个数据源，数据源的名字可以完全自定义
    //     default: {
    //       database: 'midway_init',
    //       username: 'postgres',
    //       password: 'postgres',
    //       // host: '192.168.1.16',
    //       host: '127.0.0.1',
    //       port: 5434,
    //       encrypt: false,
    //       dialect: 'postgres',
    //       define: { charset: 'utf8' },
    //       timezone: '+08:00',
    //       logging: console.log,
    //       entities: ['./entity'],
    //       // 本地的时候，可以通过 sync: true 直接 createTable
    //       sync: false,
    //       // modelPaths: [join(__dirname, './config')],
    //     },
    //   },
    // },
    typeorm: {
      dataSource: {
        default: {
          /**
           * 单数据库实例
           */
          type: 'postgres',
          host: '127.0.0.1',
          port: 5434,
          database: 'midway_init',
          username: 'postgres',
          password: 'postgres',
          synchronize: false,     // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
          logging: false,
          // 或者扫描形式
          entities: [
            // '**/entity/*.entity{.ts,.js}',
            // '../entity/*.entity{.ts,.js}'
            Dic, Doc, File, Goods, Person, QueueJob, Schedule, Space, Task, TaskNode, Todo, User
          ]
          // 配置实体模型
          // entities: [Photo],
        }
      }
    },
    jwt: {
      secret: 'xxxxxxxxxxxxxx', // fs.readFileSync('xxxxx.key')
      expiresIn: 2 * 60 * 60, // https://github.com/vercel/ms
    },
    statusCode: STATUS_CODE,
    upload: {
      // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
      mode: 'file',
      // fileSize: string, 最大上传文件大小，默认为 10mb
      fileSize: 1024 * 1014 + 'mb',
      // whitelist: string[]，文件扩展名白名单
      whitelist: //uploadWhiteList,
        [
          '.txt', '.http', '.mp3', '.mp4', '.avi', '.jpg', '.png', '.gif', '.ppt', '.pptx',
          '.xlsx', '.xls', '.doc', '.docx', '.pdf', '.md', // '.png', '.gif', '.ppt', '.doc',
        ],
      // tmpdir: string，上传的文件临时存储路径
      tmpdir: join(appInfo.appDir, 'app/upload'),
      // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
      cleanTimeout: 10 * 60 * 1000,
      // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
      base64: false,
      // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
      match: /\/file\/upload/,
    },
    uploadPath: 'D:/Projects/midway/midway-init/app/upload/',
  } as MidwayConfig;
};
