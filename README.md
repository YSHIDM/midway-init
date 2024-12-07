# my-midway-project

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
npm i
npm run dev
open http://localhost:7001/
```

### 前端

```bash
cd D:\Projects\node\vue-todo\
npm run serve
```


### Deploy

```bash
npm start
npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.

[midway]: https://midwayjs.org

queue

jod

  add(obj)
    saveSchedule(obj)
  replace(id, cron)
    saveSchedule(obj)
  remove(id)
    deleteSchedule(id)
  execute()

schedule

addSchedule
saveSchedule
saveScheduleForMessage
getPage
execCallback
getMaxTimeOffset

docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5434:5432 -v D:\Volume:/var/lib/postgresql/data -d postgres
docker exec -it postgres psql -U postgres
create database  midway_init;
docker exec -ti postgres pg_dump -U postgres -t file midway_init > ./t.sql
