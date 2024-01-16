
async function showAll(client) {
    const result = await client.query('SELECT id, name, avatar FROM users')
    return result.rows;

}

async function create(client, name, password, email, avatar) {
    try {
        const query = {
            text: `
                INSERT INTO users(name, password, email, avatar)
                VALUES($1,$2,$3,$4)
                RETURNING *  
            ;`,
            values: [name, password, email, avatar],
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
            name,
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

async function logIn(client, email, password) {
    console.log(client,email, password);
    try {
        const query = {
            text: `
            SELECT * FROM users
            WHERE email = $1 
            AND password = $2
            `,
            values: [email, password]
        }

        const res = await client.query(query)
        
        return res.rows[0]

    } catch (error) {
        console.log(error);
    }
}

async function checkIfExist(client, email) {
    try {
        const query = {
            text: `
            SELECT email FROM users
            WHERE email = $1 
        ;`,
            values: [email]
        }

        const res = await client.query(query)


        return (res.rowCount === 1)

    } catch (error) {
        console.log(error);
    }
}

async function updateInfo(client,id, name, avatar) {
    try {
        const query = {
            text: `
            UPDATE users
            SET avatar = $3, name = $2
            WHERE id = $1
            RETURNING *
            `,
            values: [id, name, avatar]
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
    updateInfo,
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
