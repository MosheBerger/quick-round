const express = require('express')
const DB = require('../DB').games


const router = express.Router()

//GET
// DB.show
router.get('/:gameId', async (req, res, next) => {

    const client = req.client
    const { gameId } = req.params
    try {
        const game = await DB.showGame(client, gameId)

        console.log(game);
        res.json(game)

        next()
    } catch (error) {
        next(error)
    }
})

// Random settings
router.get('random-settings/:gameId', async (req, res, next) => {

    const client = req.client
    const { gameId } = req.params
    try {
        // const game = await DB.showGame(client, gameId)
        const game = {result:'under construction'}
        console.log(game);
        res.json(game)

        next()
    } catch (error) {
        next(error)
    }
})


// CREATE
// DB.createGame
router.post('/', async (req, res, next) => {

    const client = req.client
    const { name, description, settings, imageURL, genre } = req.body

    try {
        const newGame = await DB.createGame(client, name, description, settings, imageURL, genre)

        console.log(newGame);
        res.json(newGame)

        next()
    } catch (error) {
        next(error)
    }
})

//GET ALL
// DB.showAll
router.get('/', async (req, res, next) => {

    const client = req.client
    try {
        const games = await DB.showAll(client)

        console.log(games);
        res.json(games)

        next()
    } catch (error) {
        next(error)
    }
})



module.exports = router