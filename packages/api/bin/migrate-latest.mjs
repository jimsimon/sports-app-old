import path from 'path'
import Umzug from 'umzug'
import createKnex from '../database/knex'
import configs from '../knexfile'
import { enableSharding, Shard } from 'sharding'

const knex = createKnex(configs)

enableSharding(knex)

const umzug = new Umzug({
  storage: 'knex-umzug',
  storageOptions: {
    context: 'default',
    connection: knex,
    tableName: 'migrations'
  },
  migrations: {
    params: [knex],
    path: path.resolve('./migrations')
  }
})

async function run () {
  console.log('Migrating public schema')
  const executed = await umzug.up()
  console.log(`Successfully ran ${executed.length} migrations`)

  const shards = await Shard.query()
  shards.forEach(async (shard) => {
    console.log(`Migrating shard: ${shard.name}`)
    await shard.activate()
    const executed = await umzug.up()
    console.log(`Successfully ran ${executed.length} migrations`)
  })
  console.log('All schemas were successfully migrated!')
}

run().then(() => {
  console.log('done')
  process.exit(0)
}).catch((e) => {
  console.log(e)
  process.exit(1)
})
