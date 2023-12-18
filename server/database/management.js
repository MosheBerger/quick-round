const pool = require('./pool.js')

async function createAll() {

    console.log(await pool.query(`
    CREATE TABLE players(
        id SERIAL NOT NULL PRIMARY KEY,
        room_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL
    );

    CREATE TABLE rooms(
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        numOfPlayers SMALLINT NOT NULL,
        numOfRounds SMALLINT NOT NULL,
        manager INTEGER NOT NULL
    );


    CREATE TABLE games(
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        description VARCHAR(255),
        settings JSON,
        imageURL VARCHAR(255),
        genre VARCHAR(255)
    );


    CREATE TABLE rounds(
        id SERIAL NOT NULL PRIMARY KEY,
        room_id INTEGER NOT NULL,
        round_num INTEGER NOT NULL,
        game_id INTEGER NOT NULL,
        settings JSON
    );


    CREATE TABLE users(
        id SERIAL NOT NULL PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        email VARCHAR(75) NOT NULL,
        avatar VARCHAR(25) NOT NULL
    );


    CREATE TABLE results(
        id SERIAL NOT NULL PRIMARY KEY,
        round_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        success BOOLEAN NOT NULL,
        finish_time INTEGER NOT NULL
    );
    `))
}
// createAll()


async function removeAll() {
    console.log(await pool.query(`
    DROP TABLE results;
    DROP TABLE players;
    DROP TABLE rounds;
    DROP TABLE rooms;
    DROP TABLE games;
    DROP TABLE users;
    `));
}
// removeAll()

async function showAll() {

    const res = await pool.query(`
    SELECT * FROM results;
    SELECT * FROM players;
    SELECT * FROM rounds;
    SELECT * FROM rooms;
    SELECT * FROM games;
    SELECT * FROM users;
    `)


    // for some table data 
    // const [results, players, rounds, rooms, games, users,] = res
    // console.log(users.rows);


    // for all tables data
    res.forEach((table) => {
        console.log(table.fields.map(field => field.name))
        console.table(table.rows);
    });

}
// showAll()
async function close() {
    pool.end()
}


const management = {
    createAll,
    removeAll,
    showAll,
    close,
}

showAll()
module.exports = management