const express = require('express')
const clientManager = require('../middlewares/clientManager')
const errorHandler = require('../middlewares/errorHandler.js')

const router = express.Router()

router.use('/*',clientManager.connect)

const usersRouter = require('./users')
const roomsRouter = require('./rooms')
// const roomRouter = require('./games')
// const roomRouter = require('./rounds')

router.use('/users/',usersRouter)
router.use('/rooms/',roomsRouter)
// router.use('/games/',)
// router.use('/rounds/',)


router.use(errorHandler)
router.use('/*',clientManager.close)

module.exports = router