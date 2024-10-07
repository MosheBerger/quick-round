const users = require("./sql/users");
const games = require("./sql/games");
const players = require("./sql/players");
const likes = require('./sql/likes')
// const pool = require("./sql/pool");
const finishTimes = require("./sql/finishTimes");
const rooms = require("./sql/rooms");
const rounds = require("./sql/rounds");



const DB = {
    // pool,
    users,
    games,
    rooms,
    likes,
    players,
    finishTimes,
    rounds,
}

module.exports = DB