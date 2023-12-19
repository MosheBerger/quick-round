

async function create(client, roomId, roundNum, gameId, settings) {
    try {
        const query = {
            text: `
            INSERT INTO rounds(room_id, round_num, game_id, settings)
            VALUES($1,$2,$3,$4)
            RETURNING *
            ;`,
            values: [roomId, roundNum, gameId, settings]
        }
        const res = await client.query(query)
        return res.rows[0]

    } catch (error) {
        console.log(error);
    }
}

async function createMany(client, roundsArr = []) {
    try {

        const results = []

        for (let i = 0; i < roundsArr.length; i++) {
            const { roomId, roundNum, gameId, settings } = roundsArr[i]
            results.push(await create(client, roomId, roundNum, gameId, settings))
        }

        return results

    } catch (error) {
        console.log(error);
    }
}

async function remove(client, roundId) {
    try {

        const query = {
            text: `
            DELETE FROM rounds
            WHERE id = $1
            RETURNING id
            ;`,
            values: [roundId]
        }
        const res = await client.query(query)
        return {
            operation: res.command,
            success: (res.rowCount > 0),
            ...res.rows[0], //:id
        }
    } catch (error) {
        console.log(error);
    }
}

async function show(client, roundId) {
    try {

        const query = {
            text: `
            SELECT * FROM rounds
            WHERE id = $1
            ;`,
            values: [roundId]
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
            SELECT * FROM rounds
            WHERE room_id = $1
            ;`,
            values: [roomId]
        }
        const res = await client.query(query)

        return res.rows

    } catch (error) {
        console.log(error);
    }
}



const rounds = {
    create,
    createMany,
    remove,
    show,
    showByRoom,
}

module.exports = rounds



const test = async () => {
    // console.log(await rounds.create(1, 1, 2));
    // console.log(await rounds.createMany([
    //     { roomId: 1, roundNum: 1, gameId: 2, settings: { a: "b" } },
    //     { roomId: 1, roundNum: 1, gameId: 2, settings: { a: "b" } },
    //     { roomId: 1, roundNum: 1, gameId: 2, settings: { a: "b" } },
    //     { roomId: 1, roundNum: 1, gameId: 2, settings: { a: "b" } },
    //     { roomId: 1, roundNum: 1, gameId: 2, settings: { a: "b" } },
    // ]));
    // console.log(await rounds.show(2));
    // console.log(await rounds.remove(4));
    console.log( await rounds.showByRoom(1));
}
// test()