const pool = require('./pool.js')


async function joinRoom(roomId, userId) {
    try {

        const query = {
            text: `
            INSERT INTO players(room_id, user_id)
            VALUES($1,$2)
        `,
            values: [roomId, userId]
        }
        const res = await pool.query(query)

        return (res.rowCount === 1)
    } catch (error) {
        console.log(error);
    }
}

async function leaveRoom(roomId, userId) {
    try {
        const query = {
            text: `
            DELETE FROM players
            WHERE room_id = $1
                AND user_id = $2
        `,
            values: [roomId, userId]
        }
        const res = await pool.query(query)
        return (res.rowCount === 1)
    } catch (error) {
        console.log(error);
    }
}

async function showAllInRoom(roomId) {
    try {
        const query = {
            text: `
            SELECT
                u.id user_id,
                u.username,
                u.avatar

            FROM players p
            
            LEFT JOIN users u
                ON p.user_id = u.id

            WHERE p.room_id = $1
        `,
            values: [roomId]
        }
        const res = await pool.query(query)
        return res.rows
    } catch (error) {
        console.log(error);
    }
}
async function countInRoom(roomId) {
    try {
        const query = {
            text: `
            SELECT
                COUNT(*)
            FROM players
            WHERE room_id = $1
            
        `,
            values: [roomId]
        }
        const res = await pool.query(query)
        return res.rows[0]
        
    } catch (error) {
        console.log(error);
    }
}


const players = {
    joinRoom,
    leaveRoom,
    showAllInRoom,
    countInRoom
}

module.exports = players



const test = async () => {
    // console.log( await players.showAllInRoom(2));
    // console.log( await players.countInRoom(2));
}
// test()