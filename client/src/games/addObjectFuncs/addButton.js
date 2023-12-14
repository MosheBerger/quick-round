import kaboom from "kaboom";


function addButton(
    k = kaboom(),
    props = {
        innerText: '', onclick: () => { }, color: undefined
    }
) {

    const {
        add, center, pos, rect, outline, anchor, vec2, get,
        area, color, rgb, scale, text, BLACK,
    } = k

    const { onclick, innerText } = props


    const btn = add([
        'button',
        pos(get('*').length * 100, center().y),
        rect(60, 40, { radius: 10 }),
        area(),
        color(props.color || rgb()),
        scale(1),
        outline(2),
        anchor('center')
    ])

    btn.text = btn.add([ // todo rename text
        anchor('center'),
        text(innerText, {
            size: 18,
        }),
        color(BLACK)

    ])

    btn.onHover(() => {
        btn.scale = vec2(1.2)
    })

    btn.onHoverEnd(() => {
        btn.scale = vec2(1)
    })

    btn.onClick(() => {
        onclick(btn.text)
    })
    return btn
}

export default addButton