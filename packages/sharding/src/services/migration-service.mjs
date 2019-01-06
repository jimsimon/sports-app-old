import {enableSharding, Shard} from '../index'

export default class MigrationService {
  constructor (createKnex, configs) {
    this.createKnex = createKnex
    this.configs = configs
  }

  async migrateAllSchemasToLatest () {
    const knex = this.createKnex(this.configs, ['public'])
    enableSharding(knex)

    await this.migrateSchemaToLatest({name: 'public'})

    const shards = await Shard.query()
    for (const shard of shards) {
      await this.migrateSchemaToLatest(shard)
    }

    console.log('All schemas were successfully migrated!')
  }

  async rollbackLastMigrationGroupForAllSchemas () {
    const knex = this.createKnex(this.configs, ['public'])
    enableSharding(knex)

    const shards = await Shard.query()
    for (const shard of shards) {
      await this.rollbackLastMigrationGroup(shard)
    }

    await this.rollbackLastMigrationGroup({name: 'public'})

    console.log('All schemas were successfully rolled back!')
  }

  async migrateSchemaToLatest ({name}) {
    console.log(`Migrating schema: ${name}`)
    const knex = this.createKnex(this.configs, [name])
    const executed = await knex.migrate.latest({schemaName: name})
    console.log(`Successfully ran ${executed.length} migrations`)
  }

  async rollbackLastMigrationGroup ({name}) {
    console.log(`Rolling back schema: ${name}`)
    const knex = this.createKnex(this.configs, [name])
    const executed = await knex.migrate.rollback({schemaName: name})
    console.log(`Successfully ran ${executed.length} migrations`)
  }
}
