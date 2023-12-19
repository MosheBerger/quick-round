const express = require('express')
const usersDB = require('../sql/users')


const router = express.Router()

router.get('/', (req, res) => {
    res.send('helllllllllllo my friend!!!!')
})

router.post('/login/:username', async (req, res, next) => {
    // const client = await pool.connect()
    try {
        const pool = require('../sql/pool')
        const { username } = req.params
        const { password } = req.body
        console.log(password);

        // if (username === undefined)
        //     throw { code: 400, message: 'please enter a username' }
        if (password === undefined)
            throw { code: 400, message: 'please enter a password' }


        const user = await usersDB.logIn(pool, username, password)
        console.log(user);
        // if (user === undefined)
        //     throw { code: 404, message: `the user ${username} doesn't exist` }


        res.json(user)

    } catch (error) {
        res.send(error);
    
    } finally{
        // client.release()
    }
})


module.exports = router