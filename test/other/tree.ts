import { DataSource } from 'typeorm';
import { Goods } from './entity/Goods';
// const { ads } = require('typeorm');
// const Goods = require('./entity/Goods')

const ads = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  // synchronize: true,
  logger: 'simple-console',
  logging: 'all',
  entities: [Goods]
})
ads.initialize().then(async () => {
  // const rep = ads.getRepository(Goods)
  // await rep.insert({ id: 'a', name: 'a', })
  // await rep.insert({ id: 'b', name: 'b', parent: { id: 'a' } })
  // await rep.insert({ id: 'c', name: 'c', parent: { id: 'a' } })
  // await rep.insert({ id: 'd', name: 'd', parent: { id: 'c' } })
  // await rep.insert({ id: 'e', name: 'e', parent: { id: 'c' } })
  // await rep.insert({ id: 'f', name: 'f', parent: { id: 'b', name: 'b', parent: { id: 'a', name: 'a', } } })
  // const list = await rep.find()
  // console.log('list :>>', list)

  const treerep = ads.getTreeRepository(Goods)

  await treerep.update({
    id: 'a112',
  }, {
    parent: {
      id: 'a12'
    }
  })

  const trees = await treerep.findTrees({ depth: 5 })
  console.log('trees :>>', JSON.stringify(trees, null, 2))

  // const a = await treerep.findAncestors({ id: 'a111', name: 'a111' })
  // console.log('a :>>', JSON.stringify(a, null, 2))


  // const a1 = new Goods()
  // a1.id = "a1"
  // a1.name = "a1"
  // await ads.manager.save(a1)

  // const a11 = new Goods()
  // a11.id = "a11"
  // a11.name = "a11"
  // a11.parent = a1
  // await ads.manager.save(a11)

  // const a12 = new Goods()
  // a12.id = "a12"
  // a12.name = "a12"
  // a12.parent = a1
  // await ads.manager.save(a12)

  // const a111 = new Goods()
  // a111.id = "a111"
  // a111.name = "a111"
  // a111.parent = a11
  // await ads.manager.save(a111)

  // const a112 = new Goods()
  // a112.id = "a112"
  // a112.name = "a112"
  // a112.parent = a11
  // await ads.manager.save(a112)





  // console.log(11111)
  // const trees = await ads.manager.getTreeRepository(Goods).findTrees()
})
