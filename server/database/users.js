const pool = require('./pool')

async function showAll() {
    const result = await pool.query('SELECT id, username, avatar FROM users')
    return result.rows;

}

async function create(username, password, email, avatar) {
    try {
        const query = {
            text: `
                INSERT INTO users(username, password, email, avatar)
                VALUES($1,$2,$3,$4)
                RETURNING *  
            `,
            values: [username, password, email, avatar],
        }

        const res = await pool.query(query)

        return await res.rows[0]


    } catch (error) {
        return {
            errorCode: error.code,
            detail: error.detail
        }
    }
}

async function showProfile(userId) {
    try {
        const query = {
            text: `
            SELECT 
            id,
            username,
            avatar
            FROM users
            WHERE id = $1 
            `,
            values: [userId]
        }

        const res = await pool.query(query)

        pool.end()
        return res.rows[0]

    } catch (error) {
        console.log(error);
    }
}

async function logIn(username, password) {
    try {
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

    } catch (error) {
        console.log(error);
    }
}

async function checkIfExist(username) {
    try {
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

    } catch (error) {
        console.log(error);
    }
}

async function updateAvatar(username, password, avatar) {
    try {
        const query = {
            text: `
            UPDATE users
            SET avatar = $3
            WHERE username = $1
                AND password = $2
            RETURNING *
            `,
            values: [username, password, avatar]
        }

        const res = await pool.query(query)

        return res.rows[0]


    } catch (error) {
        return {
            errorCode: error.code,
            detail: error.detail
        }
    }

}


const users = {
    create,
    logIn,
    showProfile,
    showAll,
    checkIfExist,
    updateAvatar,
}

module.exports = users



async function tests() {
    // console.log('---TEST---');
    // // const result = await addUser('moishy6', '12345678', 'mebyberger@gmail.com', 'moishy1')
    // const result = await checkIfExist('moishy3')
    // // const result = await getUser('moishy3','12345678')

    // // const result = await showAll()

    // console.table(result);
}
// tests()
