
import kaboom from "kaboom"
import * as React from "react"
import debugToggle from "./middleWares/debug"
import './game-screen.css'



function GameScreen({ funcGame, settings, setResult, promise }) {

	const canvasRef = React.useRef(null)

	React.useEffect(() => {

		const k = kaboom({
			stretch:true,
			global: false,
			canvas: canvasRef.current,
			// width: 1280,
			width: 640,
			height: 360,
			// height: 720,
			maxFPS:40,
		})
		k.load(promise)
		// Reset cursor to default at frame start for easier cursor management
		k.onUpdate(() => k.setCursor("default"))

		funcGame(k,settings,setResult)

		debugToggle(k)

		return (() => {
			k.destroyAll('*')
		})
		

	}, [funcGame, setResult, settings,promise])

	return <div>
		<br />
		<canvas ref={canvasRef} style={{ border: '2px solid black' }}></canvas>
	</div>

}

export default GameScreen