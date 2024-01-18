require('dotenv').config()
const pg = require('pg')


const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    // ssl: process.env?.SSLO ? true : false
    ssl: true 
})

module.exports = pool