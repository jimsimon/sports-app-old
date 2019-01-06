module.exports = {
  up: (trx) => {
    return trx.schema.createTable('users', (table) => {
      table.bigincrements('id')
      table.string('name')
      table.timestamp('createdAt').defaultTo(trx.fn.now())
      table.timestamp('updatedAt').defaultTo(trx.fn.now())
    })
  },

  down: (trx) => {
    return trx.schema.dropTable('users')
  }
}
