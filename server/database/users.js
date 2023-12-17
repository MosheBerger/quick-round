const pool = require('./pool')

async function selectAllUsers() {
    const result = await pool.query('SELECT * FROM users')
    console.log(result);
}

async function addUser(username, password, country, email, avatar) {

    const query = {
        text: `
            INSERT INTO users(username, password, country, email, avatar)
            VALUES($1,$2,$3,$4,$5)    
        `,
        values: [username, password, country, email, avatar]
    }

    const result = await pool.query(query)
    return result
}



async function main(){
    const result = await addUser('moishy','12345678','IL','mebybeerger@gmail.com','moishy1')
    console.log(result);
}
main()