import kaboom from "kaboom";


function addButton(
    k = kaboom(),
    props = {
        pos: k.vec2(k.center()),
        color: undefined,
        onclick: () => { },
        size: {}
    }
) {

    const {
        add, pos, rect, outline, anchor, vec2, 
        area, color, rgb, scale, text,
    } = k

    const { onclick, text: thisText, size, color: thisColor, pos: thisPos } = props


    const btn = add([
        'button',
        rect(size.w, size.h, { radius: 8 }),
        pos(thisPos),
        color(thisColor || rgb()),
        area(),
        scale(1),
        outline(2),
        anchor('center')
    ])

    btn.text = btn.add([ 
        anchor('center'),
        { originalText: thisText },
        text(thisText, {
            size: 50,
            font: 'Abraham',
        }),
        color('#ffffff')

    ])

    btn.onHover(() => {
        btn.scale = vec2(1.1)
    })

    btn.onHoverEnd(() => {
        btn.scale = vec2(1)
    })
    // TODO TOUCH SCALE
    // btn.onTouchStart((p,t)=>{
    //     btn.text.text = t.target
    //     btn.scale = vec2(1.1)
    // })
    // btn.onTouchEnd(() => {
    //     btn.scale = vec2(1)
    // })

    btn.onClick(() => {
        onclick(btn.text)
    })
    return btn
}

export default addButton