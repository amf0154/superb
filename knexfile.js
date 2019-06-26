// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '93.189.40.230',
      user : 'postgres',
      password : 'rgfd0154',
      database : 'superb',
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host : '93.189.40.230',
      user : 'postgres',
      password : 'rgfd0154',
      database : 'superb',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host : '93.189.40.230',
      user : 'postgres',
      password : 'rgfd0154',
      database : 'superb',
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  }

};
