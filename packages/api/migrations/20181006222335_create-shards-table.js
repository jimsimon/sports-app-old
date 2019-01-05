module.exports = {
  up: (knex) => {
    return knex.transaction((trx) => {
      return trx.schema.createTable('shards', (table) => {
        table.bigincrements('id')
        table.string('name')
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.unique('name')
      })
    })
  },

  down: (knex) => {
    return knex.transaction((trx) => {
      return trx.schema.dropTable('shards')
    })
  }
}
