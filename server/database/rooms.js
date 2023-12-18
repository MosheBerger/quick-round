const pool = require('./pool.js')


async function create(name, numOfPlayers, numOfRounds, manager) {
    const query = {
        text: `
            INSERT INTO rooms(name, numOfPlayers, numOfRounds, manager)
            VALUES($1,$2,$3,$4)
            RETURNING *
        `,
        values: [name, numOfPlayers, numOfRounds, manager]
    }
    const res = await pool.query(query)
    return res.rows[0]
}

async function join(roomId, userId) {
    const query = {
        text: `
            INSERT INTO players(room_id, user_id)
            VALUES($1,$2)
        `,
        values: [roomId, userId]
    }
    const res = await pool.query(query)

    return (res.rowCount === 1)
}

async function leave(roomId, userId) {
    const query = {
        text: `
            DELETE FROM players
            WHERE room_id = $1
                AND user_id = $2
        `,
        values: [roomId, userId]
    }
    const res = await pool.query(query)
    return
}

async function show() {
    const query = {
        text: `
        
        `,
        values: []
    }
    const res = await pool.query(query)
    return
}



const rooms = {
    create,
    join,
    leave,
    show
}

module.exports = rooms



const test = async () => {
    // console.log(await rooms.create('החדר של מוישי', 4, 2, 1));
    console.log(await rooms.join(1, 1));
}
test()