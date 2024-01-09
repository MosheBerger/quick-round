import gameList from ".."

class RoundManager {
    constructor(k, rounds) {
        this.k = k
        this.rounds = rounds
    }
    roundNum= 0
    startTime= 0

    run() {
        this.startTime = Date.now()
        this.k.go(
            this.currentGame(),
            this.currentRound().settings
        )
    }

    currentRound() {
        return this.rounds[this.roundNum]
    }
    currentGame() {
        return gameList[this.currentRound().game_id].tag
    }

    nextRound() {
        this.roundNum++

        if (this.roundNum >= this.rounds.length) {
            console.log('moveToFinish');
            this.k.quit()
            return
        }
        this.run()
    }
}


export default RoundManager