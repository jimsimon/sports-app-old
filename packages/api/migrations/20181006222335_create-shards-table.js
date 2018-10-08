exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('shards', (table) => {
      table.bigincrements('id')
      table.string('name')
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
      table.unique('name')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('shards')
  ])
}
