const express = require('express')
const DB = require('../DB').results


const router = express.Router()


// DB.create
router.post('/in-room:roomId/in-round/:roundId/user/:userId', async (req, res, next) => {
    const client = req.client
    const { roundId, userId, roomId } = req.params
    const { success, finishTime } = req.body

    try {
        const resultObj = await DB.create(client, roundId, userId, roomId, success, finishTime)

        console.log(resultObj);
        res.json(resultObj)

        next()
    } catch (error) {
        next(error)
    }
})

// create many
router.post('/in-room/:roomId/user/:userId', async (req, res, next) => {
    const client = req.client
    const { roomId, userId } = req.params
    const { results } = req.body

    try {
        await client.query('BEGIN')
        const resultArr = []
        for (const result of results) {
            const { roundId, success, finishTime } = result
            resultArr.push(await DB.create(client, roundId, userId,roomId, success, finishTime))
        }

        console.log(resultArr);
        res.json(resultArr)

        await client.query('COMMIT')
        next()

    } catch (error) {
        await client.query('ROLLBACK')
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

// DB.showByRoom
router.get('/in-room/:roomId', async (req, res, next) => {
    const client = req.client
    const { roomId } = req.params

    try {
        const results = await DB.showByRound(client, roomId)

        console.log(results);
        res.json(results)

        next()
    } catch (error) {
        next(error)
    }
})




module.exports = router