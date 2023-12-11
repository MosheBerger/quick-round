import kaboom from "kaboom"
import drag from "../GameObjComps/draggable"

function addDraggable(k = kaboom(), dragManager = { current: {} }, sprite = '', pos) {

    pos = pos || (k.rand(k.width()), k.rand(k.height()))

    const gameObject = k.add([
        k.sprite(sprite),
        k.pos(pos),
        k.area({ cursor: "pointer" }),
        k.anchor("center"),
        drag(k, dragManager),
        sprite,
    ])
    gameObject.spriteTag = sprite

    console.log(gameObject);

    gameObject.onDrag(() => {
        gameObject.scale = k.vec2(1.2)
        const shadow = k.add([
            'shadow',
            // k.rect(gameObject.height, gameObject.width),
            k.color(k.BLACK),
            k.opacity(0.3),
            k.pos(gameObject.pos.x+100, gameObject.pos.y+100),
            k.anchor('center'),
            k.sprite(gameObject.spriteTag),
            k.scale(k.vec2(1.3))
        ])
        gameObject.shadow = shadow
        k.readd(gameObject)
        // Remove the object and re-add it, so it'll be drawn on top
    })

    gameObject.onDragUpdate(() => {
        gameObject.shadow.pos = k.vec2(gameObject.pos.x+20, gameObject.pos.y+20)
        k.setCursor("move")
    })

    gameObject.onDragEnd(() => {
        gameObject.scale = k.vec2(1)
        gameObject.shadow.destroy()
    })
    
    return gameObject
}

export default addDraggable