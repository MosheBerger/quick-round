const express = require('express')
const DB = require('../DB').rounds


const router = express.Router()


// CREATE 
// DB.create
router.post('/create/', async (req, res, next) => {
    const client = req.client
    const { roomId, roundNum, gameId, settings } = req.body

    try {
        const newRound = await DB.create(client, roomId, roundNum, gameId, settings)

        console.log(newRound);
        res.json(newRound)

        next()
    } catch (error) {
        next(error)
    }
})


// CREATE MANY
// DB.createMany
router.post('/create-many/', async (req, res, next) => {
    const client = req.client
    const roundsArr = req.body

    try {
        const results = await DB.createMany(client, roundsArr)

        console.log(results);
        res.json(results)

        next()
    } catch (error) {
        next(error)
    }
})


// REMOVE?
// DB.remove

// GET ONE
// DB.show

// GET ALL IN SPECIFIC ROOM
router.get('/in-room/:roomId', async (req, res, next) => {
    const client = req.client
    const { roomId } = req.params

    try {
        const rounds = await DB.showByRoom(client, roomId)

        console.log(rounds);
        res.json(rounds)

        next()
    } catch (error) {
        next(error)
    }
})




module.exports = router