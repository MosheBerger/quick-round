require('dotenv').config()
const pg = require('pg')

const poolConfig = {
    connectionString: process.env.DATABASE_URL,
}
if (process.env.SSL) {
    poolConfig.ssl = true
}

const pool = new pg.Pool(poolConfig)

module.exports = pool