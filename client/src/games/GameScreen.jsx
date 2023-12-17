
import kaboom from "kaboom"
import * as React from "react"
import debugToggle from "./middleWares/debug"
import './game-screen.css'



function GameScreen({ funcGame, settings, setResult }) {

	const canvasRef = React.useRef(null)

	React.useEffect(() => {

		const k = kaboom({
			global: false,
			canvas: canvasRef.current,
			width: 640,
			height: 360
		})

		// Reset cursor to default at frame start for easier cursor management
		k.onUpdate(() => k.setCursor("default"))

		funcGame(k,settings,setResult)

		debugToggle(k)

		return (() => {
			k.destroyAll('*')
		})

	}, [funcGame, setResult, settings])

	return <div>
		<br />
		<canvas ref={canvasRef} style={{ border: '2px solid black' }}></canvas>
	</div>

}

export default GameScreen