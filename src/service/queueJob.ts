import { Inject, Provide } from '@midwayjs/decorator';
import { Framework } from '@midwayjs/bull';
import { ScheduleService } from './schedule';

@Provide()
export class QueueJobService {
  @Inject()
  bullFramework: Framework;
  @Inject()
  scheduleService: ScheduleService;

  async updateQueueJob({ id, action: queueName, cron, jobId, ...data }) {
    const testQueue = this.bullFramework.getQueue(queueName);
    if (id) {
      await testQueue.removeJobs(jobId);
    }
    const job = await testQueue?.add(data, {
      repeat: {
        cron: cron,
      },
    });
    return job.id;
  }
  async removeQueueJob(queueName, jobId) {
    // 获取 Processor 相关的队列
    const testQueue = this.bullFramework.getQueue(queueName);
    // 立即执行这个任务
    const job = await testQueue?.getJob(jobId);
    await job.remove();
    await this.scheduleService.delete({ sourceId: job.id });
  }
  async loadQueueJob(schedule) {
    const testQueue = this.bullFramework.getQueue(schedule.action);
    await testQueue?.add(schedule, {
      repeat: {
        cron: schedule.cron,
      },
    });
  }
  async executeQueueJob(queueName, data) {
    // 获取 Processor 相关的队列
    const testQueue = this.bullFramework.getQueue(queueName);
    // 立即执行这个任务
    await testQueue?.runJob(data);
    return ''; // TODO:
  }
}
