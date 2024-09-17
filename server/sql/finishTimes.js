

async function create(client, userId, roomId, finishTime) {
    try {
        const query = {
            text: `--sql
            INSERT INTO finish_times(user_id, room_id, finish_time)
            VALUES($1,$2,$3)
            RETURNING *
            ;`,
            values: [ userId, roomId, finishTime]
        }
        const res = await client.query(query)
        return res.rows[0]

    } catch (error) {
        console.log(error);
    }
}


async function showByRoom(client, roomId) {
    try {

        const query = {
            text: `
            SELECT * FROM finish_times
            WHERE room_id = $1
            ORDER BY finish_time
            ;`,
            values: [roomId]
        }
        const res = await client.query(query)

        return res.rows

    } catch (error) {
        console.log(error);
    }
}
async function removeByRoom(client, roomId) {

    const query = {
        text: `--sql
            DELETE FROM finish_times
            WHERE room_id = $1
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



const finishTimes = {
    create,
    showByRoom,
    removeByRoom,
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