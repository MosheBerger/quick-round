

async function createGameReport({ client, gameId, userId }) {

    const query = {
        text: `--sql
            INSERT INTO reports(game_id, by_user_id)
            VALUES($1,$2)
            RETURNING *
        ;`,
        values: [gameId, userId]
    }
    const res = await client.query(query)
    return res.rows[0]
}

async function approveGame({ client, gameId }) {

    const query = {
        text: `--sql
            INSERT INTO games_approved_by_the_manager(game_id)
            VALUES($1)
            RETURNING *
        ;`,
        values: [gameId]
    }
    const res = await client.query(query)
    return res.rows[0]
}


async function approveAsset({ client, assetId}) { 
    const query = {
        text: `--sql
            INSERT INTO assets_approved_by_the_manager(asset_id)
            VALUES($1)
            RETURNING *
        ;`,
        values: [assetId]
    }
    const res = await client.query(query)
    return res.rows[0]
}

const report = {
    createGameReport,
    approveGame,
    approveAsset,
    // rejectAsset,
    // rejectGame
    // todo ?☝️ 
}

module.exports = report