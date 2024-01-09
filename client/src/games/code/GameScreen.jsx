
import kaboom from "kaboom"
import * as React from "react"
import debugToggle from "./middleWares/debug"
import './game-screen.css'
import successScene from "../scenes/success"
import failureScene from "../scenes/failure"
import BASE_URL from "../../BASE URL";
import gameList from ".."
import Shopping from "../TheGames/shopping/shopping copy"



function GameScreen({ rounds }) {
	const canvasRef = React.useRef(null)
	const runAlready = React.useRef(false)

	React.useEffect(() => {

		if (runAlready.current) { return }
		runAlready.current = true

		const k = kaboom({
			stretch: true,
			global: false,
			canvas: canvasRef.current,
			width: 960,
			height: 540,
		})
		let i = 0

		//! refactor this
		let startTime
		k.onLoad(() => {
			startTime = Date.now()
		})


		k.loadFont('Abraham', `${BASE_URL}/assets/fonts/Abraham-Regular.ttf`)

		k.onUpdate(() => k.setCursor("default"))

		// k.settings = settings

		// ! MOVE TO THE NEXT GAME
		const moveToNextGame = () => {
			k.go('shopping-game')
		}

		k.finish = (success = false, reason) => {
			const finishTime = Date.now() - startTime
			// setResult(prev => [...prev ,{ success, finishTime }])
			k.wait(0.2, () => {

				if (success) {
					k.go('success', { time: finishTime })

				} else {
					k.go('failure', { reason })
				}
			})
		}

		successScene(k, moveToNextGame)
		failureScene(k, moveToNextGame)

		Shopping.assets.forEach((asset) => {
			const [type, tag, url] = asset

			const isExist = k[`get${type}`](tag)
			if (isExist) { return }

			k[`load${type}`](tag, url)
		})

		Shopping.scene(k)
		k.go(Shopping.tag)
		// funcGame(k)

		debugToggle(k)
		console.log('gameScreen');


		//TESTING
		k.onLoad(() => {
			console.log('hi');
		})
		k.onKeyPress('space', () => {
			k.debug.log('yey');

			if (i >= rounds.length) { return }
			let game = gameList[rounds[i].game_id]
			k.debug.log(game)
			i++
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

