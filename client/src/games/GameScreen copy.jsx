
import kaboom from "kaboom"
import * as React from "react"
import addDraggable from "./addObjectFuncs/addDraggable"
import startDragSystem from "./middleWares/playDragSystem"


function GameScreen() {
	return (
		<Game />
	)
}

const Game = () => {

	const canvasRef = React.useRef(null)

	React.useEffect(() => {

		const k = kaboom({
			global: true,
			canvas: canvasRef.current,
			width: 640,
			height: 320
		})

		const dragObject = startDragSystem(k)
		const { loadSprite, debug } = k;

		// Reset cursor to default at frame start for easier cursor management
		// k.onUpdate(() => k.setCursor("default"))

		loadSprite('kaboom', 'https://kaboomjs.com/static/img/ka.svg')
		loadSprite('fish', 'http://localhost:8080/objects/fish.png')
		loadSprite('challah', 'http://localhost:8080/objects/challah.png')

		addDraggable(k, dragObject, { sprite: 'kaboom',scale:undefined })
		addDraggable(k, dragObject, { sprite: 'fish', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'fish', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'fish', pos:k.center() })
		addDraggable(k, dragObject, { sprite: 'fish', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'fish', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'fish', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'challah', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'challah', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'challah', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'challah', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'challah', scale: 0.2 })

		// k.wait(3,() => {k.get('kaboom')[0].destroy()})
		// some.onCollide('kaboom', (kaboom) => {
		// 	kaboom.destroy()
		// })

		debug.inspect = true
	}, [])

	return <div className="container-fluid">
		<canvas ref={canvasRef} style={{ border: '2px solid black' }}></canvas>
	</div>

}

export default GameScreen