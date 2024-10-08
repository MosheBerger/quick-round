// const pool = require("./pool");

/**
 * @typedef {{
 *  client: object,
 *  gameId: number,
 *  userId: number,
 *  date: Date
 * }} PlayedByUserData
 */

/**
 * @param {PlayedByUserData} data 
 */
async function markAsPlayedByUser(data) {
    const { client, gameId, userId, date } = data

        const query = {
            text: `--sql
            INSERT INTO games_played_by_users(game_id, user_id, date)
            VALUES($1,$2, $3)
        `,
            values: [gameId, userId, date]
        }
        const res = await client.query(query)

        return (res.rowCount === 1)
}

async function removeByGame({client, gameId}) {
        const query = {
            text: `--sql
            DELETE FROM games_played_by_users
            WHERE game_id = $1
            RETURNING id
        `,
            values: [gameId]
        }
        const res = await client.query(query)
        return {
            operation: res.command,
            success: (res.rowCount > 0),
            ...res.rows[0], //:id
        }
}

async function showAllUsersPlayedIt({client, gameId}) {
    // todo: fix: get just one per user
        const query = {
            text: `--sql
            SELECT
                u.id,
                u.name,
                u.avatar

            FROM games_played_by_users p
            
            LEFT JOIN users u
                ON p.user_id = u.id

            WHERE p.game_id = $1
        `,
            values: [gameId]
        }
        const res = await client.query(query)
        return res.rows
}
async function countPlayedIt({client, gameId}) {
        const query = {
            text: `--sql
            SELECT
                COUNT(*)
            FROM games_played_by_users
            WHERE game_id = $1
        `,
            values: [gameId]
        }
        const res = await client.query(query)
        return res.rows[0].count
        
}

async function countUsersPlayedIt({client, gameId}) {
    // todo: fix: get just one per user
        const query = {
            text: `--sql
            SELECT
                COUNT(*)
            FROM games_played_by_users
            WHERE game_id = $1
        `,
            values: [gameId]
        }
        const res = await client.query(query)
        return res.rows[0].count
        
}


const playersRepo = {
    markAsPlayedByUser,
    showAllUsersPlayedIt,
    countUsersPlayedIt,
    countPlayedIt,
    removeByGame,
}

module.exports = playersRepo


// const test = async () => {
    // const client = await pool.connect()
    // console.log( await players.showAllUsersPlayedIt(client,22));
    // // console.log( await players.countInRoom(client, 2));
    // client.release(true)
// }
// test()