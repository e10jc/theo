exports.up = knex => (
  knex.schema.createTable('users', table => {
    table.increments()
    table.string('email')
    table.string('password')

    table.unique('email')
  })
)

exports.down = knex => (
  knex.schema.dropTableIfExists('users')
)
