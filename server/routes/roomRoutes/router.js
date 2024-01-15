const express = require('express')

const router = express.Router()

// rounds
const roundRouter = require('./rounds.js')
router.use('/rounds/', roundRouter)

// likes
const likesRouter = require('./likes.js')
router.use('/like/', likesRouter)

// finish-times
const finishTimesRouter = require('./finishTimes')
router.use('/finish-times/', finishTimesRouter)


module.exports = router