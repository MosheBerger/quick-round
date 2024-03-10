import kaboom from "kaboom"

// A custom component for handling drag & drop behavior
function drag(k = kaboom(), options = { returnOnLeave: false }) {

    initialDragSystem(k);
    // The displacement between object pos and mouse pos
    let offset = k.vec2(0)

    return {
        // Name of the component
        id: "drag",
        // This component requires the "pos" and "area" component to work
        require: ["pos", "area", 'scale'],

        pick() {
            runShadowSystem(k, this, options.returnOnLeave);
            k.debug.inspect = true
            // Set the current global dragged object to this
            k.curDragging = this
            offset = k.mousePos().sub(this.pos)
            this.trigger("drag")
        },
        // "update" is a lifecycle method gets called every frame the obj is in scene
        update() {

            if (k.curDragging === this) {
                k.setCursor("grabbing")
                this.pos = k.mousePos().sub(offset)
                this.trigger("dragUpdate")

            } else {
                if (this.isHovering()) {
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

function initialDragSystem(k = kaboom()) {
    if (!('curDragging' in k)) {
        k.curDragging = null


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
}

function runShadowSystem(k = kaboom(), obj = k.add([k.scale()]), returnOnLeave = false) {
    if (obj.runOnce) { return; }

    
    let spriteTag = obj.c('sprite').inspect();
    spriteTag = spriteTag.replaceAll('"', '');

    const firstPos = obj.pos
    const firstScale = obj.scale

    const shadowOffset = k.vec2(40)

    obj.onDrag(() => {
        obj.scale = firstScale.scale(1.2)

        obj.shadow = k.add([
            'shadow',
            k.color(k.BLACK),
            k.opacity(0.3),
            k.pos(obj.pos.x, obj.pos.y),
            k.anchor('center'),
            k.sprite(spriteTag),
            k.scale(firstScale),
        ])


        k.readd(obj)
    })

    obj.onDragUpdate(() => {
        obj.shadow.pos = obj.pos.add(shadowOffset)
    })

    k.onUpdate(() => {
        if (!obj.exists()) {
            obj.shadow?.destroy()
        }
    })

    obj.onDragEnd(() => {
        obj.scale = firstScale;
        obj.shadow.destroy();

        if (returnOnLeave) {
            obj.pos = firstPos
        }
    })


    obj.runOnce = true
}