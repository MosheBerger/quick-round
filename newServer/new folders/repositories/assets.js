
const createAssetData = {
    client: null,
    userId: 0,
    name: '',
    type: '',
    data: 'base64',
    date: new Date()
}

/**
 * @typedef {{
 *  client: object,
 *  userId: number,
 *  name: string,
 *  type: string,
 *  data: string, // base64
 *  date: Date
 * }} CreateAssetData
}}
 */

/** @param {CreateAssetData} data */
async function create(data) {
    const { client, userId, name, type, data, date } = data

    const query = {
        text: `--sql
                INSERT INTO assets(name, type, data, user_id, date)
                VALUES($1,$2,$3,$4)
                RETURNING *
            ;`,
        values: [name, type, data, userId, date]
    }
    const res = await client.query(query)
    return res.rows[0]

}

async function remove({ client, assetId }) {
    const query = {
        text: `--sql
            DELETE FROM assets
            WHERE id = $1
            RETURNING id
        ;`,
        values: [assetId]
    }
    const res = await client.query(query)
    return {
        operation: res.command,
        success: (res.rowCount > 0),
        ...res.rows[0], //:id
    }
}

async function showAll({ client }) {
    const query = {
        text: `--sql
            SELECT * FROM assets
        ;`
    }
    const res = await client.query(query)
    return res.rows
}

async function connectToGame({ client, assetId, gameId }) {

    const query = {
        text: `--sql
            INSERT INTO games_assets(asset_id, game_id)
            VALUES($1,$2)
            RETURNING *
        ;`,
        values: [assetId, gameId]
    }

    const res = await client.query(query)
    return res.rows[0]
}

async function disconnectFromGame({ client, assetId, gameId }) {

    const query = {
        text: `--sql
            DELETE FROM games_assets
            WHERE asset_id = $1
                AND game_id = $2
            RETURNING id
        ;`,
        values: [assetId, gameId]
    }
    const res = await client.query(query)
    return {
        operation: res.command,
        success: (res.rowCount > 0),
        ...res.rows[0], //:id
    }
}

async function showAllAssetsByGameId({ client, gameId }) {

    const query = {
        text: `--sql
            SELECT 
                a.* 
            FROM games_assets ga
            
            LEFT JOIN assets a
                ON ga.asset_id = a.id
            
            WHERE ga.game_id = $1
        ;`,
        values: [gameId]
    }
    const res = await client.query(query)
    return res.rows
}

async function showAllAssetsByUserId({ client, userId }) {

    const query = {
        text: `--sql
            SELECT * FROM assets
            WHERE user_id = $1
        ;`,
        values: [userId]
    }
    const res = await client.query(query)
    return res.rows
}

async function showAllGamesByAssetId({ client, assetId }) {

    const query = {
        text: `--sql
            SELECT 
                g.* 
            FROM games_assets ga
            
            LEFT JOIN games g
                ON ga.game_id = g.id
            
            WHERE ga.asset_id = $1
        ;`,
        values: [assetId]
    }
    const res = await client.query(query)
    return res.rows

}

const gamesAssetsRepo = {
    create,
    remove,
    connectToGame,
    disconnectFromGame,
    showAll,
    showAllAssetsByGameId,
    showAllAssetsByUserId,
    showAllGamesByAssetId,
}

module.exports = gamesAssetsRepo