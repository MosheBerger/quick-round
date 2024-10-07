const jsonwebtoken = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;

function create(userData) {
    const token = jsonwebtoken.sign(userData, secret)
    return token
}

async function verify(req, res, next) {
    try {
        const authentication = req.headers.authentication
        console.log('🚀 -> verify -> authentication:', authentication)

        if (!authentication)
            throw { statusCode: 401, message: 'משתשמש לא מזוהה במערכת אנא התחבר שוב' }

        const token = authentication.split(' ')[1]
        const result = jsonwebtoken.verify(token, secret)

        req.userId = result.id
        console.log('✔️ verified');
        next()

    } catch (error) {
        next(error)
    }
}

const jwt = {
    create,
    verify
}

module.exports = jwt