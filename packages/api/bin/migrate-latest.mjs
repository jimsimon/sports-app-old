import { MigrationService } from 'sharding'
import createKnex from '../database/knex'
import configs from '../knexfile'

async function run () {
  const migrationService = new MigrationService(createKnex, configs)
  await migrationService.migrateAllSchemasToLatest()
}

run().then(() => {
  console.log('done')
  process.exit(0)
}).catch((e) => {
  console.log(e)
  process.exit(1)
})
