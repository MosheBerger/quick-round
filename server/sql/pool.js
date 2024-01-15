require('dotenv').config()
const pg = require('pg')


const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

module.exports = pool