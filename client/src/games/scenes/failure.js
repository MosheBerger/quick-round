import kaboom from "kaboom";
import fixHeb from "../code/utils/fixHebrew";

function failureScene(k = kaboom(), moveToNextGame) {

    k.scene('failure', ({ reason }) => {
        k.setBackground(150, 0, 0)

        k.add([
            k.text(fixHeb('אופס...'), {
                size: 100,
                font: 'Abraham',
            }),
            k.pos(k.width() / 2, k.height() / 2),
            k.anchor('center'),
        ])

        k.add([
            k.text(fixHeb(reason), {
                font: 'Abraham',
            }),
            k.pos(k.width() / 2, k.height() / 1.5),
            k.anchor('center'),
        ])

        k.wait(3, moveToNextGame)
    })
}

export default failureScene