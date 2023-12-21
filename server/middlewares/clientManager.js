const pool = require('../sql/pool')

const clientManager = {

    connect: async (req, res, next) => {
        req.client = await pool.connect()

    },
    close: async () => {
        req.client.release()

    }
}

module.exports = clientManager