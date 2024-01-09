

async function create(client, roundId, userId, roomId, success, finishTime) {
    try {
        const query = {
            text: `
            INSERT INTO results(round_id, user_id, room_id success, finish_time)
            VALUES($1,$2,$3,$4)
            RETURNING *
            ;`,
            values: [roundId, userId, roomId, success, finishTime]
        }
        const res = await client.query(query)
        return res.rows[0]

    } catch (error) {
        console.log(error);
    }
}


async function showByRound(client, roundId) {
    try {

        const query = {
            text: `
            SELECT * FROM results
            WHERE round_id = $1
            ORDER BY success DESC, finish_time
            ;`,
            values: [roundId]
        }
        const res = await client.query(query)

        return res.rows
        
    } catch (error) {
        console.log(error);
    }
}

async function showByRoom(client, roomId) {
    try {

        const query = {
            text: `
            SELECT * FROM results
            WHERE room_id = $1
            ORDER BY success DESC, finish_time
            ;`,
            values: [roomId]
        }
        const res = await client.query(query)

        return res.rows
        
    } catch (error) {
        console.log(error);
    }
}



const results = {
    create,
    showByRoom,
    showByRound,
}

module.exports = results



const test = async () => {
    // console.log( await create(1,1,false,6738));
    // console.log( await create(2,2,true,6430));
    // console.log( await create(2,3,true,6738));
    // console.log( await create(1,4,true,20000));

    // console.log( await showByRound(2));
}
// test()