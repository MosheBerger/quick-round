
import kaboom from "kaboom"
import * as React from "react"
import debugToggle from "./middleWares/debug"
import './game-screen.css'



function GameScreen({ funcGame }) {

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

		funcGame(k)

		debugToggle(k)

		return (() => {
			k.destroyAll('*')
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <div>
		<canvas ref={canvasRef} style={{ border: '2px solid black' }}></canvas>
	</div>

}

export default GameScreen