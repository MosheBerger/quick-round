
async function createGame(client, name, description, settings, imageURL, genre) {
    try {
        const query = {
            text: `
            INSERT INTO games(name, description, settings, imageURL, genre)
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
        ;`,
            values: [name, description, settings, imageURL, genre]
        }

        const res = await client.query(query)
        return res.rows[0]

    } catch (error) {
        return {
            errorCode: error.code,
            detail: error.detail
        }
    } 
}

async function showGame(client, gameId) {
    try {
        const query = {
            text: `
            SELECT * FROM games
            WHERE id = $1
        ;`,
            values: [gameId]
        }

        const res = await client.query(query)

        return res.rows[0]

    } catch (error) {
        console.log(error);
    }
}

async function showAll(client) {
    try {
        const query = `
    SELECT * FROM games
    ;`

        const res = await client.query(query)

        return res.rows

    } catch (error) {
        console.log(error);
    }
}

async function test( ) {
    // const res = await createGame('טריוויה','שאלת טריוויה מהירה בהתאמה אישית',`{
    //     "question": "שאלה",
    //     "answerA": "תשובה 1",
    //     "answerB": "תשובה 2",
    //     "answerC": "תשובה 3",
    //     "answerD": "תשובה 4",
    //     "trueAnswer": [
    //         {"name":"תשובה 1", "value":"answerA"},
    //         {"name":"תשובה 2", "value":"answerB"},
    //         {"name":"תשובה 3", "value":"answerC"},
    //         {"name":"תשובה 4", "value":"answerD"}
    //     ]
    // }`,'/covers/trivia.png','חידה')


    // const res = await showGame(4)
    // const res = await showAll()
    // console.table(res);
}
// test()

const games = {
    createGame,
    showGame,
    showAll
}

module.exports = games