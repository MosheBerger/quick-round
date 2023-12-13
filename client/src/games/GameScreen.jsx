
import kaboom from "kaboom"
import * as React from "react"
import addDraggable from "./addObjectFuncs/addDraggable"
import startDragSystem from "./middleWares/playDragSystem"
// import './game-screen.css'

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
			height: 360
		})

		const dragObject = startDragSystem(k)
		const { loadSprite, debug } = k;

		// Reset cursor to default at frame start for easier cursor management
		k.onUpdate(() => k.setCursor("default"))

		loadSprite('kaboom', 'https://kaboomjs.com/static/img/ka.svg')
		loadSprite('fish', 'http://localhost:8080/objects/fish.png')
		loadSprite('challah', 'http://localhost:8080/objects/challah.png')

		addDraggable(k, dragObject, { sprite: 'fish', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'fish', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'fish', scale: 0.2})
		addDraggable(k, dragObject, { sprite: 'fish', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'fish', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'fish', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'challah', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'challah', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'challah', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'challah', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'challah', scale: 0.2 })
		addDraggable(k, dragObject, { sprite: 'kaboom',  pos: k.center()  })

		// k.wait(3,() => {k.destroyAll('*')})
		// some.onCollide('kaboom', (kaboom) => {
		// 	kaboom.destroy()
		// })

		debug.inspect = true

		return(() => {
			k.destroyAll('*') 
		})
	}, [])

	return <div>
		<canvas ref={canvasRef} style={{ border: '2px solid black' }}></canvas>
	</div>

}

export default GameScreen