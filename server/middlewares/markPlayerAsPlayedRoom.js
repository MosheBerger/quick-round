const DB = require("../DB")

const markPlayerAsPlayedRoom = async (req, res, next) => {

    const { client, roomId } = req
    const { userId } = req.body

    try {
        await DB.rooms.showOne(client, roomId)

        const playersInRoom = await DB.players.showAllUsersPlayedIt(client, roomId)

        if (playersInRoom.some((p) => p.id == userId)) {
            // throw { statusCode: 409, message: 'you already here!' }
            // res.json({ result: true })
            next()
            return
        }

        const result = await DB.players.markAsPlayedByUser(client, roomId, userId)
        console.log('result', result);

        // res.json({ result: result })
        next()

    } catch (error) {
        next(error)
    }
}
module.exports = markPlayerAsPlayedRoom