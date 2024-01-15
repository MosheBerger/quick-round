const express = require('express')
const likesDB = require('../DB').likes


const router = express.Router()


router.get('/:userId', async (req, res, next) => {
    const client = req.client
    const { userId } = req.params

    try {
        const results = await likesDB.showLikedByUser(client, userId)

        console.log(results);
        res.json(results)

        next()
    } catch (error) {
        next(error)
    }
})

// CREATE 
router.post('/', async (req, res, next) => {
    const client = req.client
    const { roomId, userId, likeIt } = req.body

    try {
        const results = await likesDB.create(client, roomId, userId, likeIt)

        console.log(results);
        res.json(results)

        next()
    } catch (error) {
        next(error)
    }
})

// UPDATE
router.put('/', async (req, res, next) => {
    const client = req.client
    const { roomId, userId, likeIt } = req.body

    try {
        const results = await likesDB.update(client, roomId, userId, likeIt)

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
        const rounds = await roundsDB.showByRoom(client, roomId)

        console.log(rounds);
        res.json(rounds)

        next()
    } catch (error) {
        next(error)
    }
})




module.exports = router