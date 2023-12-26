const express = require('express')
const DB = require('../DB').results


const router = express.Router()


// DB.create
router.post('/in-round/:roundId/user/:userId', async (req, res, next) => {
    const client = req.client
    const { roundId, userId } = req.params
    const { success, finishTime } = req.body.result

    try {
        const resultObj = await DB.create(client, roundId, userId, success, finishTime)

        console.log(resultObj);
        res.json(resultObj)

        next()
    } catch (error) {
        next(error)
    }
})

// DB.showByRound
router.get('/in-round/:roundId', async (req, res, next) => {
    const client = req.client
    const { roundId } = req.params

    try {
        const results = await DB.showByRound(client, roundId)

        console.log(results);
        res.json(results)

        next()
    } catch (error) {
        next(error)
    }
})




module.exports = router