
const players = require('./players.js')
const rounds = require('./rounds.js')
const users = require('./users.js')
const likes = require('./likes.js')
const finishTimes = require('./finishTimes.js')

async function create(client, name, numOfRounds, manager) {
    try {
        const query = {
            text: `--sql
            INSERT INTO rooms(name, numOfRounds, manager)
            VALUES($1,$2,$3)
            RETURNING *
        `,
            values: [name, numOfRounds, manager]
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
            text: `--sql
            SELECT * FROM rooms
            ORDER BY id DESC
            ;`
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
            values: [roomId]
        }
        const res = await client.query(query)
        return res.rows[0]

    } catch (error) {
        console.log(error);
    }
}
async function remove(client, roomId) {
    const query = {
        text: `
            DELETE FROM rooms
            WHERE id = $1
            RETURNING id
            ;`,
        values: [roomId]
    }
    const res = await client.query(query)
    return {
        operation: res.command,
        success: (res.rowCount > 0),
        ...res.rows[0], //:id
    }
}



async function showAllDataPerRoom(client, roomId, roomObj) {
    try {
        const room = roomObj || await showOne(client, roomId)

        room.manager = await users.showProfile(client, room.manager)
        room.rounds = await rounds.showByRoom(client, roomId)
        room.likes = await likes.countLikes(client, roomId)
        room.playCount = await players.countUsersPlayedIt(client, roomId)
        room.players = await players.showAllUsersPlayedIt(client, roomId)
        room.finishTimes = await finishTimes.showByRoom(client,roomId)

        return room
    } catch (error) {
        console.log(error);
    }
}

const rooms = {
    create,
    showAll,
    showOne,
    remove,
    showAllDataPerRoom,
}

module.exports = rooms



// const test = async () => {
//     // console.log(await rooms.create('החדר של אבי', 4, 2, 1));
//     // console.log(await rooms.join(1, 1));
//     // console.log(await rooms.join(1, 2));
//     // console.log(await rooms.join(1, 4));
//     // console.log(await rooms.join(2, 1));
//     // console.log(await rooms.leave(5, 5));
//     // console.table(await rooms.showAll());
//     const client = await pool.connect()
//     console.log(await rooms.showAllDataPerRoom(client,1));
//     client.release()
// }
// test()