const express = require('express')
const roundsDB = require('../../DB').rounds


const router = express.Router()
// GET ALL IN SPECIFIC ROOM
router.get('/', async (req, res, next) => {
console.log('hi');
    const { client, roomId } = req

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