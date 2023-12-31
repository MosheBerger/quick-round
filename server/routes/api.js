const express = require('express')
const clientManager = require('../middlewares/clientManager')
const errorHandler = require('../middlewares/errorHandler.js')

const router = express.Router()

router.use('/*',clientManager.connect)

const usersRouter = require('./users')
const roomsRouter = require('./rooms')
const resultsRouter = require('./results')
const gamesRouter = require('./games')
const roundRouter = require('./rounds.js')
const scoreBoardRouter = require('./scoreBoard.js')

router.use('/users/',usersRouter)
router.use('/rooms/',roomsRouter)
router.use('/results/',resultsRouter)
router.use('/games/',gamesRouter)
router.use('/rounds/',roundRouter)
router.use('/score-board/',scoreBoardRouter)


router.use(errorHandler)
router.use('/*',clientManager.close)

module.exports = router