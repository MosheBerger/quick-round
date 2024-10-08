const users = require('../repositories/users')


const userServices = {

    signup: async (userData) => {
        // todo validation

        const isExist = await users.checkIfExist(userData.email)
        if (isExist) throw { statusCode: 403, message: 'אימייל זה כבר קיים במערכת' }

        const newUser = await users.create(userData)

        res.json(newUser)
    },

    login: async({ email, password }) => {
        // todo validation

        const user = await users.logIn({ email, password })
        
        // todo add token
        
        res.json(user)
    }, 

    showAll: async () => {
        const allUsers = await allUsers.showAll()
        res.json(allUsers)
    },

    showProfile: async ({ userId }) => {
        const user = await users.showProfile({ userId })
        res.json(user)
    },

    updateInfo: async ({ userId, name, avatar }) => {
        const user = await users.updateInfo({ userId, name, avatar })
        res.json(user)
    }
}

module.exports = userServices