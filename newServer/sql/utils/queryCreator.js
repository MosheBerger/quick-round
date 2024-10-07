const convertString = require("./camelToSnake")

const queryCreator = {
    insert: (tableName, columns=[''], data=[]) => {
        const columnsNames = columns.map(convertString.camelToSnake).join(', ')
        const query = {
            text: `--sql
            INSERT INTO ${tableName}(${columns.map(convertString.camelToSnake)})
            
        }
    },
    select: (tableName, columnsData, ) => {},
    update: () => {},
    delete: () => {},
}

queryCreator.select()


// const query = {
//     text:
//     INSERT INTO games(name, description, game_data, cover, date, creator_id)
//     VALUES($1,$2,$3,$4,$5)
//     RETURNING *
//     ,
//     values: [name, description, gameData, cover, date, creatorId]
// }