const pool = require('./pool')

async function showAllUsers() {
    const result = await pool.query('SELECT * FROM users')
    console.table(result.rows);

}

async function addUser(username, password, email, avatar) {
    try {

        const query = {
            text: `
            INSERT INTO users(username, password, email, avatar)
            VALUES($1,$2,$3,$4)    
            `,
            values: [username, password, email, avatar]
        }

        await pool.query(query)

        return await getUser(username, password)


    } catch (error) {
        return {
            errorCode: error.code,
            detail: error.detail
        }

    }
}

async function getUser(username, password) {
    const query = {
        text: `
            SELECT * FROM users
            WHERE username = $1 
            AND password = $2
        `,
        values: [username, password]
    }

    const res = await pool.query(query)

    pool.end()
    return res.rows[0]
}

async function checkIfExist(username) {
    const query = {
        text: `
            SELECT username FROM users
            WHERE username = $1 
        ;`,
        values: [username]
    }

    const res = await pool.query(query)

    pool.end()

    return (res.rowCount === 1)
}

async function updateAvatar(username, password, avatar) {
    try {

        const query = {
            text: `
            UPDATE users
            SET avatar = $3
            WHERE username = $1
                AND password = $2
            `,
            values: [username, password, avatar]
        }

        const res = await pool.query(query)

        return await getUser(username, password)


    } catch (error) {
        return {
            errorCode: error.code,
            detail: error.detail
        }
    }

}


const users = {
    addUser,
    getUser,
    checkIfExist,
    updateAvatar,
}

module.exports = users



async function tests() {
    console.log('---TEST---');
    // const result = await addUser('moishy3', '12345678', 'mebyberger@gmail.com', 'moishy1')
    // const result = await checkIfExist('moishy3')
    // const result = await getUser('moishy3','12345678')

    // showAllUsers()

    console.log(result);
}
tests()