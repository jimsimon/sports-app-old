import {Shard} from 'sharding'

class MigratorService {
  constructor(migrationsTableName = 'migrator_migrations') {
    this.migrationsTableName = migrationsTableName
  }

  async createMigrationTableForAllShards (knex) {
    const shards = await Shard.query()
    shards.forEach(async (shard) => {
      await this.createMigrationTableForOneShard(knex, shard)
    })
  }

  createMigrationTableForOneShard (knex, shard) {
    return knex.transaction(async (trx) => {
      await trx.raw("SET SCHEMA '?'", [shard.name])
      const exists = await knex.schema.hasTable(this.migrationsTableName)
      if (!exists) {
        await knex.schema.createTable(this.migrationsTableName, (table) => {
          table.bigincrements('id')
          table.string('name')
          table.timestamp('createdAt').defaultTo(knex.fn.now())
        })
      }
    })
  }

  async runAllPendingMigrations (knex, migrationFilePaths) {
    const filenameToModuleMap = migrationFilePaths.reduce((filenameToModuleMap, filePath) => {
      filenameToModuleMap[path.filename(filePath)] = import(filePath)
      return filenameToModuleMap
    })

    await Promise.all(Object.values(filenameToModuleMap))

    const shards = await Shard.query()
    shards.forEach(async (shard) => {
      console.log(`Migrating shard: ${shard.name}`)
      knex.transaction(async (trx) => {
        try {
          const completedMigrations = await knex(this.migrationsTableName).transacting(trx).forUpdate().select('name')
          for (const [filename, {up}] of Object.entries(filenameToModuleMap)) {
            if (!completedMigrations.includes(filename)) {
              await trx.raw("SET SCHEMA '?'", [shard.name])
              await trx.raw(`LOCK TABLE ${this.migrationsTableName}`)
              await up(trx)
              await trx.insert({name: filename}).into(this.migrationsTableName)
            }
          }
          await trx.commit()
        }
        catch (e) {
          await trx.rollback()
          console.error(e)
          process.exit(1)
        }
      })
      console.log(`Successfully executed all pending migrations`)
    })
  }
}
