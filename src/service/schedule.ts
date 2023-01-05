import { Inject, Provide } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';
import { Schedule } from '../entity/Schedule';
import { BaseService } from './base';
import { CommonService } from './common';
import { QueueJobService } from './queueJob';

// import { RedisServiceFactory } from '@midwayjs/redis';
// import { IGoods } from '../interface';

@Provide()
export class ScheduleService extends BaseService {
  model;
  constructor() {
    super();
    this.model = Schedule;
  }
  @Inject()
  redisSvc: RedisService;
  @Inject()
  commonSvc: CommonService;
  @Inject()
  queueJobService: QueueJobService;

  // @Inject()
  // redisServiceFactory: RedisServiceFactory;

  /**
   * 添加定时器信息
   * @param {any} obj 定时器信息
   * @return {Promise<any>}定时器
   */
  async addSchedule(obj) {
    obj.id = this.getId('SDR');
    obj.state = 1;
    obj.creator = 'YSHI';
    return this.model.create(obj).then(d => d.toJSON());
  }

  // service
  /**
   * 保存定时器
   * @param {any} obj 定时器信息
   * @return {Promise<any>} 定时器
   */
  async saveSchedule(obj) {
    let data;
    if (obj.id) {
      data = await this.update(obj);
    } else {
      data = await this.addSchedule(obj);
    }
    return data;
  }
  async setSchedule(obj) {
    const jobId = await this.queueJobService.replaceQueueJob(obj);
    obj.jobId = jobId;
    const data = await this.saveSchedule(obj);
    return this.resultData(data);
  }
  async removeSchedule(id) {
    const schedule = await this.getData({ id });
    await this.queueJobService.removeQueueJob(
      schedule.action,
      schedule.sourceId
    );
    await this.delete({ id });
    return this.resultData();
  }
  // 项目启动时加载所有定时器
  async loadSchedule() {
    const scheduleList = await this.getList();
    for (const schedule of scheduleList) {
      await this.queueJobService.loadQueueJob(schedule);
    }
  }

  // async getPage({
  //   search = '',
  //   filter = {},
  //   pageSize = 10,
  //   currentPage = 1,
  // }: {
  //   search?: string;
  //   filter?: any;
  //   pageSize?: number;
  //   currentPage: number;
  //   type: string;
  // }) {
  //   const offset = (currentPage - 1) * pageSize;
  //   let where = {};
  //   if (search) {
  //     // name, desc
  //     where = {
  //       name: {
  //         [Op.like]: `%${search}%`,
  //       },
  //     };
  //   }
  //   if (filter) {
  //     // const { type,state } = filter;
  //     // if(type) {}
  //     // if(state!) {state = 1}
  //   }

  //   let data = await Goods.findAndCountAll({
  //     where,
  //     limit: pageSize,
  //     offset,
  //     order: [['index', 'ASC']],
  //     distinct: true, // 去除从表数据行数
  //   }).then(this.commonSvc.getPageHandler(pageSize, currentPage));
  //   if (!data) {
  //     data = { rows: [], count: 0, currentPage, totalPages: 0 };
  //   }
  //   return { code: this.okCode, data };
  // }
  // /**
  //  * 执行定时器回调函数 - 现在在 app中直接调用 service
  //  * @param scheduleRecord 定时器信息
  //  */
  // public async execCallback(scheduleRecord) {
  //   const service = this[`${scheduleRecord.action}Svc`];
  //   return service.execSchedule(scheduleRecord);
  // }
  // public ec() {
  //   console.log('123 :>>', 123)
  // }
  public getMaxTimeOffset(timeOffsets) {
    /** 时间偏移 */
    let maxTimeOffset: { num: number; unit: Unit; state: number } = {
      num: 0,
      unit: 'day',
      state: 1,
    };
    timeOffsets.forEach(
      (timeOffset: { num: number; unit: Unit; state: number }) => {
        if (timeOffset.state === 1 && maxTimeOffset.num < timeOffset.num) {
          maxTimeOffset = timeOffset;
        }
      }
    );
    return maxTimeOffset;
  }

  // /**
  //  * 按来源id查询定时器信息
  //  * @param {string} sourceId 来源id
  //  */
  // public async getScheduleBySourceId(sourceId) {
  //   const data = await this.getSchedule({ sourceId });
  //   if (!data) {
  //     return { code: this.okCode, data: null }
  //   }
  //   data.cron = [data.cron[2], data.cron[1]];
  //   return { code: this.okCode, data }
  // }
  // /**
  //  * 定时器立即执行 执行定时器回调函数，在 app中直接调用 service
  //  * @param {string} sourceId 定时器来源 id,(固定类应用 id)
  //  */
  // public async execSchedule(sourceId) {
  //   const scheduleRecord = await this.getSchedule({ sourceId });
  //   const num = scheduleRecord ? await this.execCallback(scheduleRecord) : 0;
  //   const msg = num ? `已成功发送${num}条` : '暂无符合要求数据！';
  //   return { code: this.okCode, msg }
  // }
}

type Unit = 'day' | 'month' | 'year';
// interface QueueJobObj {
//   id?: string;
//   name: string;
//   sourceId?: string;
//   action: string;
//   type?: string;
//   timeOffsets?: string;
//   cron: string;
//   receiver?: string;
//   state?: 0 | 1;
//   desc?: string;
//   index?: number;
//   creator?: string;
//   modifier?: string;
// }
// interface QueueJobType extends QueueJobObj {
//   createdAt: Date;
//   updatedAt: Date;
// }
