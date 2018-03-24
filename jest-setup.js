const {default: knexMigrate} = require('knex-migrate')

module.exports = () => knexMigrate('redo')