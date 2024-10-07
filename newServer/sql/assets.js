
const createAssetData = {
    client: null,
    userId: 0,
    name: '',
    type: '',
    data: 'base64',
}

function create(data = createAssetData) { 
    const { client, userId, name, type, data } = data

    try {
        const query = {
            text: `--sql
                INSERT INTO assets(name, type, data, user_id)
                VALUES($1,$2,$3,$4)
                RETURNING *
            ;`,
            values: [name, type, data, userId]
        }
        const res = client.query(query)
        return res.rows[0]
    } catch (error) {
        return {
            errorCode: error.code,
            detail: error.detail
        }
    }
}

function remove() { }
function showAll() { }
function connectToGame() { }
function disconnectFromGame() { }
function showAllAssetsByGameId() { }
function showAllAssetsByUserId() { }
function showAllGamesByAssetId() { }

const gamesAssets = {
    create,
    remove,
    connectToGame,
    disconnectFromGame,
    showAll,
    showAllAssetsByGameId,
    showAllAssetsByUserId,
    showAllGamesByAssetId,
}

module.exports = gamesAssets