const pool = require('./pool.js')

async function createAll() {

    console.log(await pool.query(`--sql
    CREATE TABLE rooms_users(
        id BIGSERIAL NOT NULL PRIMARY KEY,
        room_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        UNIQUE (room_id, user_id)
    );


    CREATE TABLE rooms(
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        numOfRounds INTEGER NOT NULL,
        manager BIGINT NOT NULL
    );
    


    CREATE TABLE games(
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(20) UNIQUE NOT NULL,
        description VARCHAR(255),
        settings JSON,
        imageURL VARCHAR(255),
        genre VARCHAR(20)
    );


    
    CREATE TABLE rounds(
        id BIGSERIAL NOT NULL PRIMARY KEY,
        room_id BIGINT NOT NULL,
        round_num INTEGER NOT NULL,
        game_id BIGINT NOT NULL,
        settings JSON,
        UNIQUE (room_id, round_num)
    );


    CREATE TABLE users(
        id BIGSERIAL NOT NULL PRIMARY KEY,
        email VARCHAR(75) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        name VARCHAR(20) NOT NULL,
        avatar VARCHAR(50) NOT NULL
    );
    
    CREATE TABLE finish_times(
        id BIGSERIAL NOT NULL PRIMARY KEY,
        user_id BIGINT NOT NULL,
        room_id BIGINT NOT NULL,
        finish_time BIGINT NOT NULL
    );

    CREATE TABLE likes(
        id BIGSERIAL NOT NULL PRIMARY KEY,
        room_id BIGINT NOT NULL,
        user_id BIGINT NOT NULL,
        like_it BOOLEAN NOT NULL,
        UNIQUE (room_id, user_id)
    );
    
    `))
}
// createAll()


async function removeAll() {
    console.log(await pool.query(`
    DROP TABLE rooms_users;
    DROP TABLE rooms;
    DROP TABLE games;
    DROP TABLE rounds;
    DROP TABLE users;
    DROP TABLE finish_times;
    DROP TABLE likes;
    `));
}
// removeAll()

async function showAll() {

    const res = await pool.query(`
    SELECT * FROM rooms_users;
    SELECT * FROM rooms;
    SELECT * FROM games;
    SELECT * FROM rounds;
    SELECT * FROM users;
    SELECT * FROM finish_times;
    SELECT * FROM likes;
    `)


    // for some table data 
    const tableNames = ['rooms_users', 'rooms', 'games', 'rounds','users', 'finish_times', 'likes',]
    console.log(res);


    // for all tables data
    res.forEach((table,i) => {
        console.log(tableNames[i]);
        // console.log(table.fields.map(field => field.name))
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