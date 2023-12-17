require('dotenv').config()
const pg = require('pg')

 
const pool = new pg.Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:true
})

async function createAllTables(){
    console.log(await pool.query(`
    CREATE TABLE "players"(
        "id" BIGINT NOT NULL,
        "room_id" BIGINT NOT NULL,
        "user_id" BIGINT NOT NULL
    );
    ALTER TABLE
        "players" ADD PRIMARY KEY("id");
    CREATE TABLE "rooms"(
        "id" BIGINT NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "numOfPlayers" INTEGER NOT NULL,
        "numOfRounds" INTEGER NOT NULL,
        "manager" VARCHAR(255) NOT NULL
    );
    ALTER TABLE
        "rooms" ADD PRIMARY KEY("id");
    CREATE TABLE "games"(
        "id" BIGINT NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "description" VARCHAR(255) NOT NULL,
        "settings" JSON NOT NULL,
        "imageURL" VARCHAR(255) NOT NULL,
        "genre" VARCHAR(255) NOT NULL
    );
    ALTER TABLE
        "games" ADD PRIMARY KEY("id");
    CREATE TABLE "rounds"(
        "id" BIGINT NOT NULL,
        "room_id" BIGINT NOT NULL,
        "round_num" BIGINT NOT NULL,
        "game_id" BIGINT NOT NULL,
        "settings" JSON NOT NULL
    );
    ALTER TABLE
        "rounds" ADD PRIMARY KEY("id");
    CREATE TABLE "users"(
        "id" BIGINT NOT NULL,
        "username" VARCHAR(255) NULL,
        "password" VARCHAR(255) NULL,
        "country" VARCHAR(255) NULL,
        "email" VARCHAR(255) NULL,
        "avatar" VARCHAR(255) NULL
    );
    ALTER TABLE
        "users" ADD PRIMARY KEY("id");
    CREATE TABLE "results"(
        "id" BIGINT NOT NULL,
        "round_id" BIGINT NULL,
        "user_id" BIGINT NULL,
        "success" BOOLEAN NOT NULL,
        "finish_time" TIME(0) WITHOUT TIME ZONE NOT NULL
    );
    ALTER TABLE
        "results" ADD PRIMARY KEY("id");
    ALTER TABLE
        "rounds" ADD CONSTRAINT "rounds_room_id_foreign" FOREIGN KEY("room_id") REFERENCES "rooms"("id");
    ALTER TABLE
        "rounds" ADD CONSTRAINT "rounds_game_id_foreign" FOREIGN KEY("game_id") REFERENCES "games"("id");
    ALTER TABLE
        "players" ADD CONSTRAINT "players_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
    ALTER TABLE
        "results" ADD CONSTRAINT "results_round_id_foreign" FOREIGN KEY("round_id") REFERENCES "rounds"("id");
    ALTER TABLE
        "players" ADD CONSTRAINT "players_room_id_foreign" FOREIGN KEY("room_id") REFERENCES "rooms"("id");
    ALTER TABLE
        "results" ADD CONSTRAINT "results_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
    
    `))

}

module.exports = pool