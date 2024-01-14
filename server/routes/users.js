const express = require('express')
const usersDB = require('../DB').users
const { isValid, type } = require('../utils/validation')

const router = express.Router()


//LOG IN
router.post('/login/:email', async (req, res, next) => {
    const client = req.client
    try {
        const { email } = req.params
        const { password } = req.body
        console.log('email', email);
        console.log('password', password);

        if (!isValid(email, type.email))
            throw { statusCode: 400, message: 'בטוח שהכנסת אימייל תקין?' }

        if (!isValid(password, type.password))
            throw { statusCode: 400, message: 'בטוח שהכנסת סיסמה תקינה?' }

        const user = await usersDB.logIn(client, email, password)
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
router.post('/signup/:email', async (req, res, next) => {
    const client = req.client
    try {
        const { email } = req.params
        const { password, name, avatar } = req.body
        console.log('email', email);
        console.log('password', password);

        if (!isValid(email, type.email))
            throw { statusCode: 400, message: 'בטוח שהכנסת כתובת אימייל תקינה?' }

        if (!isValid(password, type.password))
            throw { statusCode: 400, message: 'בטוח שהכנסת סיסמה תקינה?' }

        if (!isValid(name, type.email))
            throw { statusCode: 400, message: 'בטוח שהכנסת שם משתמש תקין?' }

        const isExist = await usersDB.checkIfExist(client, email)
        console.log('exist', isExist);

        if (isExist)
            throw { statusCode: 403, message: 'אימייל זה כבר קיים במערכת' }

        const user = await usersDB.create(client, name, password, email, avatar)
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
router.get('/signup/available/:email', async (req, res, next) => {
    const client = req.client
    try {
        const { email } = req.params

        const isExist = await usersDB.checkIfExist(client, email)
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

        const user = await usersDB.showProfile(client, userId)
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
router.put('/update/:userId', async (req, res, next) => {
    const client = req.client
    try {
        const { userId } = req.params

        const oldData = await usersDB.showProfile(client, userId)
        
        if (oldData === undefined)
            throw { statusCode: 400, message: `an error append` }

        const name = req.body?.name || oldData.name
        const avatar = req.body?.avatar || oldData.avatar

        //todo validation for avatar
        const user = await usersDB.updateInfo(client, id, name, avatar)
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