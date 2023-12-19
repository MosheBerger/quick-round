const pool = require('./pool.js')


async function create(roomId, roundNum, gameId, settings) {
    const query = {
        text: `
            INSERT INTO rounds(room_id, round_num, game_id, settings)
            VALUES($1,$2,$3,$4)
            RETURNING *
        `,
        values: [roomId, roundNum, gameId, settings]
    }
    const res = await pool.query(query)
    return res.rows[0]
}

async function remove(roundId) {
    const query = {
        text: `
            DELETE FROM rounds
            WHERE id = $1
            RETURNING id
        `,
        values: [roundId]
    }
    const res = await pool.query(query)
    return {
        operation: res.command,
        success: (res.rowCount > 0),
        ...res.rows[0],
    }
}

async function show(roundId) {
    const query = {
        text: `
            SELECT * FROM rounds
            WHERE id = $1
        ;`,
        values: [roundId]
    }
    const res = await pool.query(query)

    return res.rows[0]
}



const rounds = {
    create,
    remove,
    show
}

module.exports = rounds



const test = async () => {
    // console.log(await rounds.create(1, 1, 2));
    // console.log(await rounds.show(2));
    // console.log(await rounds.remove(4));

}
test()