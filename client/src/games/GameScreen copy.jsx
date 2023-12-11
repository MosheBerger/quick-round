
import kaboom from "kaboom"
import * as React from "react"
import drag from "./GameObjComps/draggable"
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
		k.loadSprite('amongUs', 'https://static.wikia.nocookie.net/coralisland/images/8/8a/Any_fish.png/revision/latest?cb=20230602002133')

		// Add dragable objects
		for (let i = 0; i < 5; i++) {
			addDraggable(k, dragObject, 'kaboom', undefined)
	
		}
		const some = addDraggable(k, dragObject, 'amongUs', undefined)
		// k.wait(3,() => {k.get('kaboom')[0].destroy()})
		some.onCollide('kaboom', (kaboom) => {
			kaboom.destroy()
		})


	}, [])

	return <div className="container-fluid">
		<canvas ref={canvasRef} style={{border:'2px solid black'}}></canvas>
	</div>

}

export default GameScreen