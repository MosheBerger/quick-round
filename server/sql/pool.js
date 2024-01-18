require('dotenv').config()
const pg = require('pg')


const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.SSL
})

module.exports = pool