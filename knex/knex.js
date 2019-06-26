const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment];
const database = require('knex')(config);

async function assertDatabaseConnection() {
    await database.raw('select 1+1 as result')
        .catch((err) => {
            console.log('[Fatal] Failed to establish connection to database! Exiting...');
            console.log(err);
            process.exit(1);
        }).then(res=> console.log('Connection to DB has been established successfully!'))   
}

setTimeout(()=> assertDatabaseConnection(),1000);

module.exports = {
    database,
    assertDatabaseConnection
};