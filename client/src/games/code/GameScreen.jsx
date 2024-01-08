
import kaboom from "kaboom"
import * as React from "react"
import debugToggle from "./middleWares/debug"
import './game-screen.css'
import successScene from "../scenes/success"
import failureScene from "../scenes/failure"
import BASE_URL from "../../BASE URL";



function GameScreen({ funcGame, settings, setResult, moveToNextGame }) {

	const canvasRef = React.useRef(null)

	React.useEffect(() => {

		const k = kaboom({
			stretch: true,
			global: false,
			canvas: canvasRef.current,
			width: 960,
			height: 540,
		})
		let startTime
		k.onLoad(() => {
			startTime = Date.now()
		})

		k.loadFont('Abraham', `${BASE_URL}/assets/fonts/Abraham-Regular.ttf`)
	
		k.onUpdate(() => k.setCursor("default"))

		k.settings = settings

		k.finish = (success = false, reason) => {
			const finishTime = Date.now() - startTime
			setResult(prev => [...prev ,{ success, finishTime }])
			k.wait(0.2, () => {

				if (success) {
					k.go('success', { time: finishTime })

				} else {
					k.go('failure', { reason })
				}
			})
		}


		successScene(k,moveToNextGame)
		failureScene(k,moveToNextGame)

		funcGame(k)

		debugToggle(k)

		return (() => {
			k.destroyAll()
		})


	}, [funcGame, setResult, settings, moveToNextGame])

	return <div>
		<canvas ref={canvasRef} ></canvas>
	</div>

}

export default GameScreen

