import kaboom from "kaboom"

function startDragSystem(k = kaboom()) {

    const dragObject = { current: null }


    // Check if someone is picked
    k.onMousePress(() => {
        if (dragObject.current) {
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
        if (dragObject.current) {
            dragObject.current.trigger("dragEnd")
            dragObject.current = null
        }
    })


    return dragObject
}

export default startDragSystem