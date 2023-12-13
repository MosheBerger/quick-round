import kaboom from "kaboom"

// A custom component for handling drag & drop behavior
function drag(k = kaboom(), curDragging) {

    // The displacement between object pos and mouse pos
    let offset = k.vec2(0)

    return {
        // Name of the component
        id: "drag",
        // This component requires the "pos" and "area" component to work
        require: ["pos", "area"],
        pick() {
            // Set the current global dragged object to this
            curDragging.current = this
            offset = k.mousePos().sub(this.pos)
            this.trigger("drag")
        },
        // "update" is a lifecycle method gets called every frame the obj is in scene
        update() {
            if (curDragging.current === this) {
                k.setCursor("grabbing")
                this.pos = k.mousePos().sub(offset)
                this.trigger("dragUpdate")

            } else {
                if (this.isHovering()){
                    k.setCursor('grab')
                }
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

export default drag