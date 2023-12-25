const express = require('express')
const DB = require('../DB').rounds


const router = express.Router()


// CREATE 
// DB.create

// CREATE MANY
// DB.createMany

// REMOVE?
// DB.remove

// GET ONE
// DB.show

// GET ALL IN SPECIFIC ROOM
router.get('/in-room/:roomId', async (req, res, next) => {
    console.log('where');
    const client = req.client
    const {roomId} = req.params

    try {
        const rounds = await DB.showByRoom(client,roomId)

        console.log(rounds);
        res.json(rounds)
        
        next()
    } catch (error) {
        next(error)
    }
})



module.exports = router