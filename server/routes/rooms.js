const express = require('express')
const DB = require('../DB')


const router = express.Router()

const extractRoomId = ((req, res, next) => {
    req.roomId = req.params.roomId
    next()
})
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

// DELETE
router.delete('/:roomId/', async (req, res, next) => {

    const client = req.client
    const { roomId } = req.params

    try {
        await client.query('BEGIN')

        const results = []
        results.push(await DB.rooms.remove(client, roomId))
        results.push(await DB.likes.removeByRoom(client, roomId))
        results.push(await DB.players.removeByRoom(client, roomId))
        results.push(await DB.rounds.removeByRoom(client, roomId))
        results.push(await DB.finishTimes.removeByRoom(client, roomId))

        console.log(results);

        for (const result of results) {
            if (!result) throw { statusCode: 500, message: "can't delete, please try again" }
        }

        res.json(results)
        await client.query('COMMIT')

        next()
    } catch (error) {
        next(error)
        await client.query('ROLLBACK')

    }
})

//GET
router.get('/:roomId/', async (req, res, next) => {

    const client = req.client
    const { roomId } = req.params

    try {
        const room = await DB.rooms.showAllDataPerRoom(client, roomId)

        console.log(room);
        res.json(room)

        next()
    } catch (error) {
        next(error)
    }
})

//GET ALL
router.get('/', async (req, res, next) => {

    const client = req.client
    const userId = req.userId

    try {
        const rooms = await DB.rooms.showAll(client)
        const userLiked = await DB.likes.showLikedByUser(client, userId||0)

        for (const room of rooms) {
            const roomId = room.id

            room.userLiked = (userLiked.some(l=> l.room_id === roomId))

            room.manager = await DB.users.showProfile(client, room.manager)
            room.likes = await DB.likes.countLikes(client, roomId)
            room.playCount = await DB.players.countUsersPlayedIt(client, roomId)
        }

        console.log(rooms);
        res.json(rooms)

        next()
    } catch (error) {
        next(error)
    }
})

// GET user liked
router.get('/liked/:userId', async (req, res, next) => {
    const client = req.client
    const { userId } = req.params

    try {
        const results = await likesDB.showLikedByUser(client, userId)
        ///TODO !WE ARE HERE!!
        console.log(results);
        res.json(results)

        next()
    } catch (error) {
        next(error)
    }
})

//JOIN
router.post('/:roomId/join/:userId', async (req, res, next) => {

    const client = req.client
    const { userId, roomId } = req.params

    try {
        await DB.rooms.showOne(client, roomId)

        const playersInRoom = await DB.players.showAllUsersPlayedIt(client, roomId)

        if (playersInRoom.some((p) => p.id == userId)) {
            // throw { statusCode: 409, message: 'you already here!' }
            res.json({ result: true })
            next()
            return
        }

        const result = await DB.players.markAsPlayedByUser(client, roomId, userId)
        console.log('result', result);

        res.json({ result: result })
        next()

    } catch (error) {
        next(error)
    }
})




// rounds
const roundRouter = require('./rounds.js')
router.use('/:roomId/rounds/', extractRoomId, roundRouter)

const likesRouter = require('./likes.js')
router.use('/like/', likesRouter)

const resultsRouter = require('./results')
const scoreBoardRouter = require('./scoreBoard.js')
router.use('/results/', likesRouter)
router.use('/score-board/', scoreBoardRouter)


module.exports = router