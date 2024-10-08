const users = require("./new folders/repositories/users");
const games = require("./new folders/repositories/games");
const players = require("./new folders/repositories/players");
const likes = require('./new folders/repositories/likes')
// const pool = require("./sql/pool");
const finishTimes = require("./new folders/repositories/finishTimes");
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