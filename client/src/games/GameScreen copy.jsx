
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

		// Reset cursor to default at frame start for easier cursor management
		k.onUpdate(() => k.setCursor("default"))

		k.loadSprite('kaboom', 'https://kaboomjs.com/static/img/ka.svg')
		k.loadSprite('fish', 'http://localhost:8080/objects/fish.png')
		k.loadSprite('challah', 'http://localhost:8080/objects/challah.png')

		addDraggable(k, dragObject, 'kaboom', undefined)
		addDraggable(k, dragObject, 'fish', undefined, 0.2)
		addDraggable(k, dragObject, 'fish', undefined, 0.2)
		addDraggable(k, dragObject, 'fish', undefined, 0.2)
		addDraggable(k, dragObject, 'fish', undefined, 0.2)
		addDraggable(k, dragObject, 'fish', undefined, 0.2)
		addDraggable(k, dragObject, 'fish', undefined, 0.2)
		addDraggable(k,dragObject,'challah',undefined,0.2)
		addDraggable(k,dragObject,'challah',undefined,0.2)
		addDraggable(k,dragObject,'challah',undefined,0.2)
		addDraggable(k,dragObject,'challah',undefined,0.2)
		addDraggable(k,dragObject,'challah',undefined,0.2)
		// k.wait(3,() => {k.get('kaboom')[0].destroy()})
		// some.onCollide('kaboom', (kaboom) => {
		// 	kaboom.destroy()
		// })

		k.debug.inspect = true
	}, [])

	return <div className="container-fluid">
		<canvas ref={canvasRef} style={{ border: '2px solid black' }}></canvas>
	</div>

}

export default GameScreen