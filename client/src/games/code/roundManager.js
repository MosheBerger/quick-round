import kaboom from "kaboom"
import gameList from ".."

class RoundManager {
    constructor(k=kaboom(), rounds, sendResult) {
        this.k = k
        this.rounds = rounds
        this.sendResult = sendResult
    }
    roundNum = 0
    startTime = 0
    results = []

    run() {
        this.k.go('roundNum', {
            roundNum: this.roundNum + 1,
            playTheGame: () => {this.playTheGame()},
            gameName:this.currentGame().name
        })
    }

    playTheGame() {
        this.startTime = Date.now()
        // console.log('start',this.startTime);
        this.k.go(
            this.currentGame().tag,
            this.currentRound().settings
        )
    }

    currentRound() {
        return this.rounds[this.roundNum]
    }
    currentGame() {
        return gameList[this.currentRound().game_id]
    }

    nextRound() {
        this.roundNum++

        if (this.roundNum >= this.rounds.length) {
            // console.log('moveToFinish');
            this.sendResult(this.results)
            this.k.quit()
            document.getElementsByTagName('canvas')[0].remove()
            // console.log('res', this.results);
            return
        }
        this.run()
    }
    finishFunc = (success = false, reason) => {
        const { k, results, startTime, roundNum } = this

        if (results.length > roundNum) { return }

        const roundId = this.currentRound().id
        const finishTime = Date.now() - startTime

        results.push({ roundId, success, finishTime })
        
        //todo print!!
        // const shot = k.screenshot()
        // k.loadSprite('ss',shot)
        // setTimeout(() => {
        //     k.add([
        //         k.pos(0,0),
        //         k.sprite('ss')
        //     ])
        //     console.log('print');
        // }, 4000)
        // console.log('תוצאות', results);
        k.wait(0.2, () => {

            if (success) {
                k.go('success', { time: finishTime })

            } else {
                k.go('failure', { reason })
            }
        })
    }

}


export default RoundManager