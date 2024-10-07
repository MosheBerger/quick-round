const pool = require('../sql/pool')

const clientManager = {

    connect: async (req, res, next) => {
        req.client = await pool.connect()
        console.log('➡️ ', 'connect to DB');
        next()
    },
    close: async (req) => {
        req.client?.release?.()
        console.log('⬅️ ','disconnect');
    }
}

module.exports = clientManager