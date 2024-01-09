import kaboom from "kaboom"

function startDragSystem(k = kaboom()) {

    k.curDragging =  null 


    // Check if someone is picked
    k.onMousePress(() => {
        if (k.curDragging) {
            return
        }
        // Loop all "drag" in reverse, so we pick the topmost one
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
        if (k.curDragging) {
            k.curDragging.trigger("dragEnd")
            k.curDragging = null
        }
    })

}

export default startDragSystem