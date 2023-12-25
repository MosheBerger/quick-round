
import kaboom from "kaboom"
import * as React from "react"
import debugToggle from "./middleWares/debug"
import './game-screen.css'



function GameScreen({ funcGame, settings, setResult }) {

	const canvasRef = React.useRef(null)

	React.useEffect(() => {

		const k = kaboom({
			stretch: true,
			global: false,
			canvas: canvasRef.current,
			width: 960,
			// width: 640,
			// height: 360,
			height: 540,
			// maxFPS:40,
			// crisp:true
		})
		// k.load(promise)

		k.onUpdate(() => k.setCursor("default"))

		funcGame(k, settings, setResult)

		debugToggle(k)

		return (() => {
			console.log('kabooom');
			k.destroyAll()
			// k.quit()
		})


	}, [funcGame, setResult, settings])

	return <>
		<canvas ref={canvasRef} ></canvas>
	</>

}

export default GameScreen