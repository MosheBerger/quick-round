const express = require('express')
const DB = require('../DB')


const router = express.Router()

// CREATE
router.post('/', async (req, res, next) => {

    const client = req.client
    const { name, numOfRounds, manager, rounds } = req.body

    try {
        await client.query('BEGIN')
        const newRoom = await DB.rooms.create(client, name, numOfRounds, manager)
        console.log('🚀 -> router.post -> newRoom:', newRoom)

        rounds.forEach(r => r.roomId = newRoom.id);

        const roundsResult = await DB.rounds.createMany(client, rounds)
        newRoom.rounds = roundsResult
        console.log(newRoom);

        res.json(newRoom)
        await client.query('COMMIT')
        next()

    } catch (error) {
        await client.query('ROLLBACK')
        next(error)
    }
})

//GET ALL
router.get('/', async (req, res, next) => {

    const client = req.client
    try {
        const rooms = await DB.rooms.showAll(client)

        for (const room of rooms) {
            const roomId = room.id
            room.playersInRoom = await DB.players.countInRoom(client, roomId)
        }

        console.log(rooms);
        res.json(rooms)

        next()
    } catch (error) {
        next(error)
    }
})


//JOIN
router.get('/:roomId/join/:userId', async (req, res, next) => {

    const client = req.client
    const { userId, roomId } = req.params

    try {
        const room = await DB.rooms.showOne(client, roomId)
        const playersInRoom = await DB.players.showAllInRoom(client, roomId)

        // if (playersInRoom.length >= room.numofplayers) {
        //     throw { statusCode: 403, message: 'the room is full' }
        // }
        if (playersInRoom.some((p) => p.id == userId)) {
            // throw { statusCode: 409, message: 'you already here!' }
            res.json({ result: true })
            next()
            return
        }

        const result = await DB.players.joinRoom(client, roomId, userId)
        console.log('result', result);

        res.json({ result: result })
        next()

    } catch (error) {
        next(error)
    }
})


//LEAVE
// router.get('/:roomId/leave/:userId', async (req, res, next) => {

//     const client = req.client
//     const { userId, roomId } = req.params

//     try {
//         const result = await DB.players.leaveRoom(client, roomId, userId)
//         console.log('result', result);
//         res.json({ result: result })

//         next()
//     } catch (error) {
//         next(error)
//     }
// })



module.exports = router