
const createData = {
    client: null,
    userId: 0,
    gameId: 0,
    finishTime: 0,
    date: new Date()
}

async function create(data = createData) {
    const { client, userId, gameId, finishTime, date } = data

    try {
        const query = {
            text: `--sql
            INSERT INTO finish_times(user_id, game_id, finish_time, date)
            VALUES($1,$2,$3,$4)
            RETURNING *
            ;`,
            values: [userId, gameId, finishTime, date]
        }
        const res = await client.query(query)
        return res.rows[0]

    } catch (error) {
        console.log(error);
    }
}


async function showByGame({ client, gameId }) {
    try {

        const query = {
            text: `--sql
            SELECT * FROM finish_times
            WHERE game_id = $1
            ORDER BY finish_time
            ;`,
            values: [gameId]
        }
        const res = await client.query(query)

        return res.rows

    } catch (error) {
        console.log(error);
    }
}
async function removeByGame({client, gameId}) {

    const query = {
        text: `--sql
            DELETE FROM finish_times
            WHERE game_id = $1
            RETURNING id
            ;`,
        values: [gameId]
    }
    const res = await client.query(query)
    return {
        operation: res.command,
        success: (res.rowCount > 0),
        ...res.rows[0], //:id
    }

}



const finishTimes = {
    create,
    showByGame,
    removeByGame,
}

module.exports = finishTimes



const test = async () => {
    // console.log( await create(1,1,false,6738));
    // console.log( await create(2,2,true,6430));
    // console.log( await create(2,3,true,6738));
    // console.log( await create(1,4,true,20000));

    // console.log( await showByRound(2));
}
// test()