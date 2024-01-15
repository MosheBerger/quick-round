const pool = require("./pool");


async function markAsPlayedByUser(client, roomId, userId) {
    try {

        const query = {
            text: `
            INSERT INTO rooms_users(room_id, user_id)
            VALUES($1,$2)
        `,
            values: [roomId, userId]
        }
        const res = await client.query(query)

        return (res.rowCount === 1)
    } catch (error) {
        console.log(error);
    }
}

async function removeByRoom(client, roomId) {
        const query = {
            text: `
            DELETE FROM rooms_users
            WHERE room_id = $1
        `,
            values: [roomId]
        }
        const res = await client.query(query)
        return {
            operation: res.command,
            success: (res.rowCount > 0),
            ...res.rows[0], //:id
        }
}

async function showAllUsersPlayedIt(client, roomId) {
    try {
        const query = {
            text: `--sql
            SELECT
                u.id,
                u.name,
                u.avatar

            FROM rooms_users p
            
            LEFT JOIN users u
                ON p.user_id = u.id

            WHERE p.room_id = $1
        `,
            values: [roomId]
        }
        const res = await client.query(query)
        return res.rows
    } catch (error) {
        console.log(error);
    }
}
async function countUsersPlayedIt(client, roomId) {
    try {
        const query = {
            text: `--sql
            SELECT
                COUNT(*)
            FROM rooms_users
            WHERE room_id = $1
        `,
            values: [roomId]
        }
        const res = await client.query(query)
        return res.rows[0].count
        
    } catch (error) {
        console.log(error);
    }
}


const players = {
    markAsPlayedByUser,
    showAllUsersPlayedIt,
    countUsersPlayedIt,
    removeByRoom,
}

module.exports = players


const test = async () => {
    const client = await pool.connect()
    console.log( await players.showAllUsersPlayedIt(client,22));
    // console.log( await players.countInRoom(client, 2));
    client.release(true)
}
// test()