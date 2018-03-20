exports.up = knex => (
  knex.schema.createTable('theories', table => {
    table.increments()
    table.string('title')
  })
)

exports.down = knex => (
  knex.schema.dropTableIfExists('theories')
)
