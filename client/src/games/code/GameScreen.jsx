
import kaboom from "kaboom"
import * as React from "react"
import debugToggle from "./middleWares/debug"
import './game-screen.css'



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

		k.onUpdate(() => k.setCursor("default"))

		k.settings = settings

		k.finish = (success = false) => {
			const finishTime = Date.now() - startTime
			setResult({ success, finishTime })
			k.quit()

			moveToNextGame?.()
		}

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