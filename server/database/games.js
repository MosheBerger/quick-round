const pool = require('./pool,js')

async function addGame(){

}
async function showGame(gameId){

    const query ={
        text:`
            SELECT * FROM games
            WHERE id = $1
        ;`,
        values:[gameId]
    }

    const res = await pool.query(query)

    return res.rows[0]
}


const games = {
    addGame,
    showGame
}