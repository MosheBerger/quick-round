const express = require('express')
const DB = require('../DB').users
const { isValid, type } = require('../utils/validation')

const router = express.Router()


//LOG IN
router.post('/login/:username', async (req, res, next) => {
    const client = req.client
    try {
        const { username } = req.params
        const { password } = req.body
        console.log('username', username);
        console.log('password', password);

        if (!isValid(username, type.email))
            throw { statusCode: 400, message: 'בטוח שהכנסת אימייל תקין?' }

        if (!isValid(password, type.password))
            throw { statusCode: 400, message: 'בטוח שהכנסת סיסמה תקינה?' }

        const user = await DB.logIn(client, username, password)
        console.log(user);

        if (!user)
            throw { statusCode: 404, message: 'אחד מהפרטים שהוקשו שגויים' }

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
            throw { statusCode: 400, message: 'בטוח שהכנסת שם משתמש תקין?' }

        if (!isValid(password, type.password))
            throw { statusCode: 400, message: 'בטוח שהכנסת סיסמה תקינה?' }

        if (!isValid(email, type.email))
            throw { statusCode: 400, message: 'בטוח שהכנסת כתובת אימייל תקינה?' }

        const isExist = await DB.checkIfExist(client, username)
        console.log('exist', isExist);

        if (isExist)
            throw { statusCode: 403, message: 'שם משתמש זה כבר קיים במערכת' }

        const user = await DB.create(client, username, password, email, avatar)
        console.log(user);

        if (!user)
            throw { statusCode: 500, message: `קרתה שגיאה` }

        res.json(user)
        next()

    } catch (error) {
        next(error)
    }
})

// user exist?
router.get('/signup/available/:username', async (req, res, next) => {
    const client = req.client
    try {
        const { username } = req.params

        const isExist = await DB.checkIfExist(client, username)
        console.log(isExist);

        if (isExist === undefined)
            throw { statusCode: 400, message: `an error append` }

        res.json({ available: !isExist })
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



// UPDATE AVATAR
router.put('/update/:username', async (req, res, next) => {
    const client = req.client
    try {
        const { username } = req.params
        const { password, avatar } = req.body

        //todo validation for avatar
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