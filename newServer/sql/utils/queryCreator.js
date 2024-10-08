const convertString = require("./camelToSnake")

// todo REMOVE if not needed
const queryCreator = {
    insert: (tableName, columns = ['']) => {

        // const columns = Object.keys(data)
        // const values = Object.values(data)
        const columnsNames = columns.map(convertString.camelToSnake).join(', ')

        const textQuery = `
            INSERT INTO ${tableName}(${columnsNames})
            VALUES(${columns.map((col, i) => '$' + (i + 1)).join(',')})
            RETURNING *
            `

        return query
    },

    select: (tableName, columnsData,) => { },
    update: () => { },
    delete: () => { },
}
//


// const query = {
//     text:
//     INSERT INTO games(name, description, game_data, cover, date, creator_id)
//     VALUES($1,$2,$3,$4,$5)
//     RETURNING *
//     ,
//     values: [name, description, gameData, cover, date, creatorId]
// }