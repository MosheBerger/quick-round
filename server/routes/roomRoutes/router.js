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


const scoreBoardRouter = require('./scoreBoard.js')
router.use('/score-board/', scoreBoardRouter)

module.exports = router