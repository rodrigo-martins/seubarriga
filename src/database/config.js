module.exports = {
  test: {
    client: 'pg',
    version: '8.3',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'root',
      database: 'seubarriga'
    },
    migrations: {
      directory: 'src/migrations'
    }
  }
}
