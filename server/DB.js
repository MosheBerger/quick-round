const users = require("./sql/users");
const games = require("./sql/games");
const players = require("./sql/players");
const pool = require("./sql/pool");
const results = require("./sql/results");
const rooms = require("./sql/rooms");
const rounds = require("./sql/rounds");






const DB = {
    users,
    games,
    players,
    pool,
    results,
    rooms,
    rounds,
    open: () => {
        return this
    },
    close: () => {
        return this
    }
}

module.exports = DB