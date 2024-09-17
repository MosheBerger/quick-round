require('dotenv').config()
const pg = require('pg')
const fs = require('fs')


const caPath = process.env.RENDER ? '/etc/secrets/ca.pem' : './ca.pem';
const ca = fs.readFileSync(caPath).toString('utf8');
// console.log(ca);

const poolConfig = {
    // connectionString: process.env.DATABASE_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca
    }
}
// if (process.env.SSL) {
//     poolConfig.ssl = true
// }

const pool = new pg.Pool(poolConfig)

module.exports = pool