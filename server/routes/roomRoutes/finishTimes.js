const express = require('express')
const markPlayerAsPlayedRoom = require('../../middlewares/markPlayerAsPlayedRoom')
 const { verify } = require('../../middlewares/authorizationManager')
const DB = require('../../DB').finishTimes


const router = express.Router()


// DB.create
router.post('/',verify,  async (req, res, next) => {
    const { client, roomId, userId } = req
    const { finishTime } = req.body

    try {
        const resultObj = await DB.create(client, userId, roomId, finishTime)

        console.log(resultObj);
        res.json(resultObj)

        next()
    } catch (error) {
        next(error)
    }
}, markPlayerAsPlayedRoom)


// DB.showByRoom
router.get('/', async (req, res, next) => {
    const client = req.client
    const { roomId } = req.params

    try {
        const results = await DB.showByRoom(client, roomId)

        console.log(results);
        res.json(results)

        next()
    } catch (error) {
        next(error)
    }
})




module.exports = router