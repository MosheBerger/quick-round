require('dotenv').config()
const pg = require('pg')

 
const pool = new pg.Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:true
})

async function createAllTables(){
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
        country VARCHAR(255),
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


// ALTER TABLE
// rounds ADD CONSTRAINTEGER rounds_room_id_foreign FOREIGN KEY(room_id) REFERENCES rooms(id);
// ALTER TABLE
// rounds ADD CONSTRAINTEGER rounds_game_id_foreign FOREIGN KEY(game_id) REFERENCES games(id);
// ALTER TABLE
// players ADD CONSTRAINTEGER players_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id);
// ALTER TABLE
// results ADD CONSTRAINTEGER results_round_id_foreign FOREIGN KEY(round_id) REFERENCES rounds(id);
// ALTER TABLE
// players ADD CONSTRAINTEGER players_room_id_foreign FOREIGN KEY(room_id) REFERENCES rooms(id);
// ALTER TABLE
// results ADD CONSTRAINTEGER results_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id);

module.exports = pool