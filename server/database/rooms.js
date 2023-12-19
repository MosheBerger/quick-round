
const players = require('./players.js')
const pool = require('./pool.js')
const rounds = require('./rounds.js')
const users = require('./users.js')

async function create(client, name, numOfPlayers, numOfRounds, manager) {
    try {

        const query = {
            text: `0
            INSERT INTO rooms(name, numOfPlayers, numOfRounds, manager)
            VALUES($1,$2,$3,$4)
            RETURNING *
        `,
            values: [name, numOfPlayers, numOfRounds, manager]
        }
        const res = await client.query(query)
        return res.rows[0]
    } catch (error) {
        console.log(error);
    }
}

async function showAll(client) {
    try {
        const query = {
            text: `
            SELECT
                rooms.*,
                m.username manager_name,
                m.avatar manager_avatar
            FROM rooms
            LEFT JOIN users m
                ON rooms.manager = m.id
                `,
            // LEFT JOIN players p
            //     ON rooms.id = p.room_id
            // LEFT JOIN users u
            //     ON p.user_id = u.id 
            // values: []
        }
        const res = await client.query(query)
        return res.rows
    } catch (error) {
        console.log(error);
    }
}
async function showOne(client, roomId) {
    try {
        const query = {
            text: `
                SELECT
                    *
                FROM rooms
                WHERE id = $1
            `,
            values:[roomId]
        }
        const res = await client.query(query)
        return res.rows[0]

    } catch (error) {
        console.log(error);
    }
}

async function showAllDataPerRoom(client, roomId) {
    try {
        const room = await showOne(client, roomId)
        room.manager = await users.showProfile(client, room.manager)
        room.playersInRoom = await players.countInRoom(client, roomId)
        room.rounds = await rounds.showByRoom(client, roomId)

        return room
    } catch (error) {
        console.log(error);
    }
}

const rooms = {
    create,
    showAll,
    showOne,
    showAllDataPerRoom,
}

module.exports = rooms



const test = async () => {
    // console.log(await rooms.create('החדר של אבי', 4, 2, 1));
    // console.log(await rooms.join(1, 1));
    // console.log(await rooms.join(1, 2));
    // console.log(await rooms.join(1, 4));
    // console.log(await rooms.join(2, 1));
    // console.log(await rooms.leave(5, 5));
    // console.table(await rooms.showAll());
    const client = await pool.connect()
    console.log(await rooms.showAllDataPerRoom(client,1));
    client.release()
}
// test()