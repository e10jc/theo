const createLocalConfig = ({database}) => ({
  client: 'mysql2',
  connection: {
    database,
    password: 'password',
    user: 'user'
  }
})

module.exports = {
  development: createLocalConfig({database: 'theo'}),
  production: {
    client: 'mysql2',
    connection: {
      database: process.env.RDS_DB_NAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
      user: process.env.RDS_USERNAME
    }
  },
  test: createLocalConfig({database: 'theo_test'})
}
