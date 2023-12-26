const express = require('express')
const DB = require('../DB')


const router = express.Router()
// DB.showAllDataPerRoom
router.get('/room/:roomId', async (req, res, next) => {
    const client = req.client
    const { roomId } = req.params

    try {
        const room = await DB.rooms.showAllDataPerRoom(client, roomId)

        for (let i = 0; i < room.rounds.length; i++) {
            const thisRound = room.rounds[i]
            console.log(thisRound);
            thisRound.results = await DB.results.showByRound(client,thisRound.id)
        }
        console.log('🚀', room);
        res.json(room)

        next()
    } catch (error) {
        next(error)
    }
})




module.exports = router