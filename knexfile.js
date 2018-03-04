// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : '127.0.0.1',
      database: 'swp',
      user:     'psguser',
      password: 'p@ssw0rd'
    },
    migrations: {
      directory:'./db/migrations',
      tableName: 'kazaxy'
    },
    seeds: {
      directory: './seeds/dev'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host : '127.0.0.1',
      database: 'swp',
      user:     'psguser',
      password: 'p@ssw0rd'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:'./db/migrations',
      tableName: 'kazaxy'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host : '127.0.0.1',
      database: 'swp',
      user:     'psguser',
      password: 'p@ssw0rd'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:'./db/migrations',
      tableName: 'kazaxy'
    }
  }
};
