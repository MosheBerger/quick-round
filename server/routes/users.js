const express = require('express')
const pool = require('../sql/pool')
const DB = require('../DB').users
const { isValid, type } = require('../utils/validation')

const router = express.Router()


//LOG IN
router.post('/login/:username', async (req, res, next) => {
    const client = req.client
    try {
        const { username} = req.params
        const { password } = req.body
        console.log('username', username);
        console.log('password', password);

        if (!isValid(username, type.username))
            throw { statusCode: 400, message: 'please enter a username' }

        if (!isValid(password, type.password))
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

//SIGN UP
router.post('/signup/:username', async (req, res, next) => {
    const client = req.client
    try {
        const { username } = req.params
        const { password, email, avatar } = req.body
        console.log('username', username);
        console.log('password', password);

        if (!isValid(username, type.username))
            throw { statusCode: 400, message: 'please enter a valid username' }

        if (!isValid(password, type.password))
            throw { statusCode: 400, message: 'please enter a valid password' }

        if (!isValid(email, type.email))
            throw { statusCode: 400, message: 'please enter a valid email' }

        const user = await DB.create(client, username, password, email, avatar)
        console.log(user);

        if (!user)
            throw { statusCode: 400, message: `an error append` }

        res.json(user)
        next()

    } catch (error) {
        next(error)
    }
})

// user exist?
router.get('/signup/:username', async (req, res, next) => {
    const client = req.client
    try {
        const { username } = req.params

        const isExist = await DB.checkIfExist(client, username)
        console.log(isExist);

        if (isExist === undefined)
            throw { statusCode: 400, message: `an error append` }

        res.json({ result: isExist })
        next()

    } catch (error) {
        next(error)
    }
})


// SHOW PROFILE
router.get('/show/:userId', async (req, res, next) => {
    const client = req.client
    try {
        const { userId } = req.params

        const user = await DB.showProfile(client, userId)
        console.log(user);

        if (user === undefined)
            throw { statusCode: 400, message: `an error append` }

        res.json({ user })
        next()

    } catch (error) {
        next(error)
    }
})



// SHOW PROFILE
router.put('/update/:username', async (req, res, next) => {
    const client = req.client
    try {
        const { username } = req.params
        const {password,avatar} = req.body

        //todo
        const user = await DB.updateAvatar(client, username, password, avatar)
        console.log(user);

        if (user === undefined)
            throw { statusCode: 400, message: `an error append` }

        res.json({ user })
        next()

    } catch (error) {
        next(error)
    }
})


module.exports = router