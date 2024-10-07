const express = require('express')
const { verify } = require('../../middlewares/authenticationManager')
const likesDB = require('../../DB').likes

const router = express.Router()



// CREATE 
// router.post('/', verify, async (req, res, next) => {
//     const client = req.client
//     const { userId, roomId } = req
//     const { likeIt } = req.body

//     console.log('userId, roomId, likeIt', userId, roomId, likeIt);
//     try {
//         const results = await likesDB.create(client, roomId, userId, likeIt)

//         console.log(results);
//         res.json(results)

//         next()
//     } catch (error) {
//         next(error)
//     }
// })

// UPDATE
router.put('/', verify, async (req, res, next) => {
    const client = req.client
    const { userId, roomId } = req
    const { likeIt } = req.body

    try {
        const results = await likesDB.update(client, roomId, userId, likeIt)

        console.log(results);
        res.json(results)

        next()
    } catch (error) {
        next(error)
    }
})
// checkRoomByUser
router.get('/', verify, async (req, res, next) => {
    const client = req.client
    const { userId, roomId } = req

    
    try {
        const results = await likesDB.isThisGameLikedByUser(client, roomId, userId)

        console.log(results);
        res.json({isLiked:results})

        next()
    } catch (error) {
        next(error)
    }
})

module.exports = router