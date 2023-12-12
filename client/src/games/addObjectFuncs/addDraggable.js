import kaboom from "kaboom"
import drag from "../GameObjComps/draggable"

function addDraggable(k = kaboom(), dragManager = { current: {} }, sprite = '', pos, scale) {

    pos = pos || k.rand(k.vec2(k.width(), k.height()))
    scale = scale || 1

    const gameObject = k.add([
        'draggable',
        sprite,
        k.sprite(sprite),
        k.pos(pos),
        k.area({ cursor: "grab" }),
        k.anchor("center"),
        drag(k, dragManager),
        k.outline(3,k.RED),
        k.scale(scale),
    ])
    gameObject.spriteTag = sprite

    console.log(gameObject);

    gameObject.onDrag(() => {
        gameObject.scale = k.vec2(scale*1.2)
        const shadow = k.add([
            'shadow',
            // k.rect(gameObject.height, gameObject.width),
            k.color(k.BLACK),
            k.opacity(0.3),
            k.pos(gameObject.pos.x+100, gameObject.pos.y+100),
            k.anchor('center'),
            k.sprite(gameObject.spriteTag),
            k.scale(scale*1.3)
        ])
        gameObject.shadow = shadow
        k.readd(gameObject)
        // Remove the object and re-add it, so it'll be drawn on top
    })

    gameObject.onDragUpdate(() => {
        gameObject.shadow.pos = k.vec2(gameObject.pos.x+20, gameObject.pos.y+20)
        k.setCursor("move")

   
    })
    k.onUpdate(() => {
        if (!gameObject.exists()){
            gameObject.shadow?.destroy()
        }     
    })

    gameObject.onDragEnd(() => {
        gameObject.scale = k.vec2(scale)
        gameObject.shadow.destroy()
    })
    
    return gameObject
}

export default addDraggable