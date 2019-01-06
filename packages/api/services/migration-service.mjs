import createKnex from "../database/knex";
import configs from "../knexfile";
import {enableSharding, Shard} from "../../sharding";

export default class MigrationService {
  async migrateAllSchemasToLatest () {
    const knex = createKnex(configs, ['public'])
    enableSharding(knex)

    const migrationService = new MigrationService()
    await migrationService.migrateSchemaToLatest({name: 'public'})

    const shards = await Shard.query()
    for (const shard of shards) {
      await migrationService.migrateSchemaToLatest(shard)
    }

    console.log('All schemas were successfully migrated!')
  }

  async rollbackLastMigrationGroupForAllSchemas () {
    const knex = createKnex(configs, ['public'])
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
    const knex = createKnex(configs, [name])
    const executed = await knex.migrate.latest({schemaName: name})
    console.log(`Successfully ran ${executed.length} migrations`)
  }

  async rollbackLastMigrationGroup ({name}) {
    console.log(`Rolling back schema: ${name}`)
    const knex = createKnex(configs, [name])
    const executed = await knex.migrate.rollback({schemaName: name})
    console.log(`Successfully ran ${executed.length} migrations`)
  }
}
