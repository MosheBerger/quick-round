const express = require('express')
const likesDB = require('../DB').likes


const router = express.Router()



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


module.exports = router