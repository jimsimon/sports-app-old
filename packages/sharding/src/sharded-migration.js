import als from "async-local-storage"

module.exports = class ShardedMigration {
  static get schema () {
    return als.get('shard')
  }

  async up (knex) {
    const trx = knex.transaction()
    await trx.raw("SET SCHEMA '?'", [this.constructor.schema])
    return trx
  }

  down (knex) {
    const trx = knex.transaction()
    await trx.raw("SET SCHEMA '?'", [this.constructor.schema])
    return trx
  }
}
