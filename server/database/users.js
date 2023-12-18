const pool = require('./pool')

async function showAllUsers() {

    const result = await pool.query('SELECT * FROM users')
    console.log(result.rows);

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

        const result = await pool.query(query)
        // return result

    } catch (error) {
        if (error.code === 23505)
        return { errorCode: error.code, detail: `the username ${username} already exist`}
        console.log(error.detail);
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
}




const users = {

}

module.exports = users



async function tests() {
    const result = await addUser('moishy', '12345678', 'mebybeerger@gmail.com', 'moishy1')

    console.log(result);
}
tests()