const pool = require('./pool.js')
const fs = require('fs')
const pathMake = require('path')


const schemaPath = pathMake.join(__dirname, 'schema.sql')
const schema = fs.readFileSync(schemaPath).toString('utf8');

async function createAll() {
    console.log(await pool.query(schema));
}
// createAll()


async function removeAll() {
    console.log(await pool.query(`--sql
        DROP TABLE games_assets;
        DROP TABLE assets;
        DROP TABLE games_played_by_users;
        DROP TABLE likes;
        DROP TABLE games;
        DROP TABLE assets_approved_by_the_manager;
        DROP TABLE games_approved_by_the_manager;
        DROP TABLE finish_times;
        DROP TABLE users;
        DROP TABLE reported_games;
    `));
}
// removeAll()

async function showAll() {

    const res = await pool.query(`--sql
        SELECT * FROM games_assets;
        SELECT * FROM assets;
        SELECT * FROM games_played_by_users;
        SELECT * FROM likes;
        SELECT * FROM games;
        SELECT * FROM assets_approved_by_the_manager;
        SELECT * FROM games_approved_by_the_manager;
        SELECT * FROM finish_times;
        SELECT * FROM users;
        SELECT * FROM reported_games;
    `)


    // for some table data 
    const tableNames = [
        'games_assets', 'assets', 'games_played_by_users', 'likes',
        'games', 'assets_approved_by_the_manager', 'games_approved_by_the_manager',
        'finish_times', 'users',
        'reported_games',
    ]
    console.log(res);


    // for all tables data
    res.forEach((table, i) => {
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