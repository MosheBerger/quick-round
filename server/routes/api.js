const express = require('express')
const clientManager = require('../middlewares/clientManager')
const errorHandler = require('../middlewares/errorHandler.js')

const router = express.Router()

router.use('/*',clientManager.connect)

const usersRouter = require('./users')
const roomsRouter = require('./rooms')
// const gameRouter = require('./games')
const roundRouter = require('./rounds.js')

router.use('/users/',usersRouter)
router.use('/rooms/',roomsRouter)
// router.use('/games/',gameRouter)
router.use('/rounds/',roundRouter)


router.use(errorHandler)
router.use('/*',clientManager.close)

module.exports = router