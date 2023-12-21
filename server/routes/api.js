const express = require('express')
const pool = require('../sql/pool')
// const usersDB = require('../sql/users')
const DB = require('../DB')


const router = express.Router()

//todo connect clientManager middleware

router.get('/', (req, res) => {
    res.send('helllllllllllo my friend!!!!')
})

router.get('/rooms/:roomId/join/:userId', async (req, res) => {
    const { userId, roomId } = req.params

    const client = await pool.connect()
    try {
        const room = await DB.rooms.showOne(client, roomId)
        // const result = await DB.players.leaveRoom(client, roomId, userId)
        const playersInRoom = await DB.players.showAllInRoom(client, roomId)

        if (
            playersInRoom.length >= room.numofplayers
            || playersInRoom.some((p) => p.id == userId)
        ) {
            throw new Error('the room is full')
        }

        const result = await DB.players.joinRoom(client, roomId, userId)
        console.log('result', result);
        res.json({ result: result })

    } catch (error) {
        console.log(error);

    } finally {
        client.release()
    }
})
router.get('/rooms/:roomId/leave/:userId', async (req, res) => {
    const { userId, roomId } = req.params

    const client = await pool.connect()
    try {
        const result = await DB.players.leaveRoom(client, roomId, userId)
        console.log('result', result);
        res.json({ result: result })

    } catch (error) {
        console.log(error);

    } finally {
        client.release()
    }
})

router.get('/rooms', async (req, res) => {
    const client = await pool.connect()
    try {
        const rooms = await DB.rooms.showAll(client)

        for (let i = 0; i < rooms.length; i++) {
            const roomId = rooms[i].id
            rooms[i].playersInRoom = await DB.players.countInRoom(client, roomId)
        }

        console.log(rooms);
        res.json(rooms)
    } catch (error) {
        console.log(error);

    } finally {
        client.release()
    }
})

router.post('/login/:username', async (req, res, next) => {
    const client = await pool.connect()
    try {
        const { username } = req.params
        const { password } = req.body
        // console.log(password);

        // if (username === undefined)
        //     throw { code: 400, message: 'please enter a username' }
        if (password === undefined)
            throw { code: 400, message: 'please enter a password' }


        const user = await DB.users.logIn(client, username, password)
        // console.log(user);
        // if (user === undefined)
        //     throw { code: 404, message: `the user ${username} doesn't exist` }


        res.json(user)

    } catch (error) {
        res.send(error);

    } finally {
        client.release()
    }
})


module.exports = router