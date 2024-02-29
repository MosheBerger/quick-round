

async function update(client, roomId, userId, like) {
    const query = {
        text: `--sql
        INSERT INTO likes(room_id, user_id, like_it)
        VALUES($1,$2,$3)
        ON CONFLICT (room_id, user_id) 
        DO UPDATE SET like_it = $3
        RETURNING *
            ;`,
        values: [roomId, userId, like]
    }
    const res = await client.query(query)
    return res.rows[0]
}


async function removeByRoom(client, roomId) {
    const query = {
        text: `
            DELETE FROM likes
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


async function showByRoom(client, roomId) {
    try {

        const query = {
            text: `
            SELECT * FROM likes
            WHERE room_id = $1
              AND like_it = true
            ;`,
            values: [roomId]
        }
        const res = await client.query(query)

        return res.rows

    } catch (error) {
        return (error);
    }
}

async function showLikedByUser(client, userId) {

    const query = {
        text: `
            SELECT * FROM likes
            WHERE user_id = $1
              AND like_it = true
            ;`,
        values: [userId]
    }
    const res = await client.query(query)

    return res.rows

}

async function isThisRoomLikedByUser(client,roomId, userId) {

    const query = {
        text: `
            SELECT * FROM likes
            WHERE user_id = $1
              AND like_it = true
              AND room_id = $2
            ;`,
        values: [userId, roomId]
    }
    const res = await client.query(query)

    return res.rows

}

async function countLikes(client, roomId) {
    try {

        const query = {
            text: `
            SELECT COUNT(*) FROM likes
            WHERE room_id = $1
              AND like_it = true
            ;`,
            values: [roomId]
        }
        const res = await client.query(query)

        return res.rows[0].count

    } catch (error) {
        return (error);
    }
}



const likes = {
    update,
    countLikes,
    removeByRoom,
    showByRoom,
    showLikedByUser,
    isThisRoomLikedByUser,
}

module.exports = likes


const test = async () => {
    const client = await pool.connect()

    // const res = await create(client, 2, 2, true)
    // const res = await update(client, 1, 1, false)
    // const res = await countLikes(client, 1)

    const res = await likes.showLikedByUser(client, 3)
    console.log('🚀 -> test -> res:', res)


    client.release()
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
    // console.log(await rounds.showByRoom(1));
}
// test()
