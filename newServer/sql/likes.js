
const updateLikeData = {
    client,
    gameId: 0,
    userId: 0,
    like: false
}

async function update(data = updateLikeData) {
    const { client, gameId, userId, like } = data

    const query = {
        text: `--sql
            INSERT INTO likes(game_id, user_id, like_it)
            VALUES($1,$2,$3)
            ON CONFLICT (game_id, user_id) 
            DO UPDATE SET like_it = $3
            RETURNING *
        ;`,
        values: [gameId, userId, like]
    }
    const res = await client.query(query)
    return res.rows[0]
}


async function removeByGame({client, gameId}) {
    const query = {
        text: `--sql
            DELETE FROM likes
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


async function showByGame({client, gameId}) {
    try {

        const query = {
            text: `--sql
            SELECT * FROM likes
            WHERE game_id = $1
              AND like_it = true
            ;`,
            values: [gameId]
        }
        const res = await client.query(query)

        return res.rows

    } catch (error) {
        return (error);
    }
}

async function showLikedByUser({client, userId}) {

    const query = {
        text: `--sql
            SELECT * FROM likes
            WHERE user_id = $1
              AND like_it = true
            ;`,
        values: [userId]
    }
    const res = await client.query(query)

    return res.rows

}

async function isThisGameLikedByUser({client, gameId, userId}) {

    const query = {
        text: `--sql
            SELECT * FROM likes
            WHERE user_id = $1
              AND like_it = true
              AND game_id = $2
            ;`,
        values: [userId, gameId]
    }
    const res = await client.query(query)

    return (res.rowCount > 0)

}

async function countLikes({client, gameId}) {
    try {

        const query = {
            text: `--sql
            SELECT COUNT(*) FROM likes
            WHERE game_id = $1
              AND like_it = true
            ;`,
            values: [gameId]
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
    removeByGame,
    showByGame,
    showLikedByUser,
    isThisGameLikedByUser,
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
    //     { gameId: 1, roundNum: 1, gameId: 2, settings: { a: "b" } },
    //     { gameId: 1, roundNum: 1, gameId: 2, settings: { a: "b" } },
    //     { gameId: 1, roundNum: 1, gameId: 2, settings: { a: "b" } },
    //     { gameId: 1, roundNum: 1, gameId: 2, settings: { a: "b" } },
    //     { gameId: 1, roundNum: 1, gameId: 2, settings: { a: "b" } },
    // ]));
    // console.log(await rounds.show(2));
    // console.log(await rounds.remove(4));
    // console.log(await rounds.showByRoom(1));
}
// test()
