const express = require('express')
const pool = require('../sql/pool')
const DB = require('../DB').users
const v = require('../utils/validation')

const router = express.Router()


//LOG IN
router.post('/login/:username', async (req, res, next) => {
    const client = await pool.connect()
    try {
        const { username } = req.params
        const { password } = req.body
        console.log('username', username);
        console.log('password', password);

         if (v.isValid(username, v.t.username))
            throw { statusCode: 400, message: 'please enter a username' }
        
        if (v.isValid(password, v.t.password))
            throw { statusCode: 400, message: 'please enter a password' }

        const user = await DB.logIn(client, username, password)
        console.log(user);

        if (!user)
            throw { statusCode: 404, message: `the user ${username} doesn't exist` }

        res.json(user)
        next()

    } catch (error) {
        next(error)
    }
})


module.exports = router