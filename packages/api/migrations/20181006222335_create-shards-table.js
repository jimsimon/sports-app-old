module.exports = {
  up: (trx) => {
    return trx.schema.createTable('shards', (table) => {
      table.bigincrements('id')
      table.string('name')
      table.timestamp('createdAt').defaultTo(trx.fn.now())
      table.timestamp('updatedAt').defaultTo(trx.fn.now())
      table.unique('name')
    })
  },

  down: (trx) => {
    return trx.schema.dropTable('shards')
  }
}
