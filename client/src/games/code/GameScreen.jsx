
import kaboom from "kaboom"
import * as React from "react"
import debugToggle from "./middleWares/debug"
import './game-screen.css'
import successScene from "../scenes/success"
import failureScene from "../scenes/failure"
import BASE_URL from "../../BASE URL";
import gameList from ".."



function GameScreen({ rounds }) {
	const canvasRef = React.useRef(null)
	const runAlready = React.useRef(false)

	React.useEffect(() => {

		// run once management
		if (runAlready.current) { return }
		runAlready.current = true

		// define kaboom
		const k = kaboom({
			stretch: true,
			global: false,
			canvas: canvasRef.current,
			width: 960,
			height: 540,
		})


		///--🖼️--Assets Loader--🔊-----

		const allAssets = [
			['Font', 'Abraham', `${BASE_URL}/assets/fonts/Abraham-Regular.ttf`],
		]

		// push every asset from the each game in the room
		for (const round of rounds) {
			const game = gameList[round.game_id]
			game.assets.forEach(asset => allAssets.push(asset))
			// create scene for each game
			game.createScene(k)
		}

		// load every asset 
		allAssets.forEach((asset) => {
			const [type, tag, url] = asset
			console.log('check for loading', tag);

			const theAssetsIsExist = k[`get${type}`](tag)
			if (theAssetsIsExist) { return }

			k[`load${type}`](tag, url)
			console.info('loaded', tag);
		})
		///-----------------



		//! refactor this
		// let startTime
		// k.onLoad(() => {
		// 	startTime = Date.now()
		// })

		const roundManager = {
			roundNum: 0,
			run() {
				k.go(
					this.currentGame(),
					this.currentRound().settings
				)
			},
			currentRound() {
				return rounds[this.roundNum]
			},
			currentGame() {
				return gameList[this.currentRound().game_id].tag
			},
			nextRound() {
				this.roundNum++

				if (this.roundNum >= rounds.length) {
					console.log('moveToFinish');
					k.quit()
					return
				}
				this.run()
			}
		}


		k.onUpdate(() => k.setCursor("default"))


		// ! MOVE TO THE NEXT GAME

		k.finish = (success = false, reason) => {
			// const finishTime = Date.now() - startTime
			// setResult(prev => [...prev ,{ success, finishTime }])
			k.wait(0.2, () => {

				if (success) {
					k.go('success', { time: 'finishTime' })

				} else {
					k.go('failure', { reason })
				}
			})
		}

		successScene(k, () => roundManager.nextRound())
		failureScene(k, () => roundManager.nextRound())

		roundManager.run()


			debugToggle(k)

		//TESTING
		k.onLoad(() => {
			console.log('hi');
		})

		// return (() => {
		// 	k.destroyAll()
		// })


	}, [rounds])

	return <div>
		<canvas ref={canvasRef} ></canvas>
	</div>

}

export default GameScreen

