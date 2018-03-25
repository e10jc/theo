const createLocalConfig = ({database}) => ({
  client: 'mysql2',
  connection: {
    database,
    user: 'user',
    password: 'password'
  }
})

module.exports = {
  development: createLocalConfig({database: 'theo'}),
  test: createLocalConfig({database: 'theo_test'}),
  production: createLocalConfig({database: 'theo'})
}