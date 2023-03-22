# task & todo

| -    | 标题 | 内容 | 节点 | cron | 持续时间 | 归档 | 关闭 |
| ---- | ---- | ---- | ---- | ---- | -------- | ---- | ---- |
| task | -    | -    | -    | -    | number/s | boolean | boolean |

| -    | 标题 | cron | 持续时间 | 间隔时间 | 常驻    | 归档    | 关闭   |
| ---- | ---- | ---- | -------- | -------- | ------- | ------- | ------ |
| todo | -    | -    | number/s | number/s | boolean | boolean | 硬删除 |

添加间隔执行状态

```js
import cron from 'cron-validate'
```

## todo

| 标题     | 刷牙               | 充电          | 洗衣服      |     |
| -------- | ------------------ | ------------- | ----------- | --- |
| cron     | 0 0 8 *&nbsp;* ? * | 0 0 0 1 * ? * | 记录/时间点 |     |
| 持续时间 | 5 * 60             |               |             |     |
| 间隔提醒 | 5 * 60             | 24 * 60 * 60  |             |     |
| 常驻     | 是                 |               |             |     |
|          |                    |               |             |     |

为什么归档
作为案例重用
例如某事耗时值得参考，但不是常驻，则归档作为保留，

为什么常驻
日常（刷牙，打卡），高频，如一天一次，

什么时候关闭
定时器通过socket提醒后，按重复间隔增加定时提醒（1），如果关闭则删除重复间隔定时器。
（1）定时器来源id 为task/todo id。

什么是间隔提醒
例如打卡提醒，没有完成（关闭）则间隔提醒，

什么是持续时间
todo完成倒计时时间，前端可以根据记录进行倒计时，也可以自定义倒计时。

|名称|来源id|功能|类型|偏移|cron|接收人|状态|描述|排序|
|-|-|-|-|-|-|-|-|-|-|
|-|-|-|-|-|-|-|-|-|-|

定时器 与 job 的关系
jobId = job.id
action = queueName
sourceId = (taskId\todoId)

task、todo 与定时器的关系
    name
    jobId = job.id *
    action = queueName
    sourceId = (taskId\todoId)
    cron = tCron
    cron触发后按重复间隔增加定时提醒。
    t: (s1-j1,s2-j2/5) 删除s2
    s1 s2: sourceId type=0
    : cron(s2 = s1分+t持续时间)
    : action 是什么？TASK、TODO？queue execute socket:要做{data}
    : 需要区分 提醒 与 间隔提醒

task、todo 与 job的关系

添加 task
添加 定时器信息
添加 job

修改 task
替换 定时器信息
替换 job

todo 间隔提醒（在queue中执行）
替换 间隔定时器
替换 间隔job
