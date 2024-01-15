const express = require('express')
const clientManager = require('../middlewares/clientManager')
const errorHandler = require('../middlewares/errorHandler.js')

const router = express.Router()

router.use('/*', clientManager.connect)

// users
const usersRouter = require('./users')
router.use('/users/', usersRouter)

// games
const gamesRouter = require('./games')
router.use('/games/', gamesRouter)

// rooms / likes / players / finish-times / scores / rounds
const roomsRouter = require('./rooms')
router.use('/rooms/', roomsRouter)


router.use(errorHandler)
router.use('/*', clientManager.close)

module.exports = router