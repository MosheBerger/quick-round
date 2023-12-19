
async function showAll(client) {
    const result = await client.query('SELECT id, username, avatar FROM users')
    return result.rows;

}

async function create(client, username, password, email, avatar) {
    try {
        const query = {
            text: `
                INSERT INTO users(username, password, email, avatar)
                VALUES($1,$2,$3,$4)
                RETURNING *  
            `,
            values: [username, password, email, avatar],
        }

        const res = await client.query(query)

        return await res.rows[0]


    } catch (error) {
        return {
            errorCode: error.code,
            detail: error.detail
        }
    }
}

async function showProfile(client, userId) {
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

        const res = await client.query(query)
    
        return res.rows[0]

    } catch (error) {
        console.log(error);
    }
}

async function logIn(client, username, password) {
    try {
        const query = {
            text: `
            SELECT * FROM users
            WHERE username = $1 
            AND password = $2
            `,
            values: [username, password]
        }

        const res = await client.query(query)

        return res.rows[0]

    } catch (error) {
        console.log(error);
    }
}

async function checkIfExist(client, username) {
    try {
        const query = {
            text: `
            SELECT username FROM users
            WHERE username = $1 
        ;`,
            values: [username]
        }

        const res = await client.query(query)


        return (res.rowCount === 1)

    } catch (error) {
        console.log(error);
    }
}

async function updateAvatar(client, username, password, avatar) {
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

        const res = await client.query(query)

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
