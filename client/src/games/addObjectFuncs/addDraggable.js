import kaboom from "kaboom"
import drag from "../GameObjComps/draggable"

function addDraggable(k = kaboom(), dragManager = { current: {} }, props = { sprite: '', pos: undefined, scale: undefined }) {

    const {
        add, pos, sprite, area, anchor, outline, scale,
        RED, BLACK, rand, vec2, width, height,
        color, opacity, readd, onUpdate
    } = k;

// todo spriteTag disable

    props.pos = props.pos || rand(vec2(width(), height()))
    props.scale = props.scale || 1

    const gameObject = add([
        'draggable',
        props.sprite,
        sprite(props.sprite),
        pos(props.pos),
        area({ cursor: "grab" }),
        anchor("center"),
        drag(k, dragManager),
        scale(props.scale),
    ])
    gameObject.spriteTag = props.sprite


    gameObject.onDrag(() => {
        gameObject.scale = vec2(props.scale * 1.1)
        const shadow = add([
            'shadow',
            // rect(gameObject.height, gameObject.width),
            color(BLACK),
            opacity(0.3),
            pos(gameObject.pos.x + 100, gameObject.pos.y + 100),
            anchor('center'),
            sprite(gameObject.spriteTag),
            scale(props.scale * 1.1)
        ])
        gameObject.shadow = shadow
        readd(gameObject)
        // Remove the object and re-add it, so it'll be drawn on top
    })

    gameObject.onDragUpdate(() => {
        gameObject.shadow.pos = vec2(gameObject.pos.x + 20, gameObject.pos.y + 20)


    })
    onUpdate(() => {
        if (!gameObject.exists()) {
            gameObject.shadow?.destroy()
        }
    })

    gameObject.onDragEnd(() => {
        gameObject.scale = vec2(props.scale)
        gameObject.shadow.destroy()
    })

    return gameObject
}

export default addDraggable