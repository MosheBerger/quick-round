import kaboom from "kaboom"
import drag from "../components/draggable"

function addDraggable(k = kaboom(),
    props = {
        sprite: '',
        pos: undefined,
        scale: undefined,
        returnOnLeave: false
    }) {

    const {
        add, pos, sprite, area, anchor, scale,
        rand, vec2, width, height
    } = k;

    // todo spriteTag disable

    props.pos = props.pos || rand(vec2(width(), height()))
    props.scale = props.scale || 1

    const gameObject = add([
        'draggable',
        props.sprite,
        sprite(props.sprite),
        pos(props.pos),
        // { startPosition: props.pos },
        area({ cursor: "grab" }),
        anchor("center"),
        drag(k, { returnOnLeave: true}),
        scale(props.scale),
    ])
    gameObject.spriteTag = props.sprite

    return gameObject
}

export default addDraggable