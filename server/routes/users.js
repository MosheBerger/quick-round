const express = require('express')
const pool = require('../sql/pool')
const DB = require('../DB').users


const router = express.Router()


//LOG IN
router.post('/login/:username', async (req, res, next) => {
    const client = await pool.connect()
    try {
        const { username } = req.params
        const { password } = req.body
        console.log('username',username);
        console.log('password',password);

        if (username === undefined)
            throw { code: 400, message: 'please enter a username' }
        if (password === undefined)
            throw { code: 400, message: 'please enter a password' }


        const user = await DB.logIn(client, username, password)
        // console.log(user);
        // if (user === undefined)
        //     throw { code: 404, message: `the user ${username} doesn't exist` }

        res.json(user)

    } catch (error) {
        next(error)

    } finally {
        client.release()
    }
})


module.exports = router