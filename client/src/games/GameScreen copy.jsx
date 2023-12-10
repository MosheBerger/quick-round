
import kaboom from "kaboom"
import * as React from "react"

function GameScreen() {
	return (
		<Game />
	)
}

const Game = () => {

	const canvasRef = React.useRef(null)

	// just make sure this is only run once on mount so your game state is not messed up
	React.useEffect(() => {

		const k = kaboom({
			// if you don't want to import to the global namespace
			global: true,
			// if you don't want kaboom to create a canvas and insert under document.body
			canvas: canvasRef.current,
		})

		// k.loadSprite("bean", "/sprites/bean.png")

		// Keep track of the current draggin item
		let curDraggin = null

		// A custom component for handling drag & drop behavior
		function drag() {

			// The displacement between object pos and mouse pos
			let offset = k.vec2(0)

			return {
				// Name of the component
				id: "drag",
				// This component requires the "pos" and "area" component to work
				require: ["pos", "area"],
				pick() {
					// Set the current global dragged object to this
					curDraggin = this
					offset = k.mousePos().sub(this.pos)
					this.trigger("drag")
				},
				// "update" is a lifecycle method gets called every frame the obj is in scene
				update() {
					if (curDraggin === this) {
						this.pos = k.mousePos().sub(offset)
						this.trigger("dragUpdate")
					}
				},
				onDrag(action) {
					return this.on("drag", action)
				},
				onDragUpdate(action) {
					return this.on("dragUpdate", action)
				},
				onDragEnd(action) {
					return this.on("dragEnd", action)
				},
			}

		}

		// Check if someone is picked
		k.onMousePress(() => {
			if (curDraggin) {
				return
			}
			// Loop all "bean"s in reverse, so we pick the topmost one
			for (const obj of k.get("drag").reverse()) {
				// If mouse is pressed and mouse position is inside, we pick
				if (obj.isHovering()) {
					obj.pick()
					break
				}
			}
		})

		// Drop whatever is dragged on mouse release
		k.onMouseRelease(() => {
			if (curDraggin) {
				curDraggin.trigger("dragEnd")
				curDraggin = null
			}
		})

		// Reset cursor to default at frame start for easier cursor management
		k.onUpdate(() => k.setCursor("default"))

		// Add dragable objects
		for (let i = 0; i < 48; i++) {

			const bean = k.add([
				k.rect(35,35),
				k.pos(k.rand(k.width()), k.rand(k.height())),
				k.area({ cursor: "pointer" }),
				k.scale(1),
				k.outline(3, 'red'),
				k.anchor("center"),
				// using our custom component here
				drag(),
				i !== 0 ? k.color(255, 255, 255) : k.color(255, 0, 255),
				"bean",
			])

			bean.onDrag(() => {
				bean.scale = k.vec2(1.3)
				// Remove the object and re-add it, so it'll be drawn on top
				k.readd(bean)
			})

			bean.onDragUpdate(() => {
				k.setCursor("move")
			})

			bean.onDragEnd(() => {
				bean.scale = k.vec2(1)
			})

		}


	}, [])

	return <canvas ref={canvasRef}></canvas>

}

export default GameScreen