const ShardedMigration = require('sharding/src/sharded-migration')

module.exports = class CreateShardsTable extends ShardedMigration {
  static get schema () {
    return 'public'
  }

  async up(knex) {
    const trx = await super.up(knex)
    return trx.schema.createTable('shards', (table) => {
      table.bigincrements('id')
      table.string('name')
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
      table.unique('name')
    })
  }

  async down(knex) {
    const trx = await super.down(knex)
    return trx.schema.dropTable('shards')
  }
}
